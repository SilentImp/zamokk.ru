define(['jquery'],function(){

  function starsController(widget){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }

    this.widget = $(widget);
    if(this.widget.length==0){
      return;
    }
    this.width = this.widget.width(); 
    this.left = this.widget.offset().left;
    this.origin = this.widget.attr('data-value');
    this.value = this.widget.find('.value');
    this.value.width(this.origin);
    
    this.widget.on(this.itype, $.proxy(this.saveStar, this));
    this.widget.on('mousemove', $.proxy(this.recountStar, this));
    this.widget.on('mouseleave', $.proxy(this.backToOrigin, this));

    $(window).on('resize', $.proxy(this.recount, this));
  }

  starsController.prototype.recount = function(event){
    this.left = this.widget.offset().left;
  };

  starsController.prototype.getPercents = function(event){
    var left =  event.clientX-this.left+window.pageXOffset;
    if(left<0){left=0;}
    percent = left*100/this.width;
    percent = Math.ceil(percent/20)*20;
    if(percent<0){percent=0;}
    if(percent>100){percent=100;}
    percent = Math.floor(percent);
    return percent+'%';
  };


  starsController.prototype.saveStar = function(event){
    event.preventDefault();
    var percent = this.getPercents(event);
    this.origin = percent;
    this.widget.attr('data-value',percent);
    this.value.width(percent);
  };

  starsController.prototype.recountStar = function(event){
    this.recount();
    this.value.width(this.getPercents(event));
  };

  starsController.prototype.backToOrigin = function(event){
    this.value.width(this.origin);
  };


  return starsController;
});