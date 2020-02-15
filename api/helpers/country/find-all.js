module.exports = {


  friendlyName: 'Find all',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function () {
    try {
      let countries = await Country.find();
      return countries;
    } catch (e) {
      throw e;
    }
  }


};

