define(['jquery', 'priceController', 'jquery.mCustomScrollbar.concat.min'], function($, priceController){

  function controlsController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }

    $('.color-switch .option, .categorys-switch .option, .options-switch .option').on(this.itype, $.proxy(this.toggleSelected, this));

    $('.price-widget').each(function(index, element){
      new priceController(element);
    });

    $('.categorys-switch .wrapper').mCustomScrollbar({
      horizontalScroll:false,
      scrollInertia:0,
      scrollButtons:{
        enable: false
      },
      advanced:{
          updateOnContentResize: true
      }
    });
  }

  controlsController.prototype.plural = function(number, one, two, five) {
    number = Math.abs(number);
    number %= 100;
    if (number >= 5 && number <= 20) {
        return five;
    }
    number %= 10;
    if (number == 1) {
        return one;
    }
    if (number >= 2 && number <= 4) {
        return two;
    }
    return five;
  }; 

  controlsController.prototype.toggleSelected = function(event){
    event.preventDefault();
    var link = $(event.currentTarget);
    link.toggleClass('selected');
      
    // Удаляем старые результаты
    old = $('.search-results');
    old.removeClass('show');
    window.setTimeout(function(){
      old.remove();
    }, 600);

    // Добавляем новые
    var count = parseInt(link.attr('data-search'),10),
        wrapper = link.closest('nav'),
        title = wrapper.find('.title');

    if(title.length>0){
      wrapper = title;
    }

    if(count>0){
      var goods = count*Math.floor((Math.random()*10));
      wrapper.prepend('<span class="search-results">'+this.plural(count, 'Найден', 'Найдены', 'Найдено')+' '+count+' '+this.plural(count,'модель','модели','моделей')+' ('+goods+' '+this.plural(goods,'товар','товара','товаров')+'). <a href="#">Показать?</a></span>');
    }else{
      wrapper.prepend('<span class="search-results">Товаров не найдено</span>');
    }

    // Добавляем блоку результата события для его закрытия
    var found = wrapper.find('.search-results:eq(0)');
    window.setTimeout(function(){
      found.addClass('show');
    },0);
      
  };

  controlsController.prototype.switchSelected = function(event){
    event.preventDefault();
    var link = $(event.currentTarget),
        container = link.parent();

    container.find('.selected').removeClass('selected');
    link.addClass('selected');

  };



  return controlsController;
});