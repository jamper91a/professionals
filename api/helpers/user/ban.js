module.exports = {


  friendlyName: 'Ban',


  description: 'Ban customer.',


  inputs: {
    userId: {
      type: "number"
    },
    banned: {
      type: "number"
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    try {

      let user = await User.updateOne({id: inputs.userId}).set({banned: inputs.banned});
      // All done.
      return user;
    } catch (e) {
      throw e;
    }
  }


};

