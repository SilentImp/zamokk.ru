define(['jquery'], function(){

  function tabController(widget){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $(widget);
    if(this.widget.length==0){
      return;
    }
    this.id = this.widget.attr('data-tab-id');
    this.selected = this.widget.find('>nav>a.selected');
    if(this.selected.length==0){
      this.selected = this.widget.find('>nav>a:eq(0)');
      this.selected.addClass('selected');
    }
    this.chapters = this.widget.find('>.chapter');
    this.chapters.removeClass('selected');
    this.widget.find('.'+this.selected.attr('data-target')+".chapter").addClass('selected');
    this.widget.find('>nav>a').on('click',$.proxy(this.open,this));

    var widget_links = this.widget.find('a[data-tab-id]'),
        index = widget_links.length;
    
    while(index--){
      var subpage = widget_links[index].getAttribute('data-target'),
          subpage_id = widget_links[index].getAttribute('data-tab-id');
      if(this.id === subpage_id){
        $(widget_links[index]).on(this.itype,$.proxy(this.openLink,this));
      }
    }

    this.current_tab = localStorage[this.id] || null
    if(this.current_tab!==null){
      this.widget.find('>nav>a[data-target='+this.current_tab+']').trigger('click');
    }
  }

  tabController.prototype.openLink = function(event){
    event.preventDefault();
    var link = $(event.currentTarget),
        target = link.attr('data-tab'),
        id = link.attr('data-tab-id');

    this.widget.find('.subpage-menu[data-tab-id='+id+'] a[data-target='+target+']').trigger('click');
  };

  tabController.prototype.open = function(event){
    event.preventDefault();
    this.selected.removeClass('selected');
    this.selected = $(event.currentTarget);
    this.chapters.removeClass('selected');
    this.selected.addClass('selected');
    this.widget.find('.'+this.selected.attr('data-target')+".chapter").addClass('selected');
    localStorage[this.id] = this.selected.attr('data-target');
  };


  return tabController;
});