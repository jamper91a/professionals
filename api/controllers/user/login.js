
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
    badRequest: {
      description: 'An general error',
      responseType: 'serverError'
    },
    notFound: {
      description: 'An general error',
      responseType: 'serverError'
    }
  },


  fn: async function (inputs) {
    inputs.req = this.req;
    inputs.res = this.res;
    try {
      const user = await sails.helpers.user.login.with(inputs);
      this.res.cookie('jwt', user.token, sails.config.custom.jwt.cookie);
      return this.res.redirect('/admin/index');
    } catch (e) {
      throw {serverError: e};
    }

  }


};
