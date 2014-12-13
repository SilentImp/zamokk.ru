define(['jquery'], function(){

  function TogglerController(button){
    this.button = $(button);
    this.name = this.button.attr('data-name') || 'toggler';
    this.widget = this.button.parent().parent();
    
    this.pannel = this.widget.find('.toggler-wrapper');
    if(this.pannel.length==0){
      return;
    }
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.button.on(this.itype, $.proxy(this.toggle, this));

    this.ls = $('html').hasClass('localstorage');
    if(this.ls){
      this.state = localStorage[this.name] || 'closed'
      if(
        (this.state=='closed'&&this.button.hasClass('open'))
        ||(this.state=='open'&&!this.button.hasClass('open'))
      ){
        this.button.trigger(this.itype);
      }
    }
  }

  TogglerController.prototype.toggle = function(event){
    if(this.button.hasClass('open')){
      this.pannel.removeClass('open');
      this.button.removeClass('open');
      this.widget.addClass('closed');
      this.state = 'closed';
    }else{
      this.pannel.addClass('open');
      this.button.addClass('open');
      this.widget.removeClass('closed');
      this.state = 'open';
    }
    if(this.ls){
      localStorage[this.name] = this.state;
    }
  };

  return TogglerController;
});