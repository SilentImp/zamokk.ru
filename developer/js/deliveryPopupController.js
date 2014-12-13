define(['jquery'], function(){

  function DeliveryPopupController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.delivery-popup');
    if(this.widget.length==0){
      return;
    }
    this.close = this.widget.find('.close');
    this.company = this.widget.find('.other-company');
    this.select = this.widget.find('.delivery-popup-delivery-select');
    
    this.select.on('change', $.proxy(this.selected, this));
    this.close.on(this.itype, $.proxy(this.hidePopup, this));

    $('.private-widget .orders .order a.approve').on(this.itype, $.proxy(this.showPopup, this));

    this.selected();
  }

  DeliveryPopupController.prototype.showPopup = function(event){
    event.preventDefault();
    this.widget.stop().fadeIn();
  };

  DeliveryPopupController.prototype.hidePopup = function(event){
    event.preventDefault();
    this.widget.stop().fadeOut($.proxy(function(){
      this.widget[0].reset();
    },this));
  };

  DeliveryPopupController.prototype.selected = function(){
    if(this.select.find('option:selected').text()=="Другая"){
      this.company.show();
    }else{
      this.company.hide();
    }
  };

  return DeliveryPopupController;
});