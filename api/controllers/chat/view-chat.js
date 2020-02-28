module.exports = {


  friendlyName: 'View chat',


  description: 'Display "Chat" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/chat/chat'
    }

  },


  fn: async function () {
    //Check if user is a customer to create the chat
    if(this.req.customer){
      //Find the chat
      const chat = await sails.helpers.customer.getLastChat(this.req.customer.id);
      //Send notification to the professional to tell him that there is a new chat request
      await sails.helpers.socket.send('user-'+chat.professional.user, sails.config.custom.SOCKET_EVENTS.NEW_CHAT_INCOME, chat);

    }
    if(this.req.professional){
      sails.log.info('It is professional');
    }

    // Respond with view.
    return {};

  }


};
