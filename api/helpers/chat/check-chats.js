const moment = require('moment');
module.exports = {


  friendlyName: 'Check chats',


  description: 'Check the chats that has not been answered by the professional',


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function () {
    //Check all the chats that were accepted by the customer, but the reader has not reply yet.
    const chats = await Chat.find({chatState: [sails.config.custom.CHAT_STATES.ACCEPTED, sails.config.custom.CHAT_STATES.CREATED], professionalState: null}).populate('professional');
    for(const chat of chats) {
      //Check how long ago the chat was created, if is more than 60 sec, I will finished it
      var currentTime = new moment();
      var chatTime = moment(chat.createdAt);
      const difference = currentTime.diff(chatTime, 'seconds');
      if(difference>60) {
        console.log('Finish chat because no reply')
        await sails.helpers.chat.finish.with({chatId: chat.id, reason: sails.config.custom.CHAT_STATES.FINISHED_BY_NO_ANSWER});
      }
    }
    return {};
  }


};

