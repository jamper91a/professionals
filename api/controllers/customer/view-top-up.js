module.exports = {


  friendlyName: 'View top up',


  description: 'Display "Top up" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/customer/topUp'
    }

  },


  fn: async function () {
    try {
      const data = await sails.helpers.offer.getByCurrentDomain(this.req.hostname);
      return {
        data,
        STRIPE: sails.config.custom.STRIPE.PUBLIC
      };
    } catch (e) {
      console.error(e);
      throw e;
    }


  }


};
