const moment = require('moment');
module.exports = {


  friendlyName: 'Notify user has connected',


  description: 'Notify user has connected to the chat',


  inputs: {
    chatId: {
      type: 'number',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Notification send',
    },

    noChatFound: {
      description: 'No chat found'
    },

    noValidChat: {
      description: 'The new chat has been already started/finished'
    }

  },


  fn: async function ({chatId}) {

    try {
      if (!this.req.isSocket) {
        return this.res.badRequest();
      }
      let chat, role;
      if (this.req.customer) {
        role = sails.config.custom.USER_CUSTOMER;
        //Find the chat to join
        chat = await sails.helpers.chat.getNewChat(chatId);
        await Chat.updateOne({id: chat.id}).set({customerState: sails.config.custom.CHAT_USER_STATE.CONNECTED, chatState: sails.config.custom.CHAT_STATES.ACCEPTED});
        if (!chat.customerState) {
          //Send notification to the professional to tell him that there is a new chat request
          await sails.helpers.socket.send('user-' + chat.professional.user.id, sails.config.custom.SOCKET_EVENTS.NEW_CHAT_INCOME, chat);
          //Change status of the professional
          await sails.helpers.professional.changeStatus(chat.professional.id, sails.config.custom.PROFESSIONAL_STATES.BUSY);
        }
      } else if (this.req.professional) {
        role = sails.config.custom.USER_PROFESSIONAL;
        //Find the chat to join
        chat = await sails.helpers.chat.getNewChat(chatId);
        await Chat.updateOne({id: chat.id}).set({professionalState: sails.config.custom.CHAT_USER_STATE.CONNECTED});
      } else {
        return this.res.badRequest();
      }

      //Check if both users connected, to set the start time
      chat = await Chat.findOne({id:chat.id});
      if(chat.professionalState === sails.config.custom.CHAT_USER_STATE.CONNECTED &&  chat.customerState === sails.config.custom.CHAT_USER_STATE.CONNECTED) {
        const startTime = moment().format('YYYY-MM-DD HH:mm:ss');
        await Chat.updateOne({id: chat.id}).set({startTime: startTime, chatState: sails.config.custom.CHAT_STATES.STARTED});
      }
      await sails.helpers.socket.send('chat-' + chat.id, sails.config.custom.SOCKET_EVENTS.USER_CONNECTED_CHAT,
        {
          userId: this.req.user.id,
          role: role,
          maxDuration: chat.maxDuration,
          chatId: chat.id
        });
      return {};
    } catch (e) {
      return e;
    }

  }


};
