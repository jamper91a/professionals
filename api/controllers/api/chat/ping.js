const moment = require('moment');
module.exports = {


  friendlyName: 'Finish',


  description: 'Finish chat.',


  inputs: {
    chatId: {
      type: "number",
      required: true
    },
    role: {
      type: "number",
      required: true
    }
  },


  exits: {

  },


  fn: async function ({chatId, role}) {

    try {
      const chat = await Chat.findOne({id:chatId});
      const currentTime = moment();
      switch (role) {
        case sails.config.custom.USER_CUSTOMER:
          await Chat.updateOne({id: chat.id}).set({customerLastPing:currentTime.format('YYYY-MM-DD HH:mm:ss')});
          break;
        case sails.config.custom.USER_PROFESSIONAL:
          await Chat.updateOne({id: chat.id}).set({professionalLastPing:currentTime.format('YYYY-MM-DD HH:mm:ss')});
          break;
      }
      return {};
    } catch (e) {
      sails.log.error(e);
      throw e;
    }

  }


};
