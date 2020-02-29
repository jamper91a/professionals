module.exports = {


  friendlyName: 'Finish',


  description: 'Finish chat.',


  inputs: {

  },


  exits: {

  },


  fn: async function () {

    try {
      if (this.req.customer) {
        await sails.helpers.chat.finish(this.req.customer.id, undefined, undefined);
      } else if (this.req.professional) {
        await sails.helpers.chat.finish(undefined, this.req.professional.id, undefined);
      }

      return {};
    } catch (e) {
      sails.log.error(e);
      throw e;
    }

  }


};
