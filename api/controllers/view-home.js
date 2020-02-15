module.exports = {


  friendlyName: 'View home',


  description: 'Display "Home" page.',


  exits: {

  },


  fn: async function () {
    //Find all the professionals
    try {
      const professionals = await sails.helpers.professional.findAll();
      const countries = await sails.helpers.country.findAll();
      const professions = await sails.helpers.profession.findAll();
      return this.res.view('pages/home', {professionals, countries, professions});
    } catch (e) {
      sails.log.error(e);
    }

  }


};
