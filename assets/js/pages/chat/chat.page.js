
parasails.registerPage('chat-page', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    userName: '',
    otherUserName: '',
    otherUserStatus: 'offline',
    beforeunload: false,
    userCloseWindow: false
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {

    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    Sockets.mySocket();
    Sockets.myChat(this.chat.userId);
    this._initialValidation();
  },
  mounted: async function() {
    const self = this;

    ProfessionalsEvents.$on('chat', function (event, data) {
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
    window.addEventListener('beforeunload',  this.preventNav)
  },

  beforeDestroy: async function(){
      window.removeEventListener("beforeunload", this.preventNav);

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    preventNav: function (event){
      this.beforeunload = true;
      if(!this.userCloseWindow) {
        this._finishChat(this.chat.id, false);
      }
      return null;
    },
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
        // this._chatStarTimer(this.chat.maxDuration, this.chat.id);
      }
    },
    _chatStarTimer: function (seconds, chatId) {
      const self = this;
      const timerInstance = new easytimer.Timer();
      timerInstance.start({target: {seconds: seconds}});
      timerInstance.addEventListener('secondsUpdated', function (e) {
        $('#basicUsage').html(timerInstance.getTimeValues().toString());
      });
      timerInstance.addEventListener('targetAchieved', function (e) {
        self.endChat(chatId, true);
      });
    },
    _newMessageChat: function (msn, myId) {
      if(myId!==msn.user)
        this.addMessageReceived(msn.message);
    },
    endChat: function (chatId, overtime) {
      this.userCloseWindow = true;
      this._finishChat(chatId, overtime);
    },
    _finishChat: async function (chatId, overTime) {
        if(this.otherUserStatus === 'online') {
          WebServices.finishChat(chatId, overTime, function () {

            window.close();
          }, function (e) {
            console.error(e);
          }, this.beforeunload);
        }else{
          await this._finishChatBeforeStart();
        }


    },
    _newUserConnected: function () {
      this.otherUserStatus='online';
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
            <div class="recei-mess__inner">
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
      <div class="send-mess__inner">
          <div class="send-mess-list">
              <div class="send-mess">${msn}</div>
          </div>
      </div>
  </div>
        `;
      $('#chat_messages').append(html);
    },
    _finishChatBeforeStart: function (){
      return new Promise (async (resolve, reject) => {
          WebServices.finishBeforeStart(this.chat.id, function (){ resolve()}, function (e){reject(e)}, this.beforeunload);
      });

    }
  }
});

