define([
  'jquery',
  "jquery.maskedinput/jquery.maskedinput.min"
  ], function(dummy1, dummy2){

  function tabController(widget){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $(widget);
    this.buttons = this.widget.find('>nav a');
    this.sections = this.widget.find('>section.chapter');
    this.buttons.on(this.itype, $.proxy(this.open, this));
  }

  tabController.prototype.open = function(event){
    event.preventDefault();
    var button = $(event.currentTarget),
        nav = button.parent();

    nav.find('.selected').removeClass('selected');
    button.addClass('selected');

    this.widget.find('>.chapter.selected').removeClass('selected');
    this.widget.find('>.chapter.'+button.attr('data-target')).addClass('selected');
  };

  function privateController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }

    var tabs  = $('.private-widget .tabs'),
        index = tabs.length;

    if(index>0){
      while(index--){
        new tabController(tabs[index]);
      }
    }

    this.orderToggle = $('.order-list .order .toggle');
    this.orderToggle.on(this.itype, $.proxy(this.toggleDetails, this));

    $(".tel").mask("+7 999 999 99 99");
    $("#create_passport_serial").mask("99 99");
    $("#create_passport_number").mask("999999");
    $("#create_passport_date").mask("99/99/9999");
    $("#passport_serial").mask("99 99");
    $("#passport_number").mask("999999");
    $("#passport_date").mask("99/99/9999");
  }

  privateController.prototype.toggleDetails = function(event){
    event.preventDefault();
    var link = $(event.currentTarget),
        order = link.closest('.order'),
        details = order.find('.order-details');

    if(order.hasClass('open')){
      details.slideUp();
    }else{
      details.slideDown();
    }

    order.toggleClass('open');
    order.toggleClass('closed');
    
  };

  return privateController;
});