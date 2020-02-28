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
    if(req.customer !== null){
      sails.log.info('It is customer');
    }
    if(req.professional !== null){
      sails.log.info('It is professional');
    }

    // Respond with view.
    return {};

  }


};
