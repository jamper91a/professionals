module.exports = {


  friendlyName: 'Find',


  description: 'Find customer.',


  inputs: {

  },


  exits: {

  },


  fn: async function () {

    try {
      const professionals = await sails.helpers.professional.find();
      return professionals;
    } catch (e) {
      throw {serverError: e};
    }



  }


};
