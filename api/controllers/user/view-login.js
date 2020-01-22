module.exports = {


  friendlyName: 'View login',


  description: 'Display "Login" page.',

  inputs: {
    username: {
      type: "string"
    },
    password: {
      type: "string"
    },
  },
  exits: {

  },


  fn: async function (inputs) {

    switch (this.req.method) {
      case 'GET':
        return this.res.view('pages/user/login', {layout: 'layouts/login', error: ''});
        break;
      case 'POST':
        inputs.req = this.req;
        inputs.res = this.res;
        try {
          const user = await sails.helpers.user.login.with(inputs);
          this.res.cookie('jwt', user.token, sails.config.custom.jwt.cookie);
          return this.res.redirect('/');
        } catch (e) {
          return this.res.view('pages/user/login', {layout: 'layouts/login', error: e.code});
          // return{e};
        }

        break;
    }

  }


};
