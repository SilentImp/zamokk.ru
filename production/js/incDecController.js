define(['jquery'], function(){

  function incDecController(widget){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $(widget);
    if(this.widget.length==0){
      return;
    }

    this.input = this.widget.find('input');
    this.inc_button = this.widget.find('.increment');
    this.dec_button = this.widget.find('.decrement');

    this.inc_button.on(this.itype, $.proxy(this.inc,this));
    this.dec_button.on(this.itype, $.proxy(this.dec,this));
  }

  incDecController.prototype.inc = function(event){

    event.preventDefault();
    var value = parseInt(this.input.val(),10);
    this.input.val(++value);
    this.input.trigger('change');
  };

  incDecController.prototype.dec = function(event){
    event.preventDefault();
    var value = parseInt(this.input.val(),10);
    this.input.val(Math.max(--value,0));
    this.input.trigger('change');
  };

  return incDecController;
});