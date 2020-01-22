module.exports = {


  friendlyName: 'Create',


  description: 'Create user.',


  inputs: {
    name:{
      type: "string",
    },
    username: {
      type: "string",
      custom: function (value) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var validation = re.test(String(value).toLowerCase());
        return validation;
      }
    },
    password: {
      type: "string",
      custom: function (value) {
        return value.length >= 6 && value.match(/[a-z]/i) && value.match(/[0-9]/);
      }
    },
    password2: {
      type: "string",
      custom: function (value) {
        return value.length >= 6 && value.match(/[a-z]/i) && value.match(/[0-9]/);
      }
    },
    country: {
      type: "number"
    },
    group: {
      type: "number"
    }
  },


  exits: {

    success: {
    },
    serverError: {
      description: 'An general error',
    }

  },


  fn: async function (inputs, exits) {
    try {
      if(inputs.password === inputs.password2){
        delete inputs.password2;
        var user = await User.create(inputs).fetch();
        return exits.success(user);
      }else{
        return exits.serverError(sails.__('Passwords does not match'));
      }
    } catch (e) {
      return exits.serverError(e);
    }
  }


};

