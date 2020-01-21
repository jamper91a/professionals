let userId;
function selectUser(userId) {
  this.userId = userId;
}
function banUser(banned) {
  // eslint-disable-next-line no-undef
  WebServices.banUser(this.userId, banned, function (data) {
    // eslint-disable-next-line no-undef
    $('#staticModal').modal('hide');
    // eslint-disable-next-line handle-callback-err
  }, function (err) {
    alert('error');
  });
}

function deleteUser() {
  // eslint-disable-next-line no-undef
  WebServices.banUser(this.userId, banned, function (data) {
    // eslint-disable-next-line no-undef
    $('#staticModal').modal('hide');
    // eslint-disable-next-line handle-callback-err
  }, function (err) {
    alert('error');
  });
}
