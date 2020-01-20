module.exports = {


  friendlyName: 'Find',


  description: 'Find customer.',


  inputs: {

  },


  exits: {

  },


  fn: async function () {

    try {
      const customers = await sails.helpers.customer.find();
      return customers;
    } catch (e) {
      throw {serverError: e};
    }



  }


};
