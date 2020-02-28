module.exports = {


  friendlyName: 'Get last chat',


  description: '',


  inputs: {
    customerId:{
      type: "number",
      required: true
    },
  },


  exits: {

    success: {
      outputFriendlyName: 'Last chat',
    },

    noChatFound: {
      description: 'No chat found for that customer'
    }

  },


  fn: async function ({customerId}) {
    // Get last chat.
    const lastChat = await Chat.find({
      where: {customer: customerId},
      limit: 1,
      sort: 'id desc'
    })
      .populate('chatState');
    if (lastChat && lastChat.length>0) {
      return lastChat[0];
    } else {
      throw 'noChatFound';
    }

  }


};

