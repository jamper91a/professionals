const moment = require('moment');
module.exports = {


  friendlyName: 'Bill chats',


  description: 'Check the chats and finish the ones who does not fill the requirements',

  inputs: {
    chatId: {
      type: 'number',
      require: true
    }
  },

  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({chatId}) {
    let chat =await Chat.findOne({id: chatId});

    const finishTime = moment();
    const startTime = moment(chat.startTime);
    //Calculate difference between times
    let duration = finishTime.diff(startTime, 'seconds');
    //Give a grace period of 10 sec
    duration = duration - 10;
    duration = duration < 0 ? 0:duration;
    //Set the state of the chat
    let cost = 0;
    if(duration>0) {
      //Get the professional to check the rate
      const professional = await Professional.findOne({id: chat.professional}).populate('rate');

      const durationInMinutes = parseInt((duration / 60) + 1);
      cost = durationInMinutes * professional.rate.chat;
      //Create the transaction for the user
      //Update customer balance
      const customer = await Customer.findOne({id: chat.customer});
      await Customer.updateOne({id: customer.id}, {balance: customer.balance - cost});
      await Professional.updateOne({id: professional.id}, {balance: professional.balance + cost});
      await Chat.updateOne({id: chatId}).set({
        duration: duration,
        cost: cost,
        finishTime: finishTime.format('YYYY-MM-DD HH:mm:ss'),
        billed: true
      });
    } else {
      await Chat.updateOne({id: chatId}).set({
        duration: 0,
        cost: 0,
        finishTime: finishTime.format('YYYY-MM-DD HH:mm:ss'),
        billed: true
      });
    }
    //Notify about the changes
    await sails.helpers.chat.getAllRunningChats();
    return {};
  }


};

