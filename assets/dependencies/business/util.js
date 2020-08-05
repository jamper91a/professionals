ProfessionalsEvents = new Vue();
$(document).ready(async function () {
  await I.init();
  Sounds.init();

});

const PROFESSIONAL_STATES = {
  ONLINE: 1,
  OFFLINE: 2,
  JUST_CALLS:3,
  JUST_CHAT:4,
  BUSY: 5
};
const USER_ROLE = {
  ADMIN: 1,
  CUSTOMER: 2,
  PROFESSIONAL: 3,
};
const SOCKET_EVENTS = {
    NEW_CHAT_INCOME: 'newChat',
    READER_CHANGE_STATUS: 'changeStatus',
    NEW_MESSAGE: 'newMessage',
    USER_CONNECTED_CHAT: 'userConnectedChat',
    CHAT_FINISHED: 'chatFinished',
    CHAT_CANCELED: 'chatCanceled',
    admin:{
      CHAT_CREATED: 'CHAT_CREATED'
    }
};
const CHAT_STATES= {
  CREATED: 6,
    ACCEPTED: 18,
    STARTED: 7,
    FINISHED:8,
    FINISHED_BY_CUSTOMER: 11,
    FINISHED_BY_PROFESSIONAL: 12,
    FINISHED_BY_ADMIN: 13,
    FINISHED_BY_OVERTIME: 14,
    FINISHED_BY_NO_ANSWER: 15,
    DECLINED_BY_PROFESSIONAL: 16,
    DECLINED_BY_CUSTOMER: 19,
    FINISHED_BEFORE_START: 17,
    LOST_CONNECTION_CUSTOMER: 20,
    LOST_CONNECTION_PROFESSIONAL: 21,
};


function changeProfessionalStatus(statusId) {
  WebServices.changeProfessionalStatus(statusId,
    async function (professional) {

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

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

function removeParams(sParam)
{
  var url = window.location.href.split('?')[0]+'?';
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] != sParam) {
      url = url + sParameterName[0] + '=' + sParameterName[1] + '&'
    }
  }
  return url.substring(0,url.length-1);
}



