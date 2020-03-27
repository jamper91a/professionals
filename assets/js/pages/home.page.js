/* eslint-disable no-undef */
let homeCountry=0, homeProfession=0;
$(document).ready(function() {
  //Subscribe to professionals socket
  Sockets.professionals();
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
  checkPayment();
});

function reloadProfessionals() {
  // eslint-disable-next-line no-undef,handle-callback-err
  Api.patch('/pv/professionals-home', {country: homeCountry, profession: homeProfession}, function (err, data) {
    if(data)
      // eslint-disable-next-line no-undef
      $('#professionals').html(data);
  });
}

function checkPayment() {
  const parameters = getUrlVars();
  if(parameters['gateway']==='stripe') {
    if(parameters['result']==='success') {
      const sessionId = parameters ['session_id'];
      Toast.success(I.get('TOP_UP_SUCCESSFUL'));
    } else if (parameters['result']==='fail') {
      Toast.success(I.get('TOP_UP_FAIL'));
    }
  }

}


