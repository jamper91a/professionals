module.exports = {


  friendlyName: 'Create',


  description: 'Create chat between a customer and a professional',


  inputs: {
    customerId:{
      type: "number",
      required: true
    },
    professionalId: {
      type: "number",
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
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
    //Check customer and professional exists
    try {
      const customer = await Customer.findOne({id: inputs.customerId});
      const professional = await Professional.findOne({id: inputs.professionalId}).populate('state');
      if (customer && professional) {
        //Check professional is available to chat
        if (professional.state.id === sails.config.custom.PROFESSIONAL_STATES.ONLINE ||
          professional.state.id === sails.config.custom.PROFESSIONAL_STATES.JUST_CHAT
        ) {
          //Check customer is not in another chat
          const lastChatcustomer = await sails.helpers.customer.getLastChat(customer.id).tolerate('noChatFound', ()=>{
            return null;
          });
          // const lastChatcustomer = await sails.helpers.customer.getLastChat(customer.id);
          if (lastChatcustomer === null ||
            (lastChatcustomer && lastChatcustomer.chatState.id === sails.config.custom.CHAT_STATES.FINISHED) ||
            (lastChatcustomer && lastChatcustomer.chatState.id === sails.config.custom.CHAT_STATES.FINISHED_BY_CUSTOMER) ||
            (lastChatcustomer && lastChatcustomer.chatState.id === sails.config.custom.CHAT_STATES.FINISHED_BY_PROFESSIONAL) ||
            (lastChatcustomer && lastChatcustomer.chatState.id === sails.config.custom.CHAT_STATES.FINISHED_BY_ADMIN)) {
            //Create a chat instance
            //Create conversation for this chat
            const conversation = await Conversation.create({messages: []}).fetch();
            const chat = await Chat.create({
              customer: customer.id,
              professional: professional.id,
              chatState: sails.config.custom.CHAT_STATES.CREATED,
              conversation: conversation.id
            }).fetch();

            return chat;
          } else {
            throw 'customerCanNotChat';
          }
        } else {
          throw 'professionalCanNotChat';
        }
      }
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  }


};

