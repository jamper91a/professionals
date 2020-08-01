module.exports = {


  friendlyName: 'Bill chats',


  description: 'Check the chats and finish the ones who does not fill the requirements',


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function () {
    //Check all the chats that has been finished, but not billed
    let chats = await Chat.find(
      {
        billed: false,
        chatState:[
          sails.config.custom.CHAT_STATES.FINISHED_BY_PROFESSIONAL,
          sails.config.custom.CHAT_STATES.FINISHED,
          sails.config.custom.CHAT_STATES.FINISHED_BY_ADMIN,
          sails.config.custom.CHAT_STATES.FINISHED_BY_CUSTOMER,
          sails.config.custom.CHAT_STATES.FINISHED_BY_OVERTIME,
        ]});
    for(const chat of chats) {
        await sails.helpers.chat.calculateCostChat(chat.id);
    }
  }


};

