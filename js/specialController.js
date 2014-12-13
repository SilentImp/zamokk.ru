define(['jquery'],function(){

  function specialController(){
    this.html = $('html');
    this.itype = 'click'; 
    if(this.html.hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.special-widget');
    if(this.widget.length==0){
      return;
    }
    this.controls = this.widget.find('.controls');
    this.specials = this.widget.find('.specials');
    this.prev_button = this.controls.find('.prev');
    this.next_button = this.controls.find('.next');
    this.load_block = this.widget.find('.more');
    this.load_button = this.widget.find('.more a');

    this.current = this.widget.find('article:eq(0)');

    this.scrolling = false;
    this.max_scroll_time = 1500;
    this.scroll_time_step = 250;
    this.scroll_px_step = 1000;

    this.prev_button.on(this.itype,$.proxy(this.prev, this));
    this.next_button.on(this.itype,$.proxy(this.next, this));
    this.load_button.on(this.itype,$.proxy(this.load, this));

    $(window).on('scroll',$.proxy(this.checkIfVisible, this));

    this.checkIfVisible();
  }

  specialController.prototype.scrollToSpecial = function(element){
    this.scrolling = true;
    this.html.addClass('scrolling');
    this.startTime = parseInt(new Date().getTime().toString().substr(-5), 10);
    this.startPos = window.pageYOffset;

    this.endPos = element.offset().top-50;
    this.vector = 1;
    if (this.endPos < this.startPos) {
      this.vector = -1;
    }
    this.toScroll = Math.abs(this.endPos - this.startPos);
    this.duration = Math.round(this.toScroll * this.scroll_time_step / this.scroll_px_step);

    if (this.duration > this.max_scroll_time) {
      this.duration = this.max_scroll_time;
    }
    this.scrollPerMS = this.toScroll / this.duration;
    this.endTime = this.startTime + this.duration;

    return this.animationLoop();
  };

  specialController.prototype.animationLoop = function() {
    if (!this.renderScroll()) {
      this.scrolling = false;
      this.html.removeClass('scrolling');
      return;
    }
    return requestAnimationFrame($.proxy(this.animationLoop,this));
  };

  specialController.prototype.renderScroll = function() {
    var currentTime, time;
    time = parseInt(new Date().getTime().toString().substr(-5), 10);
    if (time > this.endTime) {
      time = this.endTime;
    }
    currentTime = time - this.startTime;
    window.scroll(0, Math.round((this.vector * this.scrollPerMS * currentTime) + this.startPos));
    if (this.endTime <= time) {
      return false;
    }
    if (window.pageYOffset === this.endPos) {
      return false;
    }
    return true;
  };

  specialController.prototype.checkIfVisible = function(event){

    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = this.widget.offset().top;
    var elemBottom = +this.load_block.offset().top+this.load_block.height()+50;
    // var elemBottom = elemTop + this.widget.height();

    if(
      (elemBottom<docViewTop)||(docViewBottom>elemBottom)
    ){
      this.controls.addClass('disabled');
    }else{
      this.controls.removeClass('disabled');
    }

  };

  specialController.prototype.prev = function(event){
    event.preventDefault();
    var prev = this.current.prev();
    if(prev.length == 0){
      this.current = this.specials.find('article:last-child');
    }else{
      this.current = prev;
    }
    this.scrollToSpecial(this.current);
  };

  specialController.prototype.next = function(event){
    event.preventDefault();
    var next = this.current.next();
    if(next.length == 0){
      this.current = this.specials.find('article:first-child');
    }else{
      this.current = next;
    }
    this.scrollToSpecial(this.current);
  };

  specialController.prototype.load = function(event){
    event.preventDefault();
    var more = this.load_button.parent();
    more.addClass('loading');

    window.setTimeout($.proxy(function(){
      articles = this.widget.find('article');
      article = $(articles[Math.ceil(Math.random()*articles.length)-1]).clone().addClass('loading');
      article.find('.loading-scrn').removeClass('closed');
      this.specials.append(article);
      more.removeClass('loading');
      window.setTimeout($.proxy(function(){
        article.removeClass('loading');
      },this),0);
      window.setTimeout($.proxy(function(){
        article.find('.loading-scrn').addClass('closed');
      },this),1500);
    },this),1000);

  };

  return specialController;
});