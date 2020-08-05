const moment = require('moment');
module.exports = {


  friendlyName: 'Finish a chat',


  description: 'Finish chat and close all the connections',


  inputs: {
    chatId: {
      type: "number",
      required: true
    },
    reason: {
      type: 'number',
      required: true,
      description: `
      11. FINISHED_BY_CUSTOMER: In case customer click on finish or close the window
      12. FINISHED_BY_PROFESSIONAL: In case professional click on finish or close the window
      13. FINISHED_BY_ADMIN: In case admin finish the chat from control panel
      14. FINISHED_BY_OVERTIME: In case chat finish by overtime. It can be triggered from the chat window, or the cron job
      15. FINISHED_BY_NO_ANSWER: In case professional did not answer the chat. It would be trigger by cron job
      16. DECLINED_BY_PROFESSIONAL: In case professional decline the chat. It would trigger from professional page
      17. FINISHED_BEFORE_START: In case customer close the chat window before professional accept or decline. It would be trigered from customer page
      19. DECLINED_BY_CUSTOMER: In case customer decline the chat. It would trigger from customer page
      20. LOST_CONNECTION_CUSTOMER: In case last ping done by customer was more than 30 seconds. It would be trigger by cron job
      32. LOST_CONNECTION_PROFESSIONAL: In case last ping done by professional was more than 30 seconds. It would be trigger by cron job
      `
    },
  },


  exits: {

    success: {
      outputFriendlyName: 'New chat',
    },

    noChatFound: {
      description: 'No chat found'
    },

  },


  fn: async function ({chatId, reason}) {
    let restoreReaderState= true, calculateCost=true;
    // Get last chat.
    let chat = await Chat.findOne({id: chatId}).populate('professional');
    const finishTime = moment();
    switch (reason) {
      case sails.config.custom.CHAT_STATES.FINISHED_BY_NO_ANSWER:
        restoreReaderState = false;
        //It should no calculate cost because start time would be null
        calculateCost = false;
        break;
      case sails.config.custom.CHAT_STATES.FINISHED_BEFORE_START:
        //Notify reader chat has finished
        await sails.helpers.socket.send('user-' + chat.professional.user, sails.config.custom.SOCKET_EVENTS.CHAT_CANCELED, chat);
        //It should no calculate cost because start time would be null
        calculateCost = false;
        break;
      case sails.config.custom.CHAT_STATES.DECLINED_BY_CUSTOMER:
        restoreReaderState = false;
        //It should no calculate cost because start time would be null
        calculateCost = false;
        break;
      case sails.config.custom.CHAT_STATES.DECLINED_BY_PROFESSIONAL:
        restoreReaderState = false;
        //It should no calculate cost because start time would be null
        calculateCost = false;
        break;
    }


    if (chat) {
      if(calculateCost) {
        await sails.helpers.chat.calculateCostChat(chat.id);
      }
      if(restoreReaderState){
        await sails.helpers.professional.changeStatus(chat.professional.id, chat.professional.previousState);
      }
      await Chat.updateOne({id: chat.id}).set({chatState: reason, finishTime:finishTime.format('YYYY-MM-DD HH:mm:ss'), billed: true});
      // Notify users chat has been finished
      await sails.helpers.socket.send('chat-'+chat.id, sails.config.custom.SOCKET_EVENTS.CHAT_FINISHED, {reason});
      //Remove users from the chat
      sails.sockets.leaveAll('chat-'+chat.id);
      //Notify about the changes
      await sails.helpers.chat.getAllRunningChats();
      return {};


    } else {
      throw 'noChatFound';
    }
  }


};

