/* eslint-disable no-undef */
//All the rates
const rates = window.SAILS_LOCALS.rates;

$(document).ready(function () {
//Detect when the profession' select change
  $('#profession').change(function(){
    //Make the group visible
    $("#rateGroup").css("display", "block");
    //Profession selected
    const profession = parseInt($(this).find("option:selected").attr('value'));
    if(profession>0){
      //Hide all elements from rates
      $("#rate").html("");
      //Filter rates to get just those ones related with the profession selected
      let allRates= rates;
      allRates = allRates.filter(function(rate) { return rate.profession===profession; });
      const $rateDropdown = $("#rate");
      allRates.forEach(function (rate) {
        // $("#rate").html(`<option value="${rate.id}">${rate.name} - ${rate.id}</option>`);
        $rateDropdown.append($("<option />").val(rate.id).text(rate.name + '-' + rate.id));
      });
    }else{

    }

  });
});

