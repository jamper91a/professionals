module.exports = {


  friendlyName: 'Finish',


  description: 'Finish chat.',


  inputs: {
    chatId: {
      type: "number",
      required: true
    },
    reason: {
      type: "number",
      required: true
    }
  },


  exits: {

  },


  fn: async function ({chatId, reason}) {
    await sails.helpers.chat.finish.with({chatId, reason});
    return {};

  }


};
