/* eslint-disable */

function newMessageChat(msn, myId) {
  if(myId!==msn.user)
    addMessageReceived(msn.message);
}

function finishChat(){
  WebServices.finishChat(function () {
     window.close();
  }, function () {
    console.error(e);
  })
}

function newUserConnected() {
  //Enabled message and button area
  $("#chat_messageInput").removeAttr("disabled");
  $("#chat_sendButton").removeAttr("disabled");
  //Update other user icon
  $("#chat_otherUserAvatar").removeClass("offline");
  $("#chat_otherUserAvatar").addClass("online");
  //Remove all the messages
  $("#chat_messages").html('');
}

function chatSentMenssage() {
  let message = $('#chat_messageInput').val();
  $('#chat_messageInput').val('');
  Sockets.sendChatMessage(message);

}

function addMesaggeSent(msn){
  let html =
    `
    <div class="recei-mess-wrap">
<!--        <span class="mess-time">Now</span>-->
        <div class="recei-mess__inner">
<!--            <div class="avatar avatar&#45;&#45;tiny">-->
<!--                <img src="images/icon/avatar-02.jpg" alt="John Smith">-->
<!--            </div>-->
            <div class="recei-mess-list">
                <div class="recei-mess">${msn}</div>
            </div>
        </div>
    </div>
    `;
  $('#chat_messages').append(html);
}

function addMessageReceived(msn) {
  let html =`
  <div class="send-mess-wrap">
<!--      <span class="mess-time">30 Sec ago</span>-->
      <div class="send-mess__inner">
          <div class="send-mess-list">
              <div class="send-mess">${msn}</div>
          </div>
      </div>
  </div>
  `;
  $('#chat_messages').append(html);

}
