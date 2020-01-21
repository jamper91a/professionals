class Api {
  static post(url, data, callback) {
    $.post(url, data, function(data, status, xhr){
      if(status === "success"){
        return callback(null, data);
      }
      return callback(xhr, null);
    });
  }
  static get(url, data, callback) {
    $.get(url, data, function(data, status, xhr){
      if(status === "success"){
        return callback(null, data);
      }
      return callback(xhr, null);
    });
  }
  static patch(url, data, callback) {
    $.ajax({
      type: 'PATCH',
      url: url,
      data: data,
      success: function(result){
        callback(null, result);
      },
      error: function(result){
        callback(result, result);
    }
    });
  }
}



