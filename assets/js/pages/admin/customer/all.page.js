let userId;
function selectUser(userId) {
  this.userId = userId;
}
function banUser(banned) {
  // eslint-disable-next-line no-undef
  WebServices.banUser(this.userId, banned, function (data) {

    switch (banned) {
      case 0:
        // eslint-disable-next-line no-undef
        $('#unbanmodal').modal('hide');
        break;
      case 1:
        // eslint-disable-next-line no-undef
        $('#banmodal').modal('hide');
        break;
    }
    // eslint-disable-next-line no-undef
    Toast.success(null, window.SAILS_LOCALS.translations.Successful_Operation);
    reloadTable();
    // eslint-disable-next-line handle-callback-err
  }, function (err) {
    alert('error');
  });
}

function deleteUser() {
  // eslint-disable-next-line no-undef
  WebServices.deleteUser(this.userId, function (data) {
    // eslint-disable-next-line no-undef
    $('#deletemodal').modal('hide');
    // eslint-disable-next-line no-undef
    Toast.success(null, window.SAILS_LOCALS.translations.Successful_Operation);
    // eslint-disable-next-line handle-callback-err
  }, function (err) {
    alert('error');
  });
}

function reloadTable() {
  // eslint-disable-next-line no-undef,handle-callback-err
  Api.patch('/pv/admin/customer/customer-table', {}, function (err, data) {
    if(data)
      // eslint-disable-next-line no-undef
      $('.table').html(data);
  });
}
