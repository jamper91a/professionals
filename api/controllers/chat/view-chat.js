module.exports = {


  friendlyName: 'View chat',


  description: 'Display "Chat" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/chat/chat',
      layout: 'chat'
    }

  },


  fn: async function () {
    try {
      let chat, userType;
      if (this.req.customer) {
        userType = sails.config.custom.USER_CUSTOMER;
        //Find the chat that the user created previously
        chat = await sails.helpers.chat.getNewChat(this.req.customer.id, undefined);
        //Check if the customer has not connected yet
        if (!chat.customerState) {
          //Send notification to the professional to tell him that there is a new chat request
          await sails.helpers.socket.send('user-' + chat.professional.user.id, sails.config.custom.SOCKET_EVENTS.NEW_CHAT_INCOME, chat);
        }
      } else if (this.req.professional) {
        userType = sails.config.custom.USER_PROFESSIONAL;
        chat = await sails.helpers.chat.getNewChat(undefined, this.req.professional.id);
      } else {
        throw  'notAuthorized';
      }

      // Respond with view.
      return {layout: 'layouts/chat', chat};
    } catch (e) {
      sails.log.error(e);
    }

  }


};
