class WebServices {
  static banUser(userId, success, error) {
    let url = "/api/user/ban";
    Util.post(url, {userId}, function (err, data) {
      if(err)
        return error(err);
      if(data)
        return success(data);
    })
  }
}


