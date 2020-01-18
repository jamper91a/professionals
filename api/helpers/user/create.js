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
      responseType: 'serverError'
    }

  },


  fn: async function (inputs, exits) {
    try {
      var user = await User.create(inputs).fetch();
      return exits.success(user);
    } catch (e) {
      return exits.serverError(e);
    }
  }


};

