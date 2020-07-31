const jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Generate',


  description: 'Generate jwt using the user information.',


  inputs: {
    user:{
      type: "ref",
      required: true
    },
    customer: {
      type: "ref",
      default: null
    },
    professional: {
      type: "ref",
      default: null
    }
  },


  exits: {

  },


  fn: function (inputs) {
    try {
      const token = jwt.sign(
        {
          user: inputs.user,
          customer: inputs.customer,
          professional: inputs.professional,
        },
        sails.config.custom.jwt.secret,
        sails.config.custom.jwt.options);
      inputs.token = token;
      return inputs;
    } catch (e) {
      throw e;
    }
  }


};

