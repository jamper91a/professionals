class WebServices {
  static banUser(userId, banned, success, error) {
    let url = "/api/user/ban";
    Util.post(url, {userId, banned}, function (err, data) {
      if(err)
        return error(err);
      if(data)
        return success(data);
    })
  }
  static deleteUser(userId, success, error) {
    let url = "/api/user/remove";
    Util.post(url, {userId}, function (err, data) {
      if(err)
        return error(err);
      if(data)
        return success(data);
    })
  }
}


