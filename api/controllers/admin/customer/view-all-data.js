module.exports = {


  friendlyName: 'View all data',


  description: 'Display "All data" page.',


  exits: {

  },


  fn: async function () {

    try {
      const customers = await sails.helpers.customer.find();
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
