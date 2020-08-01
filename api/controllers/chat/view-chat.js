module.exports = {


  friendlyName: 'View chat',


  description: 'Display "Chat" page.',

  inputs: {
    chatId: {
      type: 'number',
      required: true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/chat/chat',
      layout: 'chat'
    },

    success: {
      viewTemplatePath: 'pages/chat/chat',
      layout: 'chat'
    }

  },


  fn: async function ({chatId}) {
    try {
      let chat, userType;
      if (this.req.customer) {
        //Find the chat that the user created previously
        chat = await sails.helpers.chat.getNewChat(chatId);
        chat.userType = sails.config.custom.USER_CUSTOMER;
        if(chat.customerState != null) {
          chat.state= 'noValid';
        }

      } else if (this.req.professional) {
        chat = await sails.helpers.chat.getNewChat(chatId);
        chat.userType = sails.config.custom.USER_PROFESSIONAL;
        if(chat.professionalState != null) {
          chat.state= 'noValid';
        }
      } else {
        throw  'notAuthorized';
      }
      chat.userId = this.req.user.id;

      // Respond with view.
      return {layout: 'layouts/chat', chat};
    } catch (e) {
      sails.log.error(e);
    }

  }


};
