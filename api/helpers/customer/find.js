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
      let customers = await Customer.find().populate('user').paginate(0, 50);
      customers = _.filter(customers, function(customer) { return customer.user.enabled===1; });
      _.forEach(customers, function (customer) {
        if(customer.user.enabled===0) delete customer;
        else{
          customer = sails.helpers.util.formatDate(customer);
          customer.user = sails.helpers.util.formatDate(customer.user);
        }
      });
      // All done.
      return customers;
    } catch (e) {
      throw e;
    }
  }


};

