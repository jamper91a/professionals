var moment = require('moment');
module.exports = {


  friendlyName: 'Find',


  description: 'Find customer.',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function () {
    try {

      let customers = await Customer.find({}).populate('user').paginate(0, 50);
      _.forEach(customers, function (customer) {
        customer.createdAt = moment(customer.createdAt).format('YYYY-MM-DD');
        customer.user.createdAt = moment(customer.user.createdAt).format('YYYY-MM-DD');
        customer.user.updatedAt = moment(customer.user.updatedAt).format('YYYY-MM-DD');

      });
      // All done.
      return customers;
    } catch (e) {
      throw e;
    }
  }


};

