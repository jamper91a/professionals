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

  },


  fn: async function (inputs) {

    try {
      const user = await sails.helpers.user.ban.with(inputs);
      return user;
    } catch (e) {
      throw {serverError: e};
    }

  }


};
