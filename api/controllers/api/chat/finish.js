module.exports = {


  friendlyName: 'Finish',


  description: 'Finish chat.',


  inputs: {
    chatId: {
      type: "number",
      required: false
    },
    overTime: {
      type: "boolean",
      required: false
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    try {
      if(inputs.chatId === 0) {
        if (this.req.customer) {
          await sails.helpers.chat.finish(this.req.customer.id, undefined, undefined, undefined, undefined, undefined);
        } else if (this.req.professional) {
          await sails.helpers.chat.finish(undefined, this.req.professional.id, undefined, undefined, undefined, undefined);
        }
      } else {
        if (inputs.chatId && !inputs.overTime) {
          await sails.helpers.chat.finish(undefined, undefined, inputs.chatId, false, undefined, undefined);
        } else if (inputs.chatId && inputs.overTime) {
          await sails.helpers.chat.finish(undefined, undefined, inputs.chatId, true, undefined, undefined);
        }
      }
      return {};
    } catch (e) {
      sails.log.error(e);
      throw e;
    }

  }


};
