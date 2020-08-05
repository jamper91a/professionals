
parasails.registerPage('all-current-chats', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    chats: []
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    const self = this;
    ProfessionalsEvents.$on('all-current-chats', function (event, data) {
      console.log('all-current-chats', event, data);
        switch (event) {
          case SOCKET_EVENTS.admin.CHAT_CREATED:
            self.chats = data;
            break;

        }
    });
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    banUser: function (banned) {
      console.log('banUser: ', banned);
      const self=this;
      WebServices.banUser(this.userId, banned, function (user) {
        //Edit array
        let newCustomer = self.customers[self.index];
        newCustomer.user=user;
        // self.$set(self.professionals, self.index, newProfessional);
        self.customers.splice(self.index, 1, newCustomer);
        switch (banned) {
          case 0:
            // eslint-disable-next-line no-undef
            $('#unbanmodal').modal('hide');
            break;
          case 1:
            // eslint-disable-next-line no-undef
            $('#banmodal').modal('hide');
            break;
        }
        // eslint-disable-next-line no-undef
        Toast.success(null, self.translations.Successful_Operation);
        // eslint-disable-next-line handle-callback-err
      }, function (err) {
        alert('error');
      });
    },
    selectChat: function (chatId, index) {
      console.log('selectChat: ', chatId, index);
      // this.userId = userId;
      // this.index = index;
    },
  }
});

