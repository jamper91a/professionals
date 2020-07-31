parasails.registerPage('home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    country: 0,
    profession: 0
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    // _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    const self=this;
    Sockets.professionals();
    await this._checkPayment();
    this._select2();

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    _reloadProfessionals: function (){
      // eslint-disable-next-line no-undef,handle-callback-err
      Api.patch('/pv/professionals-home', {country: this.country, profession: this.profession}, function (err, data) {
        if(data)
          // eslint-disable-next-line no-undef
          $('#professionals').html(data);
      });
    },
    _checkPayment: async function () {
      console.log('checking payment');
      const parameters = getUrlVars();
      if(parameters['gateway']==='stripe') {
        if(parameters['result']==='success') {
          const sessionId = parameters ['session_id'];
          Toast.success(await I.get('TOP_UP_SUCCESSFUL'));
        } else if (parameters['result']==='fail') {
          Toast.success(await I.get('TOP_UP_FAIL'));
        }
        window.history.replaceState({}, document.title, "/");
      }
    },
    _select2: function (){
      const self = this;
      $("#country").select2({
        minimumResultsForSearch: 20,
        dropdownParent: $('#country').next('.dropDownSelect2')
      }).on('change', function(){
          self.country = $('#country').val();
          self._reloadProfessionals();
      });
      $("#profession").select2({
        minimumResultsForSearch: 20,
        dropdownParent: $('#profession').next('.dropDownSelect2')
      }).on('change', function(){
        self.country = $('#profession').val();
        self._reloadProfessionals();
      });
    },
    test3: function(){
      console.log('this is a test');
    }
  }
});



