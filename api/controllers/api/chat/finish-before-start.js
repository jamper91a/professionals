module.exports = {


  friendlyName: 'Finish',


  description: 'Finish chat.',


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
      await sails.helpers.chat.finishBeforeStart(chatId);
      return {};
    } catch (e) {
      sails.log.error(e);
      throw e;
    }

  }


};
