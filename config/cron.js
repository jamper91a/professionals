/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.cron = {
  chatNotifications: {
    schedule: '*/5 * * * * *',
    onTick: async function () {
      //Check all the chats that has not been answered by the professional
      const chats = await Chat.find({chatState: sails.config.custom.CHAT_STATES.ACCEPTED, customerState: sails.config.custom.CHAT_USER_STATE.CONNECTED, professionalState: null}).populate('professional');
      for(const chat of chats) {
        await sails.helpers.socket.send('user-' + chat.professional.user, sails.config.custom.SOCKET_EVENTS.NEW_CHAT_INCOME, chat);
      }
    },
    runOnInit: true
  },
  validateChats: {
    schedule: '*/30 * * * * *',
    onTick: async function () {
      await sails.helpers.chat.checkChats();
    },
    runOnInit: true
  }
};
