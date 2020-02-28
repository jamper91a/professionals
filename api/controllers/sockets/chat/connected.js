module.exports = {


  friendlyName: 'Notify user has connected',


  description: 'Notify user has connected to the chat',


  inputs: {
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


  fn: async function ({message}) {

    try {
      if (!this.req.isSocket) {
        return this.res.badRequest();
      }
      let chat, type;
      if (this.req.customer) {
        //Find the chat to join
        chat = await sails.helpers.chat.getNewChat(this.req.customer.id, undefined);
        type = sails.config.custom.USER_CUSTOMER;
      } else if (this.req.professional) {
        //Find the chat to join
        chat = await sails.helpers.chat.getNewChat(undefined, this.req.professional.id);
        type = sails.config.custom.USER_PROFESSIONAL;
      } else {
        return this.res.badRequest();
      }
      await sails.helpers.socket.send('chat-' + chat.id, sails.config.custom.SOCKET_EVENTS.USER_CONNECTED_CHAT, this.req.user.id);
      return {};
    } catch (e) {
      return e;
    }

  }


};
