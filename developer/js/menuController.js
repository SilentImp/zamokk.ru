define(['jquery'], function(){

  function subMenuController(menu){
    this.menu = $(menu);
    this.menu.attr('data-degradation-level',0);

    this.short = ($(window).width()<1200);
    this.lastViewHeight = $(window).height();
    
    this.categories = this.menu.find('.category');
    this.brends = this.menu.find('.brend');
    this.fast = this.menu.find('.fast');
    this.add = this.menu.find('.add');
    
    this.categories_nav = this.categories.find('>nav');
    this.brends_nav = this.brends.find('>nav');
    this.fast_nav = this.fast.find('>nav');

    this.firsttime = true;

    this.degradating = false;
    if(this.short){
      this.degradateShort(0);
    }else{
      this.degradateWide(0);
    }
    $(window).on('resize',$.proxy(this.rebuild,this));
  }

  subMenuController.prototype.degradateWide = function(level){
    this.degradating = true;
    this.viewHeight = $(window).height();
    this.menuHeight = this.menu.outerHeight()+100;
        
    var current_level = parseInt(this.menu.attr('data-degradation-level'),10);
    switch(level){
      case 0:
        if((current_level==level)&&(this.firsttime==false)){
          break;
        }
        this.firsttime = false;
        this.menu.attr('data-degradation-level',level);
        this.addColumns(this.categories_nav, 1);
        this.addColumns(this.brends_nav, 2);
        break;
      case 1:
        if(current_level==level){
          break;
        }
        this.menu.attr('data-degradation-level',level);
        this.addColumns(this.categories_nav, 2);
        this.addColumns(this.brends_nav, 3);
        break;
      case 2:
        if(current_level==level){
          break;
        }
        this.menu.attr('data-degradation-level',level);
        this.addColumns(this.categories_nav, 3);
        this.addColumns(this.brends_nav, 4);
        break;
      case 3:
        if(current_level==level){
          break;
        }
        this.menu.attr('data-degradation-level',level);
        this.addColumns(this.categories_nav, 4);
        break;
      default:
        this.degradating = false;
        this.lastViewHeight = $(window).height();
        return;
    }

    if(this.viewHeight<this.menuHeight){
      level = level+1;
      this.degradateWide(level); 
    }

    this.lastViewHeight = $(window).height();
    this.degradating = false;
  };

  subMenuController.prototype.degradateShort = function(level){
    
    this.degradating = true;
    this.viewHeight = $(window).height();
    this.menuHeight = this.menu.outerHeight()+100;
        
    var current_level = parseInt(this.menu.attr('data-degradation-level'),10);
    
    switch(level){
      case 0:
        if((current_level==level)&&(this.firsttime==false)){
          break;
        }
        this.firsttime = false;
        this.menu.attr('data-degradation-level',level);
        this.addColumns(this.categories_nav, 1);
        this.addColumns(this.brends_nav, 2);
        break;
      case 1:
        if(current_level==level){
          break;
        }
        this.menu.attr('data-degradation-level',level);
        this.addColumns(this.categories_nav, 2);
        this.addColumns(this.brends_nav, 3);
        break;
      case 2:
        if(current_level==level){
          break;
        }
        this.menu.attr('data-degradation-level',level);
        this.addColumns(this.categories_nav, 3);
        this.addColumns(this.brends_nav, 3);
        break;
      case 3:
        if(current_level==level){
          break;
        }
        this.menu.attr('data-degradation-level',level);
        this.addColumns(this.categories_nav, 4);
        break;
      default:
        this.degradating = false;
        this.lastViewHeight = $(window).height();
        return;
    }

    if(this.viewHeight<this.menuHeight){
      level = level+1;
      this.degradateShort(level); 
    }

    this.lastViewHeight = $(window).height();
    this.degradating = false;
  }

  subMenuController.prototype.rebuild = function(){
    this.short = ($(window).width()<1200);
    if(this.degradating){
      return;
    }
    if(this.short){
      this.degradateShort(0);
    }else{
      this.degradateWide(0);
    }
  };

  subMenuController.prototype.addColumns = function(element, count){
    var links = element.find('a').clone(true),
        links_count = links.length,
        fragment = document.createDocumentFragment(),
        in_column = Math.ceil(links_count/count),
        current_index = 0,
        iteration = count,
        column = null;

    element.find('>*').remove();

    while(iteration--){
      column = document.createElement('DIV');
      column.className = 'column';
      column.style.width = Math.floor(100/count)+'%';

      for(i=current_index;i<current_index+in_column;i++){
        if(i==links_count){
          fragment.appendChild(column);
          element.append(fragment);
          return;
        }
        column.appendChild(links[i]);
      }
      current_index+= in_column;
      fragment.appendChild(column);
    }
    element.append(fragment);

  };

  function menuController(){
    var menus = $('.page>header:eq(0) nav.project .sub'),
        index = menus.length;
    while(index--){
      new subMenuController(menus[index]);
    }
  }

  return menuController;
});