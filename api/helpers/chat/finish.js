const moment = require('moment');
module.exports = {


  friendlyName: 'Finish a chat',


  description: 'Finish chat and close all the connections',


  inputs: {
    customerId:{
      type: "number",
      required: false
    },
    professionalId: {
      type: "number",
      required: false
    },
    chatId: {
      type: "number",
      required: false
    },
    overTime: {
      type: "boolean",
      required: false,
    },
    noAnswered: {
      type: "boolean",
      required: false,
    },
    declined: {
      type: "boolean",
      required: false,
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'New chat',
    },

    noChatFound: {
      description: 'No chat found'
    },

  },


  fn: async function (inputs) {
    let where = {}, chatState;
    if(inputs.customerId){
      //Customer finish the chat from the chat window
      where = {customer: inputs.customerId};
      chatState = sails.config.custom.CHAT_STATES.FINISHED_BY_CUSTOMER;
    }
    else if (inputs.professionalId && !inputs.declined) {
      //Professional finish the chat from the chat window
      where = {professional: inputs.professionalId};
      chatState = sails.config.custom.CHAT_STATES.FINISHED_BY_PROFESSIONAL;
    }
    else if (inputs.chatId && inputs.declined) {
      //Professional decline the chat from the chat income popup
      where = {professional: inputs.professionalId};
      chatState = sails.config.custom.CHAT_STATES.DECLINED_BY_READER;
    }
    else if( inputs.chatId && !inputs.overTime && !inputs.noAnswered) {
      //Admin finish the chat from the admin area
      where = {id: inputs.chatId};
      chatState = sails.config.custom.CHAT_STATES.FINISHED_BY_ADMIN;
    }
    else if( inputs.chatId && inputs.noAnswered) {
      //Chat finished by cron job because it did not receive answer from the reader
      where = {id: inputs.chatId};
      chatState = sails.config.custom.CHAT_STATES.FINISHED_BY_NO_ANSWER;
    }
    else if( inputs.chatId && inputs.overTime) {
      //Chat finished from chat window or cron job because time finished
      where = {id: inputs.chatId};
      chatState = sails.config.custom.CHAT_STATES.FINISHED_BY_OVERTIME;
    }
    // Get last chat.
    let chat = await Chat.find({
      where: where,
      limit: 1,
      sort: 'id desc'
    });
    let duration = 0;
    let cost = 0;
    if (chat && chat.length>0) {
      chat = chat[0];
      const finishTime = moment();
      const startTime = moment(chat.startTime);

      if(chatState !== sails.config.custom.CHAT_STATES.DECLINED_BY_READER && chatState!==sails.config.custom.CHAT_STATES.FINISHED_BY_NO_ANSWER ) {
        //Calculate difference between times
        duration = finishTime.diff(startTime, 'seconds');
        //Give a grace period of 10 sec
        duration = duration - 10;
        duration = duration < 0 ? 0:duration;
        //Set the state of the chat
        cost = 0;
        if(duration>0) {
          //Get the professional to check the rate
          const professional = await Professional.findOne({id: chat.professional}).populate('rate');

          const durationInMinutes = parseInt((duration /60)+1);
          cost = durationInMinutes * professional.rate.chat;
          //Create the transaction for the user
          //Update customer balance
          const customer = await Customer.findOne({id: chat.customer});
          await Customer.updateOne({id: customer.id}, {balance: customer.balance - cost});
          await Professional.updateOne({id: professional.id}, {balance: professional.balance + cost});
          //Update professional status
          await sails.helpers.professional.changeStatus(chat.professional, professional.previousState);
        }
      }
      await Chat.updateOne({id: chat.id}).set({chatState: chatState, duration: duration, cost: cost, finishTime:finishTime.format('YYYY-MM-DD HH:mm:ss')});
      // Notify users chat has been finished
      await sails.helpers.socket.send('chat-'+chat.id, sails.config.custom.SOCKET_EVENTS.CHAT_FINISHED, {});
      //Remove users from the chat
      sails.sockets.leaveAll('chat-'+chat.id);


    } else {
      throw 'noChatFound';
    }
  }


};

