
parasails.registerPage('admin-professionals-all-data', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    userId: 0,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    console.log(this);
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    _reloadTable: function () {
      Api.patch('/pv/admin/professional/professional-table', {}, function (err, data) {
        if(data)
          // eslint-disable-next-line no-undef
          $('.table').html(data);
      });
    },
    deleteUser: function () {
      const self=this;
      WebServices.deleteUser(this.userId, function () {
        $('#deletemodal').modal('hide');
        Toast.success(null, self.translations.Successful_Operation);
      }, function (err) {
        alert('error');
      });
    },
    banUser: function (banned) {
      console.log('banUser: ', banned);
      console.log('userId: ', this.userId);
      const self=this;
      WebServices.banUser(this.userId, banned, function () {

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
        self._reloadTable();
        // eslint-disable-next-line handle-callback-err
      }, function (err) {
        alert('error');
      });
    },
    selectUser: function (userId) {
      this.userId = userId;
      console.log('userSelected: ', this.userId);
    },
  }
});


