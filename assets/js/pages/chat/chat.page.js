
parasails.registerPage('chat-page', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    userName: '',
    otherUserName: '',
    otherUserStatus: 'online'
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this._initialValidation();
  },
  mounted: async function() {
    const self = this;

    ProfessionalsEvents.$on('chat', function (event, data) {
      console.log('on chat', event);
      switch (event) {
        case 'newMessageChat':
          self._newMessageChat(data.msn, data.myId);
          break;
        case 'addMesaggeSent':
          self._addMesaggeSent(data.msn);
          break;
        case 'newUserConnected':
          self._newUserConnected();
          break;
        case 'chatStarTimer':
          self._chatStarTimer(data.duration, data.chatId);
          break;

      }
    });
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    _initialValidation: function(){
      if (this.chat.userType === USER_ROLE.CUSTOMER) {
        this.otherUserName = this.chat.professional.user.name;
        if(!this.chat.professionalState) {
          this.otherUserStatus = 'offline';
        }
      }else if(this.chat.userType === USER_ROLE.PROFESSIONAL) {
        this.otherUserName = this.chat.customer.user.name;
        if(!this.chat.customerState) {
          this.otherUserStatus = 'offline';
        }
        this._chatStarTimer(this.chat.maxDuration, this.chat.id);
      }
    },
    _chatStarTimer: function (seconds, chatId) {
      const timerInstance = new easytimer.Timer();
      timerInstance.start({target: {seconds: seconds}});
      timerInstance.addEventListener('secondsUpdated', function (e) {
        $('#basicUsage').html(timerInstance.getTimeValues().toString());
      });
      timerInstance.addEventListener('targetAchieved', function (e) {
        this.finishChat(chatId, true);
      });
    },
    _newMessageChat: function (msn, myId) {
      if(myId!==msn.user)
        this.addMessageReceived(msn.message);
    },
    finishChat: function (chatId, overTime) {
      WebServices.finishChat(chatId, overTime,function () {
        window.close();
      }, function () {
        console.error(e);
      })
    },
    _newUserConnected: function () {
      //Enabled message and button area
      $("#chat_messageInput").removeAttr("disabled");
      $("#chat_sendButton").removeAttr("disabled");
      //Update other user icon
      $("#chat_otherUserAvatar").removeClass("offline");
      $("#chat_otherUserAvatar").addClass("online");
      //Remove all the messages
      $("#chat_messages").html('');
    },
    chatSentMenssage: function () {
      let message = $('#chat_messageInput').val();
      $('#chat_messageInput').val('');
      Sockets.sendChatMessage(message);
    },
    _addMesaggeSent: function (msn) {
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
    },
    addMessageReceived: function (msn) {
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
    },
  }
});





// function chatStarTimer(seconds, chatId){
//
//   var timerInstance = new easytimer.Timer();
//   timerInstance.start({target: {seconds: seconds}});
//   timerInstance.addEventListener('secondsUpdated', function (e) {
//     $('#basicUsage').html(timerInstance.getTimeValues().toString());
//   });
//   timerInstance.addEventListener('targetAchieved', function (e) {
//     finishChat(chatId, true);
//   });
// }

// function newMessageChat(msn, myId) {
//   if(myId!==msn.user)
//     addMessageReceived(msn.message);
// }

// function finishChat(chatId, overTime){
//   WebServices.finishChat(chatId, overTime,function () {
//      window.close();
//   }, function () {
//     console.error(e);
//   })
// }

// function newUserConnected() {
//   //Enabled message and button area
//   $("#chat_messageInput").removeAttr("disabled");
//   $("#chat_sendButton").removeAttr("disabled");
//   //Update other user icon
//   $("#chat_otherUserAvatar").removeClass("offline");
//   $("#chat_otherUserAvatar").addClass("online");
//   //Remove all the messages
//   $("#chat_messages").html('');
// }

// function chatSentMenssage() {
//   let message = $('#chat_messageInput').val();
//   $('#chat_messageInput').val('');
//   Sockets.sendChatMessage(message);
//
// }

// function addMesaggeSent(msn){
//   let html =
//     `
//     <div class="recei-mess-wrap">
// <!--        <span class="mess-time">Now</span>-->
//         <div class="recei-mess__inner">
// <!--            <div class="avatar avatar&#45;&#45;tiny">-->
// <!--                <img src="images/icon/avatar-02.jpg" alt="John Smith">-->
// <!--            </div>-->
//             <div class="recei-mess-list">
//                 <div class="recei-mess">${msn}</div>
//             </div>
//         </div>
//     </div>
//     `;
//   $('#chat_messages').append(html);
// }

// function addMessageReceived(msn) {
//   let html =`
//   <div class="send-mess-wrap">
// <!--      <span class="mess-time">30 Sec ago</span>-->
//       <div class="send-mess__inner">
//           <div class="send-mess-list">
//               <div class="send-mess">${msn}</div>
//           </div>
//       </div>
//   </div>
//   `;
//   $('#chat_messages').append(html);
//
// }
