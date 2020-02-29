module.exports = {


  friendlyName: 'Get new chat',


  description: 'Get the chat that is going to be used to chatting',


  inputs: {
    customerId:{
      type: "number",
      required: false
    },
    professionalId: {
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

    noValidChat: {
      description: 'The new chat has been already started/finished'
    }

  },


  fn: async function (inputs) {
    let where = {};
    if(inputs.customerId){
      where = {customer: inputs.customerId};
    } else if (inputs.professionalId) {
      where = {professional: inputs.professionalId};
    }
    // Get last chat.
    let lastChat = await Chat.find({
      where: where,
      limit: 1,
      sort: 'id desc'
    })
      .populate('chatState');
    if (lastChat && lastChat.length>0) {
      lastChat = lastChat[0];
      //Check that the chat has not started yet
      if(lastChat.chatState.id === sails.config.custom.CHAT_STATES.CREATED) {

        //Find the whole information of customer and professional
        const customer = await sails.helpers.customer.findOne(lastChat.customer);
        const professional = await sails.helpers.professional.findOne(lastChat.professional);
        lastChat.customer = customer;
        lastChat.professional = professional;
        return lastChat;
      } else {
        throw 'noValidChat';
      }
    } else {
      throw 'noChatFound';
    }

  }


};

