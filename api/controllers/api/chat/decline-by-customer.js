module.exports = {


  friendlyName: 'Declined',


  description: 'Decline chat by customer.',


  inputs: {
    chatId: {
      type: "number",
      required: false
    }
  },


  exits: {

  },


  fn: async function ({chatId}) {

    try {
      await sails.helpers.chat.declinedByCustomer(chatId);
      return {};
    } catch (e) {
      sails.log.error(e);
      throw e;
    }

  }


};
