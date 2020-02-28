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
}


