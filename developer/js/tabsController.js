define(['jquery'], function(){

  function previewsController(widget){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.popup = $('.full-view-widget');
    if(this.popup.length==0){
      return;
    }

    this.widget = $(widget);
    if(this.widget.length==0){
      return;
    }

    this.widget.on(this.itype, 'a', $.proxy(this.openPopup, this));
    this.popup.find('.close').on(this.itype, 'a', $.proxy(this.closePopup, this));
  }

  previewsController.prototype.closePopup = function(event){
    event.preventDefault();
    this.popup.fadeOut();
  };

  previewsController.prototype.openPopup = function(event){
    event.preventDefault();
    this.popup.fadeIn();
  };

  function tabsController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.tabs-widget');
    if(this.widget.length==0){
      return;
    }
    this.buttons = this.widget.find('>nav a');
    this.sections = this.widget.find('>section');
    this.pictures = this.widget.find('.pictures');
    this.pictures.each(function(index,element){
      new previewsController(element);
    });

    this.buttons.on(this.itype, $.proxy(this.open, this));
  }


  tabsController.prototype.open = function(event){
    event.preventDefault();
    var button = $(event.currentTarget),
        nav = button.parent();

    nav.find('.selected').removeClass('selected');
    button.addClass('selected');
    this.widget.find('>section.selected').removeClass('selected');
    this.widget.find('>section.'+button.attr('data-target')).addClass('selected');
  };

  return tabsController;
});