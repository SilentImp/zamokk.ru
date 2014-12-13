define(['jquery'], function(){

  function cardController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.shoping-card-popup');
    if(this.widget.length==0){
      return;
    }

    this.widget_opener = $('.add-to-card');
    if(this.widget_opener.length==0){
      return;
    }

    this.widget.find('.inc-dec-widget input').on('change', $.proxy(this.recount,this));
    this.widget.on(this.itype, '.remove', $.proxy(this.removeItem, this));

    this.widget_opener.on(this.itype, $.proxy(this.openPopup,this));
    this.widget.find('.close, .continue').on(this.itype, $.proxy(this.closePopup,this));
  }

  cardController.prototype.removeItem = function(event){
    event.preventDefault();
    var button = $(event.currentTarget),
        item = button.closest('.item');

    if(item.hasClass('main-item')){
      item = item.closest('article');
    }

    item.fadeOut(function(){
      $(this).remove();
    });
  };

  cardController.prototype.recount = function(event){
    event.preventDefault();
    var input = $(event.currentTarget),
        line = input.closest('.item'),
        price = line.find('.price'),
        numeral = parseInt(input.val(),10)*parseInt(price.attr('data-price'),10),
        length = (numeral).toString().length;

    price.text((numeral).toString().split("").reverse().join("").replace(/([\d][\d][\d])/g,"$1 ").split("").reverse().join("").trim());

  };

  cardController.prototype.openPopup = function(event){
    event.preventDefault();
    this.widget.fadeIn();
  };

  cardController.prototype.closePopup = function(event){
    event.preventDefault();
    this.widget.fadeOut();
  };

  return cardController;
});