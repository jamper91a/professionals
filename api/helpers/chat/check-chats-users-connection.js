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
    const chats = await Chat.find({chatState: sails.config.custom.CHAT_STATES.STARTED}).populate('professional');
    for(const chat of chats) {
      //Check how long ago the customer and professional ping
      try {
        const currentTime = new moment();
        const customerLastPing = moment(chat.customerLastPing);
        const professionalLastPing = moment(chat.professionalLastPing);
        const differenceCustomer = currentTime.diff(customerLastPing, 'seconds');
        const differenceProfessional = currentTime.diff(professionalLastPing, 'seconds');
        console.log('differenceCustomer', differenceCustomer);
        console.log('differenceProfessional', differenceProfessional);
        if (differenceCustomer > 30) {
          console.log('Finish chat because lost connection customer');
          await sails.helpers.chat.finish.with({chatId: chat.id, reason: sails.config.custom.CHAT_STATES.LOST_CONNECTION_CUSTOMER});
        }
        if (differenceProfessional > 30) {
          console.log('Finish chat because lost connection professional');
          await sails.helpers.chat.finish.with({chatId: chat.id, reason: sails.config.custom.CHAT_STATES.LOST_CONNECTION_PROFESSIONAL});
        }
      } catch (e) {
        sails.log.error(e);
      }
    }
    return {}
  }


};

