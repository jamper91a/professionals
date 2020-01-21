module.exports = {


  friendlyName: 'Remove',


  description: 'Remove customer.',


  inputs: {
    userId: {
      type: "number"
    }
  },


  exits: {

  },


  fn: async function ({userId}) {

    try {
      const user = await sails.helpers.user.remove(userId);
      return user;
    } catch (e) {
      throw {serverError: e};
    }

  }


};
