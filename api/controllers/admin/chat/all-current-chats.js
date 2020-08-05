module.exports = {


  friendlyName: 'All',


  description: 'Action that would list all the chats running in the system, so the admin can review them',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    try {
      const chats = await sails.helpers.chat.getAllRunningChats();
      console.log(chats);
      return this.res.view(
        'pages/admin/chat/all-current-chats',
        {
          layout: 'layouts/admin',
          chats: chats});
    } catch (e) {
      throw {serverError: e};
    }

  }


};
