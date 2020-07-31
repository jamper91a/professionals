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
        //Find the chat that the user created previously
        chat = await sails.helpers.chat.getNewChat(this.req.customer.id, undefined);
        chat.userType = sails.config.custom.USER_CUSTOMER;
      } else if (this.req.professional) {
        chat = await sails.helpers.chat.getNewChat(undefined, this.req.professional.id);
        chat.userType = sails.config.custom.USER_PROFESSIONAL;
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
