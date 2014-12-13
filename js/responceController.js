define(['jquery','jquery.scrollTo'],function(){

  function responceController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.responces-widget');
    if(this.widget.length==0){
      return;
    }
    this.prev_button = this.widget.find('.controls a.prev');
    this.next_button = this.widget.find('.controls a.next');
    this.slides = this.widget.find('.slides');
    this.current = this.slides.find('article:eq(0)');

    this.prev_button.on(this.itype,$.proxy(this.prev, this));
    this.next_button.on(this.itype,$.proxy(this.next, this));
  }


  responceController.prototype.prev = function(event){
    event.preventDefault();
    var prev = this.current.prev();
    if(prev.length == 0){
      this.current = this.slides.find('article:last-child');
    }else{
      this.current = prev;
    }
    this.slides.scrollTo(this.current, 500, {axis:'x'});
  };

  responceController.prototype.next = function(event){
    event.preventDefault();
    var next = this.current.next();
    if(next.length == 0){
      this.current = this.slides.find('article:first-child');
    }else{
      this.current = next;
    }
    console.log(this.current);
    this.slides.scrollTo(this.current, 500, {axis:'x'});
  };

  return responceController;
});