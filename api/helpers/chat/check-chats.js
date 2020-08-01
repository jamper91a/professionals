const moment = require('moment');
module.exports = {


  friendlyName: 'Check chats',


  description: 'Check the chats and finish the ones who does not fill the requirements',


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function () {
    const chats = await Chat.find({chatState: [sails.config.custom.CHAT_STATES.CREATED,sails.config.custom.CHAT_STATES.ACCEPTED]}).populate('professional');
    for(const chat of chats) {
      //Check how long ago the chat was created, if is more than 60 sec, I will finished it
      var currentTime = new moment();
      var chatTime = moment(chat.createdAt);
      const difference = currentTime.diff(chatTime, 'seconds');
      if(difference>60) {
        console.log('Finish chat because no reply')
        await sails.helpers.chat.finish(undefined, undefined, chat.id, undefined, true, undefined);
      }
      // await sails.helpers.socket.send('user-' + chat.professional.user, sails.config.custom.SOCKET_EVENTS.NEW_CHAT_INCOME, chat);
    }
  }


};

