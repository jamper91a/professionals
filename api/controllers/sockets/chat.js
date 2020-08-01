module.exports = {


  friendlyName: 'Connect to my socket',


  description: 'This action allow the user to connect to his own channel to receive notifications ',


  inputs: {
    chatId: {
      type: 'number',
      required: true
    }
  },


  exits: {

  },


  fn: async function ({chatId}) {

    try {
      if (!this.req.isSocket) {
        return this.res.badRequest();
      }
      let chat;
      if(this.req.customer){
        //Find the chat to join
        chat = await sails.helpers.chat.getNewChat(chatId);
      }else if(this.req.professional){
        //Find the chat to join
        chat = await sails.helpers.chat.getNewChat(chatId);
      }else{
        return this.res.badRequest();
      }
      sails.sockets.join(this.req, 'chat-'+chat.id);
      const socketId = sails.sockets.getId(this.req);
      //Save the socketId to disconnect in the future
      await Socket.create({socketId, user: this.req.user.id});
      return 'Connected to chat: '+chat.id;

    } catch (e) {
      sails.log.error(e);
      throw e;
    }

  }


};
