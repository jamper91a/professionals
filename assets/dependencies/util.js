$(document).ready(function () {
  I.init();
  Sounds.init();
});

const PROFESSIONAL_STATES = {
  ONLINE: 1,
  OFFLINE: 2,
  JUST_CALLS:3,
  JUST_CHAT:4,
  BUSY: 5
};
const SOCKET_EVENTS = {
    NEW_CHAT_INCOME: 'newChat',
    READER_CHANGE_STATUS: 'changeStatus',
    NEW_MESSAGE: 'newMessage',
    USER_CONNECTED_CHAT: 'userConnectedChat',
    CHAT_FINISHED: 'chatFinished'
};




function callProfessional(professionalId) {
  alert("CALL PROFESSIONAL: " + professionalId)
}
function chatProfessional(professionalId) {
  //alert("CHAT PROFESSIONAL: " + professionalId);
  WebServices.createChat(professionalId, function (chat) {
    $('#confirmChat').modal('show');
  }, function (error) {
    OverHang.error(I.get(error.exit));
  })
}
function openChatWindow(){
  // window.open('/chat', '_blank', 'status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=1,'+
  // 'scrollbars=0,width=600,height=600');
  window.open('/chat', '_blank');
  $('#confirmChat').modal('hide');
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

function getUrlParameter (url) {
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
}
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}



