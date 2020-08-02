module.exports = {


  friendlyName: 'Create',


  description: 'Web service to create a chat',


  inputs: {
    customerId:{
      type: "number",
      required: false
    },
    professionalId: {
      type: "number",
      required: true
    }
  },


  exits: {
    professionalCanNotChat: {
      description: 'Professional can not chat at the moment'
    },
    customerCanNotChat:{
      description: 'Customer can not chat, probably they have not finished a previous chat'
    },
    customerNotFounds: {
      description: 'Customer does not have enough founds to init the chat'
    }
  },


  fn: async function (inputs) {

    try {
      if(!inputs.customerId) {
        inputs.customerId = this.req.customer.id;
      }
      const chat = await sails.helpers.chat.create.with(inputs);
      return chat;
    } catch (e) {
      throw e;
    }

  }


};
