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
  //alert("CHAT PROFESSIONAL: " + professionalId);
  WebServices.createChat(professionalId, function (chat) {
    OverHang.error('Chat created' + chat.id);
  }, function (error) {
    OverHang.error(I.get(error.exit));
  })
}

function changeProfessionalStatus(statusId) {
  WebServices.changeProfessionalStatus(statusId,
    function (professional) {

      OverHang.success(I.get('state_changed'));
      const state = professional.state.name;
      professional.state.name = state.replace(" ","_");
      //Change the status in the area
      $("#notify_current_state").html(I.get(`PROFESSIONAL_STATES_${professional.state.name}`));
      $("#notify_current_state_mobile").html(I.get(`PROFESSIONAL_STATES_${professional.state.name}`));
  }, function () {
    OverHang.error('State not change');

  })
}


