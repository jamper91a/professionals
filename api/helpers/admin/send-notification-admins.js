module.exports = {


  friendlyName: 'Send socket message all admins',


  description: 'This would send a message to all the admins in the syste',


  inputs: {
    event: {
      type: "string",
      required: true
    },
    data: {
      type: "ref",
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({event, data}) {
    const usersAdmins = await User.find({group: sails.config.custom.USER_ADMIN});
    for(const user of usersAdmins){
      await sails.helpers.socket.send('user-' + user.id, event, data);
    }


  }


};

