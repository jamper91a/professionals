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
      const offers = await sails.helpers.offer.getByCurrentDomain(this.req.hostname);
      console.log(offers);
    } catch (e) {
      console.error(e);
    }
    // Respond with view.
    return {};

  }


};
