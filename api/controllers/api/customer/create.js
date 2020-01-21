module.exports = {


  friendlyName: 'Create',


  description: 'Create customer.',


  inputs: {
    user:{
      type: "json",
      required: true
    }
  },


  exits: {
  },


  fn: async function (inputs) {
    try {
      const customer = await sails.helpers.customer.create.with(inputs);
      return customer;
    } catch (e) {
      throw {serverError: e};
    }

  }


};
