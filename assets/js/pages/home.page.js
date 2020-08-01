parasails.registerPage('home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    country: 0,
    profession: 0,
    professionals: []
  },

  computed: {

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    console.log(this.professionals);
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
    filterProfessionals: function (professionals) {
      const self = this;


      return professionals.filter(function (professional) {
        let filterByCountry = false, filterByProfession = false;
        if(professional.user.country.id === self.country || self.country === 0 ) {
          filterByCountry = true;
        }
        if(professional.profession.id === self.country || self.profession === 0 ) {
          filterByProfession = true;
        }
        return filterByCountry && filterByProfession

      });
    },
    _checkPayment: async function () {
      const parameters = getUrlVars();
      if(parameters['gateway']==='stripe') {
        if(parameters['result']==='success') {
          const sessionId = parameters ['session_id'];
          Toast.success(I.get('TOP_UP_SUCCESSFUL'));
        } else if (parameters['result']==='fail') {
          Toast.success(I.get('TOP_UP_FAIL'));
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
          self.country = parseInt($('#country').val());
          self.filterProfessionals(self.professionals);
      });
      $("#profession").select2({
        minimumResultsForSearch: 20,
        dropdownParent: $('#profession').next('.dropDownSelect2')
      }).on('change', function(){
        self.country = parseInt($('#profession').val());
        self.filterProfessionals(self.professionals);
      });
    }
  }
});



