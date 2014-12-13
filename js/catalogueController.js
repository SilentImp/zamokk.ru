define(['jquery', 'starsController','jquery.mCustomScrollbar.concat.min'],function($, starsController){

  function catalogueController(widget){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }

    this.page = $('.catalogue-page');
    this.widget = $(widget);
    if(this.widget.length==0){
      return;
    }
    this.goods = this.widget.find('.goods');
    this.items = this.goods.find('.items');
    
    this.view = this.widget.find('.view');
    this.list_button = this.view.find('.list');
    this.grid_button = this.view.find('.grid');

    this.list_button.on(this.itype, $.proxy(this.setView, this));
    this.grid_button.on(this.itype, $.proxy(this.setView, this));

    this.items.on(this.itype, '.remove', $.proxy(this.removeItem, this));

    this.widget.find('.sort a').on(this.itype, $.proxy(this.sortItems, this));

    this.items.find('.stars').each(function(index, element){
      new starsController(element);
    });

    this.load_button = this.widget.find('.goods .more a');
    this.load_button.on(this.itype,$.proxy(this.load, this));

  }

  catalogueController.prototype.sortItems = function(event){
    event.preventDefault();
    var button = $(event.currentTarget),
        selected = button.parent().find('.selected');
    selected.removeClass('selected');
    button.addClass('selected');
  };

  catalogueController.prototype.removeItem = function(event){
    event.preventDefault();
    var button = $(event.currentTarget),
        item = button.closest('article');

    item.fadeOut(function(){
      $(this).remove();
    });
  };


  catalogueController.prototype.load = function(event){
    event.preventDefault();
    var more = this.load_button.parent();
    more.addClass('loading');

    window.setTimeout($.proxy(function(){
      lines = this.items.find('>.row');
      line = $(lines[Math.ceil(Math.random()*lines.length)-1]).clone().addClass('loading');
      line.find('.loading-scrn').removeClass('closed');
      this.items.append(line);
      this.items.find('>.row:last .stars').each(function(index, element){
        new starsController(element);
      });
      more.removeClass('loading');
      window.setTimeout($.proxy(function(){
        line.removeClass('loading');
      },this),0);
      window.setTimeout($.proxy(function(){
        line.find('.loading-scrn').addClass('closed');
      },this),1500);
    },this),1000);
  };

  catalogueController.prototype.setView = function(event){
    event.preventDefault();
    this.items.toggleClass('list').toggleClass('grid');
    this.list_button.toggleClass('selected');
    this.grid_button.toggleClass('selected'); 
  };


  return catalogueController;
});