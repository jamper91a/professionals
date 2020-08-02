
parasails.registerPage('admin-professionals-all', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    userId: 0,
    index: 0,
    professionals: []
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    deleteUser: function () {
      const self=this;
      WebServices.deleteUser(this.userId, function () {
        $('#deletemodal').modal('hide');
        Toast.success(null, self.translations.Successful_Operation);
        self.professionals.splice(self.index, 1);
      }, function (err) {
        alert('error');
      });
    },
    banUser: function (banned) {
      const self=this;
      WebServices.banUser(this.userId, banned, function (user) {
        //Edit array
        let newProfessional = self.professionals[self.index];
        newProfessional.user=user;
        self.$set(self.professionals, self.index, newProfessional);
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
    selectUser: function (userId, index) {
      this.userId = userId;
      this.index = index;
    },
  }
});


