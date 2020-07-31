
parasails.registerPage('professional-register', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    rates: []
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    this.rates = window.SAILS_LOCALS.rates;
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    professionChanged: function (event){
      //Make the group visible
      $("#rateGroup").css("display", "block");
      //Profession selected
      const profession = parseInt(event.target.value);
      console.log('profession', profession);
      if(profession>0){
        //Hide all elements from rates
        $("#rate").html("");
        //Filter rates to get just those ones related with the profession selected
        let allRates= this.rates;
        console.log(allRates);
        allRates = allRates.filter(function(rate) { return rate.profession===profession; });
        const $rateDropdown = $("#rate");
        console.log(allRates);
        allRates.forEach(function (rate) {
          // $("#rate").html(`<option value="${rate.id}">${rate.name} - ${rate.id}</option>`);
          $rateDropdown.append($("<option />").val(rate.id).text(rate.name + '-' + rate.id));
        });
      }else{

      }
    }
  }
});
