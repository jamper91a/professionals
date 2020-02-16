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
      sails.sockets.broadcast('user-1', 'newMessage', 'No way');
      return countries;
    } catch (e) {
      throw e;
    }
  }


};

