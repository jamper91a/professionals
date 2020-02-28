module.exports = {


  friendlyName: 'Connect',


  description: 'Sockets to update the data of professionals even if user has not logged id',


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
