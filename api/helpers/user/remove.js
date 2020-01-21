module.exports = {


  friendlyName: 'Remove',


  description: 'Delete customer.',


  inputs: {
    userId: {
      type: "number"
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({userId}) {
    try {

      let user = await User.updateOne({id: userId}).set({enabled: 0});
      // All done.
      return user;
    } catch (e) {
      throw e;
    }
  }


};

