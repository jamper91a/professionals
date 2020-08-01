
module.exports = {


  friendlyName: 'Finish a chat',


  description: 'Finish chat and close all the connections',


  inputs: {
    chatId: {
      type: "number",
      required: false
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'New chat',
    },

    noChatFound: {
      description: 'No chat found'
    },

  },


  fn: async function ({chatId}) {
    let chatState;
    chatState = sails.config.custom.CHAT_STATES.DECLINED_BY_CUSTOMER;
    // Get last chat.
    let chat = await Chat.findOne({id: chatId}).populate('professional');
    if (chat) {
      const finishTime = moment();
      await Chat.updateOne({id: chat.id}).set({chatState: chatState, duration: 0, cost: 0, finishTime:finishTime.format('YYYY-MM-DD HH:mm:ss')});
      //Update professional status
      await sails.helpers.professional.changeStatus(chat.professional.id, chat.professional.previousState);
      return {};
    } else {
      throw 'noChatFound';
    }
  }


};

