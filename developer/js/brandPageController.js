define(['jquery'], function(){

  function brandPageController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.brends-page');
    if(this.widget.length==0){
      return;
    }
    this.sort = this.widget.find('.sort');
    this.sort_button = this.sort.find('a');
    this.sort_button.on(this.itype,$.proxy(this.select, this));
  }

  brandPageController.prototype.select = function(event){
    event.preventDefault();
    var link = $(event.currentTarget),
        dd = $(link.parent().parent());

    this.sort.find('>*').removeClass('selected');

    if(dd.hasClass('drop-down')){
      dd.addClass('selected');
      dd.find('p.current').text(link.text());
      dd.find('a.current').removeClass('current');
      link.addClass('current');
    }else{
      link.addClass('selected');
    }
  };

  return brandPageController;
});