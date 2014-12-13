define([
  'jquery',
  'jquery.scrollTo'
  ],function(){

  function CarouselController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.carousel-widget');
    if(this.widget.length==0){
      return;
    }

    this.total = this.widget.find('figure').length;
    this.selected = this.widget.find('figure.selected');

    this.wrapper = this.widget.find('.figures');
    this.widget.find('.next').on(this.itype, $.proxy(this.next, this));
    this.widget.find('.prev').on(this.itype, $.proxy(this.prev, this));
    this.widget.find('nav.points a').on(this.itype, $.proxy(this.select, this));
  }

  CarouselController.prototype.select = function(event){
    event.preventDefault();
    var link = $(event.currentTarget),
        num = link.attr('data-target'),
        current = this.widget.find('figure:eq('+num+')');

    link.parent().find('.selected').removeClass('selected');
    link.addClass('selected');

    this.makeCurrent(current);

  };

  CarouselController.prototype.makeCurrent = function(current){
    this.selected.removeClass('selected');
    this.selected = current;
    this.selected.addClass('selected');

    this.wrapper.scrollTo(this.selected, 500, {axis:'x'});
  };

  CarouselController.prototype.selectBullet = function(current){
    var count = current.nextAll('figure').length,
        index = this.total-count-1;
    this.widget.find('nav.points a.selected').removeClass('selected');
    this.widget.find('nav.points a:eq('+index+')').addClass('selected');
  }

  CarouselController.prototype.next = function(event){
    event.preventDefault();
    var current = this.selected.next();
    if(current.length==0){
      current = this.widget.find('figure:eq(0)');
    }
    this.makeCurrent(current);
    this.selectBullet(current);
  };

  CarouselController.prototype.prev = function(event){
    event.preventDefault();
    var current = this.selected.prev();
    if(current.length==0){
      current = this.widget.find('figure:last-child');
    }
    this.makeCurrent(current);
    this.selectBullet(current);
  };

  return CarouselController;
});