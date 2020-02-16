module.exports = {


  friendlyName: 'Logout',


  description: 'Logout user.',


  inputs: {

  },


  exits: {

  },


  fn: async function () {

    this.res.clearCookie('jwt');
    const socketId = this.req.user.user.id;
    await sails.helpers.socket.close(socketId);
    this.req.user = null;
    return this.res.redirect('/');

  }


};
