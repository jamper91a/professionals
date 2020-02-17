$(document).ready(function () {
  I.init();
});

const PROFESSIONAL_STATES = {
  ONLINE: 1,
  OFFLINE: 2,
  JUST_CALLS:3,
  JUST_CHAT:4,
  BUSY: 5
};




function callProfessional(professionalId) {
  alert("CALL PROFESSIONAL: " + professionalId)
}
function chatProfessional(professionalId) {
  alert("CHAT PROFESSIONAL: " + professionalId)
}

function changeProfessionalStatus(statusId) {
  WebServices.changeProfessionalStatus(statusId,
    function () {

      OverHang.success(I.get('state_changed'));
      //Change the status in the area
      $("#notify_current_state").html('');
  }, function () {
    OverHang.error('State not change');

  })
}


