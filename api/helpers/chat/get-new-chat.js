module.exports = {


  friendlyName: 'Get new chat',


  description: 'Get the chat that is going to be used to chatting',


  inputs: {
    chatId: {
      type: "number",
      required: true
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


  fn: async function ({chatId}) {
    // Get last chat.
    let lastChat = await Chat.findOne({id: chatId})
      .populate('chatState')
      .populate('conversation');
    if (lastChat) {
        //Find the whole information of customer and professional
        const customer = await sails.helpers.customer.findOne(lastChat.customer);
        const professional = await sails.helpers.professional.findOne(lastChat.professional);
        lastChat.customer = customer;
        lastChat.professional = professional;
        return lastChat;
    } else {
      throw 'noChatFound';
    }

  }


};

