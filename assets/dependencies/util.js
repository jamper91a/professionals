class Util {

  toastOptions = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };

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
  static toastSuccess(title, message){
    if(title!=null)
      toastr.success(title, message, this.toastOptions);
    else
      toastr.success(null, message, this.toastOptions);
  }
  static toastInfo(title, message){
    if(title!=null)
      toastr.info(title, message, this.toastOptions);
    else
      toastr.info(null, message, this.toastOptions)
  }
  static toastWarning(title, message){
    if(title!=null)
      toastr.warning(title, message, this.toastOptions);
    else
      toastr.warning(null, message, this.toastOptions)
  }
  static toastError(title, message){
    if(title!=null)
      toastr.error(title, message, this.toastOptions);
    else
      toastr.error(null, message, this.toastOptions)
  }
}



