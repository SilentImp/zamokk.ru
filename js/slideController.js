define([
  'jquery'
  ], function(){

  

  function slideController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.slide-widget');
    if(this.widget.length==0){
      return;
    }
    
    this.prev_button = this.widget.find('.slide-widget-navigation .prev');
    this.next_button = this.widget.find('.slide-widget-navigation .next');

    this.container = this.widget.find(".slide-widget-list");
    this.figures = this.container.find('figure');

    this.count = this.widget.find(".slide-widget-count b");
    this.total = this.widget.find(".slide-widget-count span");

    this.all_slide = this.figures.length;
    this.index_slide = 1;

    this.count.text(this.index_slide);
    this.total.text(this.all_slide);

    this.current = $(this.figures[0]);

    this.prev_button.on(this.itype,$.proxy(this.prev, this));
    this.next_button.on(this.itype,$.proxy(this.next, this));
  }


  slideController.prototype.prev = function(event){
    event.preventDefault();
    var current = this.current.prev();
    
    this.index_slide-=1;

    if(current.length==0){
      current = $(this.figures[this.figures.length-1]);
      this.index_slide = this.all_slide;
    }

    this.count.html(this.index_slide.toString());
    
    this.total.text(this.all_slide);

    this.current = current;
    this.container.scrollTo(this.current, 500, {axis:'x'});
  };

  slideController.prototype.next = function(event){
    event.preventDefault();
    var current = this.current.next();
    
    this.index_slide+=1;

    if(current.length==0){
      current = $(this.figures[0]);
      this.index_slide = 1;
    }

    this.count.html(this.index_slide);
    this.total.text(this.all_slide);

    this.current = current;
    this.container.scrollTo(this.current, 500, {axis:'x'});
  };

  return slideController;
});