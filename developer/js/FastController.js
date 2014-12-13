define(['jquery'], function(){

  function FastController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.fast-widget');
    if(this.widget.length==0){
      return;
    }
    this.load_button = this.widget.find('.more a');
    this.load_button.on(this.itype,$.proxy(this.load, this));
  }

  FastController.prototype.load = function(event){
    event.preventDefault();
    var more = this.load_button.parent();
    more.addClass('loading');

    window.setTimeout($.proxy(function(){
      var nav = this.widget.find('nav'),
          line = nav.find('.line:eq(0)').clone().addClass('loading');
      nav.append(line);
      more.removeClass('loading');
      window.setTimeout($.proxy(function(){
        line.removeClass('loading');
      },this),0);
    },this),1000);

  };

  return FastController;
});