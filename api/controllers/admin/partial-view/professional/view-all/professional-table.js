module.exports = {


  friendlyName: 'Customer table',


  description: 'This view will generate just the table with the customers. It will be used to "refresh" the data after an' +
    'user is banned or deleted',


  exits: {

  },


  fn: async function () {

    try {
      const customers = await sails.helpers.customer.findAll();
      var htmlEmailContents = await sails.renderView('pages/admin/customer/all-data', {
        customers,
        // Don't include the Sails app's default layout in the rendered template.
        layout: false
      });
      return htmlEmailContents;
    } catch (e) {
      throw {serverError: e};
    }

  }


};
