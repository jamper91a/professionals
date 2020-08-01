class Sockets {

  static professionals(){
    //Socket io
    io.socket.get('/api/professionals/subscribe', function(data, jwr) {
      console.log("socket: professionals");
      console.log('Server responded with status code ' + jwr.statusCode + ' and data: ', data);

    });
    io.socket.on(SOCKET_EVENTS.READER_CHANGE_STATUS, function(professional) {
      //Find the buttons
      const callButton1 = $(`[data-type-button="call-1-${professional.id}"]`);
      const callButton2 = $(`[data-type-button="call-2-${professional.id}"]`);
      const chatButton1 = $(`[data-type-button="chat-1-${professional.id}"]`);
      const chatButton2 = $(`[data-type-button="chat-2-${professional.id}"]`);
      //Remove all css classes
      callButton1.removeClass('btn-success btn-secondary btn-warning btn-danger');
      callButton2.removeClass('btn-success btn-secondary btn-warning btn-danger');
      chatButton1.removeClass('btn-success btn-secondary btn-warning btn-danger');
      chatButton2.removeClass('btn-success btn-secondary btn-warning btn-danger');
      //Remove the disable
      callButton1.removeAttr('disabled');
      callButton2.removeAttr('disabled');
      chatButton1.removeAttr('disabled');
      chatButton2.removeAttr('disabled');

      //Check which classes to add depending of the status
      let callCssClass, chatCssClass;
      switch (professional.state.id) {
        case PROFESSIONAL_STATES.ONLINE:
          callCssClass = 'btn-success';
          chatCssClass = 'btn-success';
          break;
        case PROFESSIONAL_STATES.BUSY:
          callCssClass = 'btn-warning';
          chatCssClass = 'btn-warning';
          break;
        case PROFESSIONAL_STATES.JUST_CALLS:
          callCssClass = 'btn-success';
          chatCssClass = 'btn-danger';
          break;
        case PROFESSIONAL_STATES.JUST_CHAT:
          callCssClass = 'btn-danger';
          chatCssClass = 'btn-success';
          break;
        case PROFESSIONAL_STATES.OFFLINE:
          callCssClass = 'btn-secondary';
          chatCssClass = 'btn-secondary';
          break;
      }

      callButton1.addClass(callCssClass);
      callButton2.addClass(callCssClass);
      chatButton1.addClass(chatCssClass);
      chatButton2.addClass(chatCssClass);
      // Disable buttons
      if(callCssClass !== 'btn-success') {
        callButton1.attr('disabled', 'disabled');
        callButton2.attr('disabled', 'disabled');
      }
      if(chatCssClass !== 'btn-success') {
        chatButton1.attr('disabled', 'disabled');
        chatButton2.attr('disabled', 'disabled');
      }

    });
  }

  static mySocket(){
    io.socket.get('/api/user/subscribe', function(data, jwr) {
      console.log("socket: user");
      console.log('Server responded with status code ' + jwr.statusCode + ' and data: ', data);

    });
    //Socket io
    io.socket.on(SOCKET_EVENTS.NEW_CHAT_INCOME, async function(data, jwr) {
      Sounds.chatNotification();
      OverHang.confirm(I.get(SOCKET_EVENTS.NEW_CHAT_INCOME),  function (answer) {
        console.log('cb');
        Sounds.stop();
      }, function () {
        ProfessionalsEvents.$emit('professional-mini', 'newChatIncome', {});
      }, function () {

      });

    });
  }

  static myChat(myId){
    console.log('mychat', myId);
    io.socket.get('/api/chat/subscribe', function(data, jwr) {

      //Notify I have connected to the chat
      io.socket.get('/api/chat/connected', {}, function (resData, jwres){
      });
    });
    io.socket.on(SOCKET_EVENTS.NEW_MESSAGE, function(data, jwr) {
      console.log('emit chat newMessageChat');
      ProfessionalsEvents.$emit('chat', 'newMessageChat', {msn:data, myId});
      // newMessageChat(data, myId);
    });
    io.socket.on(SOCKET_EVENTS.USER_CONNECTED_CHAT, function(data, jwr) {
      console.log('emit chat newUserConnected');
      if(myId!== data.userId) {
        ProfessionalsEvents.$emit('chat', 'newUserConnected', {});
        // newUserConnected();
        ProfessionalsEvents.$emit('chat', 'chatStarTimer', {duration: data.duration, chatId: data.chatId});
        // chatStarTimer(data.duration, data.chatId);
      }
      if(data.role === USER_ROLE.PROFESSIONAL) {
        // chatStarTimer(data.maxDuration, data.chatId);
        ProfessionalsEvents.$emit('chat', 'chatStarTimer', {duration: data.maxDuration, chatId: data.chatId});
      }
    });
    io.socket.on(SOCKET_EVENTS.CHAT_FINISHED, function(data, jwr) {
      console.log('emit chat newMessageChat');
      window.close();
    });
  }

  static sendChatMessage(message){
    console.log('emit chat sendChatMessage');
    io.socket.post('/api/chat/sendMessage', {message}, function (resData, jwres){
      ProfessionalsEvents.$emit('chat', 'addMesaggeSent', {msn:message});
      // addMesaggeSent(message);
    });
  }


}



