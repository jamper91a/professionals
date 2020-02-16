class Sockets {

  static professionals(){
    //Socket io
    io.socket.get('/api/professionals/subscribe', function(data, jwr) {
      console.log("socket: professionals");
      console.log('Server responded with status code ' + jwr.statusCode + ' and data: ', data);

    });
    io.socket.on('changeStatus', function(professional) {
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
      switch (professional.state) {
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
    console.log("socket: user");
    io.socket.get('/api/user/subscribe', function(data, jwr) {
      console.log("socket: user");
      console.log('Server responded with status code ' + jwr.statusCode + ' and data: ', data);

    });
    //Socket io
    io.socket.on('newMessage', function(data, jwr) {
      console.log("socket: user");
      console.log(data);

    });
  }

}



