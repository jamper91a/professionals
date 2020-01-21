module.exports = {


  friendlyName: 'Create Professional',


  description: 'Create professional.',


  inputs: {
    user:{
      type: "json",
      required: true
    },
    profession: {
      type: "number",
      required: true
    },
    rate: {
      type: "number",
      required: true
    }
  },


  exits: {
    success:{},
    serverError: {}
  },


  fn: async function (inputs) {

    try {
      const professional = await sails.helpers.professional.create.with(inputs);
      return professional;
    } catch (e) {
      throw {serverError: e};
    }

  }


};
