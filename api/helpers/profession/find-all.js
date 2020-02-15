module.exports = {


  friendlyName: 'Find',


  description: 'Find profession.',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    try {
      let data = await Profession.find();
      return data;
    } catch (e) {
      throw e;
    }
  }


};

