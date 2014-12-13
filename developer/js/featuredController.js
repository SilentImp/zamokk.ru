define(['jquery','jquery.scrollTo'],function(){

  function featuredController(widget){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $(widget);
    if(this.widget.length==0){
      return;
    }
    this.prev_button = this.widget.find('.controls a.prev');
    this.next_button = this.widget.find('.controls a.next');
    this.slides = this.widget.find('.slides');
    this.current = this.slides.find('.slide:eq(0)');

    this.prev_button.on(this.itype,$.proxy(this.prev, this));
    this.next_button.on(this.itype,$.proxy(this.next, this));
  }


  featuredController.prototype.prev = function(event){
    event.preventDefault();
    var prev = this.current.prev();
    if(prev.length == 0){
      this.current = this.slides.find('.slide:last-child');
    }else{
      this.current = prev;
    }
    this.slides.scrollTo(this.current, 500, {axis:'x'});
  };

  featuredController.prototype.next = function(event){
    event.preventDefault();
    var next = this.current.next();
    if(next.length == 0){
      this.current = this.slides.find('.slide:first-child');
    }else{
      this.current = next;
    }
    console.log(this.current);
    this.slides.scrollTo(this.current, 500, {axis:'x'});
  };

  return featuredController;
});