module.exports = {


  friendlyName: 'Connect',


  description: 'Connect sockets.',


  inputs: {
  },


  exits: {

  },


  fn: async function () {

    try {
      if (!this.req.isSocket) {
        return this.res.badRequest();
      }
      sails.sockets.join(this.req, 'professionals');
      return 'Connected to professionals socket';
    } catch (e) {
      sails.log.error(e);
      throw {serverError: e};
    }

  }


};
