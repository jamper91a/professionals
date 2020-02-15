module.exports = {


  friendlyName: 'Find',


  description: 'Find country.',


  inputs: {

  },


  exits: {

  },


  fn: async function () {

    try {
      const countries = await sails.helpers.country.findAll();
      return countries;
    } catch (e) {
      throw {serverError: e};
    }

  }


};
