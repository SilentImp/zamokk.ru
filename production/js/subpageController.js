define(['jquery'], function(){

  function subpageController(widget){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $(widget);
    if(this.widget.length==0){
      return;
    }
    this.id = this.widget.attr('data-subpage-id');
    this.selected = this.widget.find('.subpage-menu[data-subpage-id='+this.id+'] a.selected');
    if(this.selected.length==0){
      this.selected = this.widget.find('.subpage-menu[data-subpage-id='+this.id+'] a:eq(0)');
      this.selected.addClass('selected');
    }
    this.chapters = this.widget.find('.subpage[data-chapter]');
    this.chapters.removeClass('selected');
    this.widget.find('.subpage[data-chapter='+this.selected.attr('data-target')+"]").addClass('selected');
    
    this.widget.find('.subpage-menu[data-subpage-id='+this.id+'] a').on(this.itype,$.proxy(this.open,this));

    var widget_links = this.widget.find('a[data-subpage-id]'),
        index = widget_links.length;

    while(index--){
      var subpage = widget_links[index].getAttribute('data-target'),
          subpage_id = widget_links[index].getAttribute('data-subpage-id');
      if(this.id === subpage_id){
        $(widget_links[index]).on(this.itype,$.proxy(this.openLink,this));
      }
    }

    this.current_tab = localStorage[this.id] || null
    if(this.current_tab!==null){
      this.widget.find('.subpage-menu[data-subpage-id='+this.id+'] a[data-target='+this.current_tab+']').trigger('click');
    }
  }

  subpageController.prototype.openLink = function(event){
    event.preventDefault();
    var link = $(event.currentTarget),
        target = link.attr('data-target'),
        id = link.attr('data-subpage-id');

    this.widget.find('.subpage-menu[data-subpage-id='+id+'] a[data-target='+target+']').trigger('click');
  };

  subpageController.prototype.open = function(event){
    event.preventDefault();
    this.selected.removeClass('selected');
    this.selected = $(event.currentTarget);
    this.chapters.removeClass('selected');
    this.selected.addClass('selected');
    this.widget.find('[data-chapter='+this.selected.attr('data-target')+"]").addClass('selected');
    localStorage[this.id] = this.selected.attr('data-target');
  };


  return subpageController;
});