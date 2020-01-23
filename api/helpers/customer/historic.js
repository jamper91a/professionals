module.exports = {


  friendlyName: 'Historic',


  description: 'Get the historic of chats and calls the customer has had',


  inputs: {
    customer: {
      type: "number",
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({customer}) {
    try {
      //Get chat's histoty
      let chats = await Chat.find(
        {
          where: {
            customer: customer
          },
          sort: 'id DESC'

        }).populate('conversation');
      chats = sails.helpers.util.formatDates(chats);
      console.log("chats");
      console.log(chats);
      return {chats};
    } catch (e) {
      console.error(e);
      return e;
    }
  }


};

