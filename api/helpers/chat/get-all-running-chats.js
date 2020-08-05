module.exports = {


  friendlyName: 'Get all',


  description: 'Get all the chat that are currently running in the system',


  inputs: {

  },


  exits: {

    success: {
      outputFriendlyName: 'All',
    },

  },


  fn: async function () {

    const chats = await Chat.find({finishTime: null}).populate('chatState').populate('customer').populate('professional');
    for (const chat of chats) {
      const users = await User.find({id:[chat.customer.user, chat.professional.user]});
      chat.customer.user = users[0];
      chat.professional.user = users[1];
    }
    await sails.helpers.admin.sendNotificationAdmins(sails.config.custom.SOCKET_EVENTS.admin.CHAT_CREATED,chats);
    return chats;

  }


};

