class Util {
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
}



