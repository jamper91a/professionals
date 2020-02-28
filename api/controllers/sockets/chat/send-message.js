module.exports = {


  friendlyName: 'Send message to a chat',


  description: 'Send message to a chat depending of the req',


  inputs: {
    message: {
      type: "string",
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'New chat',
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
      let chat;
      if (this.req.customer) {
        //Find the chat to join
        chat = await sails.helpers.chat.getNewChat(this.req.customer.id, undefined);
      } else if (this.req.professional) {
        //Find the chat to join
        chat = await sails.helpers.chat.getNewChat(undefined, this.req.professional.id);
      } else {
        return this.res.badRequest();
      }
      await sails.helpers.socket.send('chat-' + chat.id, sails.config.custom.SOCKET_EVENTS.NEW_MESSAGE, {message, user: this.req.user.id});
      return {};
    } catch (e) {
      return e;
    }

  }


};
