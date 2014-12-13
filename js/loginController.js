define([
  'jquery',
  "jquery.maskedinput/jquery.maskedinput.min"
  ], function(dummy1, dummy2){

  function loginController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.auth-widget');
    if(this.widget.length==0){
      return;
    }

    this.widget_opener = $('.fast-access .login');
    if(this.widget_opener.length>0){
      this.popup = $('.auth-popup');
      this.widget_opener.on(this.itype, $.proxy(this.openPopup,this));  
      this.popup.find('.close').on(this.itype, $.proxy(this.closePopup,this));
    }

    this.recover_form = this.widget.find('form.recover');
    this.login_form = this.widget.find('form.login');

    this.widget.find('.password-recovery').on(this.itype, $.proxy(this.showRecovery, this));
    this.widget.find('.i-remember').on(this.itype, $.proxy(this.showLogin, this));

    $(".tel").mask("+7 999 999 99 99");
    $(".change-password input[name=password]").mask("******?");
    
  }

  loginController.prototype.openPopup = function(event){
    event.preventDefault();
    this.popup.addClass('show').hide().fadeIn();
  };

  loginController.prototype.closePopup = function(event){
    event.preventDefault();
    this.popup.fadeOut(function(){
      $(this).removeClass('show');
    });
  };

  loginController.prototype.showRecovery = function(event){
    event.preventDefault();
    this.login_form.hide();
    this.recover_form.show();
  };

  loginController.prototype.showLogin = function(event){
    event.preventDefault();
    this.recover_form.hide();
    this.login_form.show();
  };

  return loginController;
});