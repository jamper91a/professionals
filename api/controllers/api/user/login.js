module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
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
  },


  exits: {
    success: {
    },
    serverError: {
      description: 'An general error',
      responseType: 'serverError'
    }
  },


  fn: async function (inputs) {
    inputs.req = this.req;
    inputs.res = this.res;
    try {
      const data = await sails.helpers.user.login.with(inputs);
      return data;
    } catch (e) {
      throw {serverError: e};
    }

  }


};
