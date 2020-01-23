module.exports = {


  friendlyName: 'Historic',


  description: 'Get the historic of chats and calls the customer has had',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function () {
    try {
      const customer = await Customer.findOne({user: this.req.user.id});
      //Get chat's histoty
      const chats = await Chat.find(
        {
          where: {
            customer: customer.id
          },
          sort: 'id DESC'

        }).populate('conversation');
      return {chats};
    } catch (e) {
      return e;
    }
  }


};

