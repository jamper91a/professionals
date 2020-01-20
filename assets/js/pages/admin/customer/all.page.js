function banUser(userId) {
  // eslint-disable-next-line no-undef
  WebServices.banUser(userId, function (data) {
    alert('banned');
    // eslint-disable-next-line handle-callback-err
  }, function (err) {
    alert('error');
  });
}
