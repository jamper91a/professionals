module.exports = {


  friendlyName: 'Professionals home',


  description: 'This view will generate just the table with the professionals. It will be used to "refresh" the data after user' +
    'change the profession or nay other filter in the homepage',


  inputs: {
    country: {
      type: "number"
    },
    profession: {
      type: "number"
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    //Find all the professionals
    try {
      const professionals = await sails.helpers.professional.findBy.with(inputs);
      const countries = await sails.helpers.country.findAll();
      const professions = await sails.helpers.profession.findAll();
      const PROFESSIONAL_STATES = sails.config.custom.PROFESSIONAL_STATES;
      const htmlEmailContents = await sails.renderView('pages/partial-view/professionals-home', {
        professionals,
        countries,
        professions,
        PROFESSIONAL_STATES,
        // Don't include the Sails app's default layout in the rendered template.
        layout: false
      });
      return htmlEmailContents;
    } catch (e) {
      sails.log.error(e);
    }
  }


};
