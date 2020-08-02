
parasails.registerPage('chat-page', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    userName: '',
    otherUserName: '',
    otherUserStatus: 'offline',
    beforeunload: false,
    userCloseWindow: false,
    //Var to know who will finish the chat, customer or professioanl
    finishBy: 0,
    //Var to know if the finish message has been shown
    finishMessageShown: false,
    reason_message: ''
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {

    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    if(this.chat.state !== 'noValid'){
      Sockets.mySocket();
      Sockets.myChat(this.chat.userId, this.chat.id);
      this._initialValidation();
    }
  },
  mounted: async function() {
    const self = this;
    if(this.chat.state !== 'noValid') {
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
          case 'chatFinished':
            self.closeChatWindow(data.reason);
            break;

        }
      });
      window.addEventListener('beforeunload',  this.preventNav);
      WebServices.pingChat(self.chat.id, self.chat.userType);
      self._chatPing(self.chat.id, self.chat.userType)
      if(this.chat.userType === USER_ROLE.PROFESSIONAL) {
        self._newUserConnected();
      }
    } else {
      this._noValidChat();
    }

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
      //In case user close the window pressing the x button at the top
      if(!this.userCloseWindow) {
        this._finishChat(this.chat.id, this.finishBy);
      }
      return null;
    },
    _initialValidation: function(){
      if (this.chat.userType === USER_ROLE.CUSTOMER) {
        this.otherUserName = this.chat.professional.user.name;
        if(!this.chat.professionalState) {
          this.otherUserStatus = 'offline';
        }
        this.finishBy = CHAT_STATES.FINISHED_BY_CUSTOMER;
      }else if(this.chat.userType === USER_ROLE.PROFESSIONAL) {
        this.otherUserName = this.chat.customer.user.name;
        if(!this.chat.customerState) {
          this.otherUserStatus = 'offline';
        }
        this.finishBy = CHAT_STATES.FINISHED_BY_PROFESSIONAL;
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
        self.endChat(chatId, CHAT_STATES.FINISHED_BY_OVERTIME);
      });
    },
    _newMessageChat: function (msn, myId) {
      if(myId!==msn.user)
        this.addMessageReceived(msn.message);
    },
    endChat: function (chatId, reason) {
      this.userCloseWindow = true;
      this._finishChat(chatId, reason);
    },
    _finishChat: async function (chatId, reason) {
      const self = this;
        if(this.otherUserStatus === 'online') {
          WebServices.finishChat(chatId, reason, function () {
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
      Sockets.sendChatMessage(message, this.chat.id);
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
          WebServices.finishChat(this.chat.id, CHAT_STATES.FINISHED_BEFORE_START, function (){ resolve()}, function (e){reject(e)}, this.beforeunload);
      });

    },
    _noValidChat: function (){
      $('#chatNoValid').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    closeChatWindow: function (reason){
      if(!this.finishMessageShown) {
        this.finishMessageShown = true;
        this.reason_message = Object.keys(CHAT_STATES).filter(function(key) {return CHAT_STATES[key] === reason})[0];
        //Logic to know which message to show
        this.userCloseWindow = true;
        $('#finishMessage').modal({
          backdrop: 'static',
          keyboard: false
        });
        setTimeout(function (){
          window.close();
        }, 5000)
      }


    },
    translate: function (key) {
      return I.get(key);
    },
    _chatPing: function(chatId, role) {
      setInterval(function (){
        WebServices.pingChat(chatId, role);
      }, 25000);
    }
  }
});

