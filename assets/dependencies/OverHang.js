//https://paulkr.github.io/overhang.js/
class OverHang {
  static get options() {
    return  {
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
  };



  static show(type = 'success',message, closeConfirm=false, duration = 3, overlay = false){
    $("body").overhang({
      type: type,
      message: message,
      closeConfirm: closeConfirm,
      duration: duration,
      overlay: overlay
    });
  }

  static success(message, closeConfirm=false, duration = 3, overlay = false){
   this.show('success', message, closeConfirm, duration, overlay);
  }
  static info(message, closeConfirm=false, duration = 3, overlay = false){
    this.show('info', message, closeConfirm, duration, overlay);
  }
  static warning(message, closeConfirm=false, duration = 3, overlay = false){
    this.show('warn', message, closeConfirm, duration, overlay);
  }
  static error(message, closeConfirm=false, duration = 3, overlay = false){
    this.show('error', message, closeConfirm, duration, overlay);
  }
}



