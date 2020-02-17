module.exports = {


  friendlyName: 'Logout',


  description: 'Logout user.',


  inputs: {

  },


  exits: {

  },


  fn: async function () {

    try {
      this.res.clearCookie('jwt');
      const socketId = this.req.user.id;
      await sails.helpers.socket.close(socketId);
      this.req.user = null;
      this.req.customer = null;
      this.req.professional = null;
      return this.res.redirect('/');
    } catch (e) {
      sails.log.error('Loggin Out',e);
    }

  }


};
