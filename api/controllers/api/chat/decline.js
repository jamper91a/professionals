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
      await sails.helpers.chat.finish(undefined, undefined, chatId, undefined, undefined, true);
      return {};
    } catch (e) {
      sails.log.error(e);
      throw e;
    }

  }


};
