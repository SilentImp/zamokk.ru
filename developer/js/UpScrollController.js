define(['jquery','jquery.scrollTo'],function(){

  function UpScrollController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $(".scroll-to-top");
    if(this.widget.length==0){
      $('body').append('<div class="scroll-to-top icon-up-open-big"></div>');
      this.widget = $(".scroll-to-top");
    }

    this.html = $('html');
    this.scrolling = false;
    this.max_scroll_time = 1500;
    this.scroll_time_step = 250;
    this.scroll_px_step = 1000;

    $(window).on('scroll',$.proxy(this.checkIfVisible, this));
    this.checkIfVisible();

    this.widget.on(this.itype,$.proxy(this.up, this));
  }

  UpScrollController.prototype.checkIfVisible = function(event){
    if($(window).scrollTop()>$(window).height()/2){
      this.widget.fadeIn();
    }else{
      this.widget.fadeOut();
    }
  };

  UpScrollController.prototype.up = function(element){
    this.scrolling = true;
    this.html.addClass('scrolling');
    this.startTime = parseInt(new Date().getTime().toString().substr(-5), 10);
    this.startPos = window.pageYOffset;

    this.endPos = 0;
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

  UpScrollController.prototype.animationLoop = function() {
    if (!this.renderScroll()) {
      this.scrolling = false;
      this.html.removeClass('scrolling');
      return;
    }
    return requestAnimationFrame($.proxy(this.animationLoop,this));
  };

  UpScrollController.prototype.renderScroll = function() {
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

  return UpScrollController;
});