module.exports = {


  friendlyName: 'View home',


  description: 'Display "Home" page.',


  exits: {

  },


  fn: async function () {
    //Find all the professionals
    try {
      const professionals = await sails.helpers.professional.findAll();
      return this.res.view('pages/home', {professionals});
    } catch (e) {
      sails.log.error(e);
    }

  }


};
