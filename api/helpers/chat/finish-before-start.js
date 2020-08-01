const moment = require('moment');
module.exports = {


  friendlyName: 'Finish a chat',


  description: 'Finish chat and close all the connections',


  inputs: {
    chatId: {
      type: "number",
      required: false
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


  fn: async function ({chatId}) {
    console.log('chatFinishedBeforeStart', chatId);
    let chatState;
    chatState = sails.config.custom.CHAT_STATES.FINISHED_BEFORE_START;
    // Get last chat.
    let chat = await Chat.findOne({id: chatId}).populate('professional');
    if (chat) {
      const finishTime = moment();
      await Chat.updateOne({id: chat.id}).set({chatState: chatState, duration: 0, cost: 0, finishTime:finishTime.format('YYYY-MM-DD HH:mm:ss')});
      // Notify users chat has been finished
      await sails.helpers.socket.send('chat-'+chat.id, sails.config.custom.SOCKET_EVENTS.CHAT_FINISHED, {});
      //Remove users from the chat
      sails.sockets.leaveAll('chat-'+chat.id);
      //Notify profesional chat was canceled
      console.log('user-' + chat.professional.user);
      await sails.helpers.socket.send('user-' + chat.professional.user, sails.config.custom.SOCKET_EVENTS.CHAT_CANCELED, chat);

    } else {
      throw 'noChatFound';
    }
  }


};

