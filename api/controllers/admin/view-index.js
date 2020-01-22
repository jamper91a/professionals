module.exports = {


  friendlyName: 'View index',


  description: 'Display "Index" page.',


  exits: {
  },


  fn: async function () {
    return this.res.view('pages/admin/index', {layout: 'layouts/admin'});

  }


};
