class WebServices {
  static banUser(userId, banned, success, error) {
    let url = "/api/user/ban";
    Api.post(url, {userId, banned}, function (err, data) {
      if(err)
        return error(err);
      if(data)
        return success(data);
    })
  }
  static deleteUser(userId, success, error) {
    let url = "/api/user/remove";
    Api.post(url, {userId}, function (err, data) {
      if(err)
        return error(err);
      if(data)
        return success(data);
    })
  }

  static changeProfessionalStatus(state, success, error) {
    let url = "/api/professional/changeStatus";
    Api.post(url, {state}, function (err, data) {
      if(err)
        return error(err);
      if(data)
        return success(data);
    })
  }

  static createChat(professionalId, success, error) {
    let url = "/api/chat/create";
    Api.post(url, {professionalId}, function (err, data) {
      if(err)
        return error(err.responseJSON.data);
      if(data)
        return success(data);
    })
  }

  static finishChat(chatId, reason, success, error, beforeUnload = false) {
    let url = "/api/chat/finish";
    if(!beforeUnload) {
      Api.post(url, {chatId, reason},function (err, data) {
        if(err)
          return error(err.responseJSON.data);
        if(data)
          return success(data);
      })
    } else {
      const fd = new FormData();
      fd.append('chatId', chatId);
      fd.append('reason', reason);
      navigator.sendBeacon(url, fd);
    }
  }

  static createPayment(offerId, success, error) {
    let url = "/api/payment/create";
    Api.post(url, {offerId},function (err, data) {
      if(err)
        return error(err.responseJSON.data);
      if(data)
        return success(data);
    });
  }
  static pingChat(chatId, role) {
    let url = "/api/chat/ping";
      Api.post(url, {chatId, role},function (err, data) {
        if(err)
          console.log(error(err.responseJSON.data));
      });

  }
}


