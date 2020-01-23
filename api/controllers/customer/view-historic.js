module.exports = {


  friendlyName: 'View historic',


  description: 'Display "Historic" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/customer/historic'
    }

  },


  fn: async function () {

    try {
      const historic = await sails.helpers.customer.historic(this.req.customer.id);
      return {historic};
    } catch (e) {
      throw e;
    }

  }


};
