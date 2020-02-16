module.exports = {


  friendlyName: 'Change status',


  description: '',


  inputs: {
    professionalId:{
      type: "number"
    },
    state: {
      type: "number"
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    try {
      const professional = await sails.helpers.professional.changeStatus.with(inputs);
      // All done.

      return professional;
    } catch (e) {
      throw {serverError: e};
    }

  }


};
