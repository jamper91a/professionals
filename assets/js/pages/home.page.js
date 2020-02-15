/* eslint-disable no-undef */
let homeCountry=0, homeProfession=0;
$(document).ready(function() {
  $('#profession').change(function(){
    //Profession selected
    homeProfession = parseInt($(this).find("option:selected").attr('value'));
    reloadProfessionals();
  });
  $('#country').change(function(){
    //Profession selected
    homeCountry = parseInt($(this).find("option:selected").attr('value'));
    reloadProfessionals();
  });
});

function reloadProfessionals() {
  // eslint-disable-next-line no-undef,handle-callback-err
  Api.patch('/pv/professionals-home', {country: homeCountry, profession: homeProfession}, function (err, data) {
    if(data)
      // eslint-disable-next-line no-undef
      $('#professionals').html(data);
  });
}
