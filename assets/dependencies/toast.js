
class Toast {

  static options(){
    return {
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
  }

  static success(title, message){
    if(title!=null)
      toastr.success(title, message, this.options());
    else
      toastr.success(null, message, this.options());
  }
  static info(title, message){
    if(title!=null)
      toastr.info(title, message, this.options());
    else
      toastr.info(null, message, this.options())
  }
  static warning(title, message){
    if(title!=null)
      toastr.warning(title, message, this.options());
    else
      toastr.warning(null, message, this.options())
  }
  static error(title, message){
    if(title!=null)
      toastr.error(title, message, this.options());
    else
      toastr.error(null, message, this.options())
  }
}



