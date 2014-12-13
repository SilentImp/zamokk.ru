define([
  'jquery', 
  'jquery.maskedinput/jquery.maskedinput.min'
  ], function(){

  function feedbackController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.help-form');
    if(this.widget.length==0){
      return;
    }

    this.message = $('.help-form-message');

    this.widget.find(".tel").mask("+7 999 999 99 99");
    this.widget.on('submit', $.proxy(this.submitFeedback, this));

  }


  feedbackController.prototype.submitFeedback = function(event){
    event.preventDefault();

    // todo: send data with to server with ajax or remove event.preventDefault(); to send with page reload

    this.widget.hide();
    this.widget[0].reset();
    this.message.show();
    window.scrollTo(0,$('.help-page')[0].offsetTop);

  };


  return feedbackController;
});