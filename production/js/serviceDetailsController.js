define(['jquery'], function(){

  function serviceDetailsController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.service-details');
    if(this.widget.length==0){
      return;
    }
    this.tabs = this.widget.find('.tab-widget');
    this.tab_nav = this.tabs.find('>nav');
    this.tab_links = this.tab_nav.find('a');
    this.tab_links.on(this.itype,$.proxy(this.show, this));
  }


  serviceDetailsController.prototype.show = function(event){
    event.preventDefault();
    var link = $(event.currentTarget);

    this.tab_nav.find('.selected').removeClass('selected');
    this.tabs.find('.chapter.selected').removeClass('selected');

    link.addClass('selected');
    this.tabs.find('.chapter[data-chapter="'+link.attr('data-target')+'"]').addClass('selected');

  };

  return serviceDetailsController;
});