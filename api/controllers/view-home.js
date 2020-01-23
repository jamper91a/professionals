module.exports = {


  friendlyName: 'View home',


  description: 'Display "Home" page.',


  exits: {

  },


  fn: async function () {

    return this.res.view('pages/home');

  }


};
