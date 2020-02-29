module.exports = {


  friendlyName: 'Finish a chat',


  description: 'Finish chat and close all the connections',


  inputs: {
    customerId:{
      type: "number",
      required: false
    },
    professionalId: {
      type: "number",
      required: false
    },
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


  fn: async function (inputs) {
    let where = {}, chatState;
    if(inputs.customerId){
      where = {customer: inputs.customerId};
      chatState = sails.config.custom.CHAT_STATES.FINISHED_BY_CUSTOMER;
    } else if (inputs.professionalId) {
      where = {professional: inputs.professionalId};
      chatState = sails.config.custom.CHAT_STATES.FINISHED_BY_CUSTOMER;
    } else if( inputs.chatId) {
      where = {id: inputs.chatId};
      chatState = sails.config.custom.CHAT_STATES.FINISHED_BY_ADMIN;
    }
    // Get last chat.
    let chat = await Chat.find({
      where: where,
      limit: 1,
      sort: 'id desc'
    });
    if (chat && chat.length>0) {
      chat = chat[0];
      //Set the state of the chat
      await Chat.updateOne({id: chat.id}).set({chatState: chatState});
      // Noify users chat has been finished
      await sails.helpers.socket.send('chat-'+chat.id, sails.config.custom.SOCKET_EVENTS.CHAT_FINISHED, {});
      //Remove users from the chat
      sails.sockets.leaveAll('chat-'+chat.id);
    } else {
      throw 'noChatFound';
    }
  }


};

