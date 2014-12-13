define(['jquery'],function(){

  function lineController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.line-widget');
    if(this.widget.length==0){
      return;
    }
    this.load_button = this.widget.find('.more a');

    this.load_button.on(this.itype,$.proxy(this.load, this));
  }


  lineController.prototype.load = function(event){
    event.preventDefault();
    var more = this.load_button.parent();
    more.addClass('loading');

    window.setTimeout($.proxy(function(){
      lines = this.widget.find('.row');
      line = $(lines[Math.ceil(Math.random()*lines.length)-1]).clone().addClass('loading');
      line.find('.loading-scrn').removeClass('closed');
      more.before(line);
      more.removeClass('loading');
      window.setTimeout($.proxy(function(){
        line.removeClass('loading');
      },this),0);
      window.setTimeout($.proxy(function(){
        line.find('.loading-scrn').addClass('closed');
      },this),1500);
    },this),1000);

  };

  return lineController;
});