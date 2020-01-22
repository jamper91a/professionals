module.exports = {


  friendlyName: 'Logout',


  description: 'Logout user.',


  inputs: {

  },


  exits: {

  },


  fn: async function () {

    this.res.clearCookie('jwt');
    this.req.user = null;
    return this.res.redirect('/');

  }


};
