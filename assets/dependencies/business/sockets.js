class Sockets {

  static professionals(){
    //Socket io
    io.socket.get('/api/professionals/subscribe', function(data, jwr) {
      console.log("socket: professionals");
      console.log('Server responded with status code ' + jwr.statusCode + ' and data: ', data);

    });
    io.socket.on(SOCKET_EVENTS.READER_CHANGE_STATUS, function(professional) {

      console.log('SOCKET_EVENTS.READER_CHANGE_STATUS');
      ProfessionalsEvents.$emit('professional-mini', 'changeStatus', {professional});

    });
  }

  static mySocket(){
    //Var to know which chat notification the use has receive
    let chatsReceive = [];
    io.socket.get('/api/user/subscribe', function(data, jwr) {
      console.log("socket: user");
      console.log('Server responded with status code ' + jwr.statusCode + ' and data: ', data);

    });
    //Socket io
    io.socket.on(SOCKET_EVENTS.NEW_CHAT_INCOME, async function(chat, jwr) {
      let receivePreviously = chatsReceive.indexOf(chat.id);
      if(receivePreviously===-1){
        chatsReceive.push(chat.id);
        Sounds.chatNotification();
        OverHang.confirm(I.get(SOCKET_EVENTS.NEW_CHAT_INCOME),  function (answer) {
          Sounds.stop();
        }, function () {
          ProfessionalsEvents.$emit('professional-mini', 'chatAccepted', {chat, professional: chat.professional});
        }, function () {
          ProfessionalsEvents.$emit('professional-mini', 'chatDeclined', {chat, professional: chat.professional});
        });
      }
    });
    io.socket.on(SOCKET_EVENTS.CHAT_CANCELED, async function(chat, jwr) {
      console.log('CHAT_CANCELED');
      OverHang.warning(I.get(SOCKET_EVENTS.CHAT_CANCELED));
    });
  }

  static myChat(myId, chatId){
    io.socket.get('/api/chat/subscribe', {chatId},function(data, jwr) {

      //Notify I have connected to the chat
      io.socket.get('/api/chat/connected', {chatId}, function (resData, jwres){
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
      ProfessionalsEvents.$emit('chat', 'chatFinished', {reason: data.reason});
    });
  }

  static myAdmin(){
    io.socket.on(SOCKET_EVENTS.admin.CHAT_CREATED, async function(data, jwr) {
      console.log('socket.on', SOCKET_EVENTS.admin.CHAT_CREATED)
      ProfessionalsEvents.$emit('all-current-chats', SOCKET_EVENTS.admin.CHAT_CREATED, data);
    });
  }

  static sendChatMessage(message, chatId){
    console.log('emit chat sendChatMessage');
    io.socket.post('/api/chat/sendMessage', {message, chatId}, function (resData, jwres){
      ProfessionalsEvents.$emit('chat', 'addMesaggeSent', {msn:message});
      // addMesaggeSent(message);
    });
  }


}



