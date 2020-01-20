module.exports = {


  friendlyName: 'View all',


  description: 'Display "All" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/customer/all'
    }

  },


  fn: async function () {
    try {
      const customers = await sails.helpers.customer.find();
      return {
        customers: customers
      };
    } catch (e) {
      throw {serverError: e};
    }

  }


};
