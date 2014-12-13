define(['jquery'], function(dummy1){

  function PasswordController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    $('.show-hide-password-button').on(this.itype,$.proxy(this.switchState,this));
  }


  PasswordController.prototype.switchState = function(event){
    event.preventDefault();
    var button = $(event.currentTarget),
        password = $("#"+button.attr('data-target'));
    if(button.hasClass('visible')){
      password.attr('type','password');
    }else{
      password.attr('type','text');
    }
    button.toggleClass('visible');
  };

  return PasswordController;
});