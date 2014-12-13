define(['jquery'], function(){

  function fullViewController(){
    this.itype = 'click';
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.full-view-widget');
    if(this.widget.length==0){
      return;
    }

    $('body').on(this.itype, '.image-container .full-size', $.proxy(this.openPopup, this));
    this.close = this.widget.find('.close');
    this.close.on(this.itype, $.proxy(this.closePopup, this));


    this.image_container = this.widget.find('.image-container');
    this.image_container_wrapper = this.image_container.find('.wrapper');
    this.previews = this.widget.find('.previews');


    this.previews.on(this.itype, 'a', $.proxy(this.showLarge, this));
  }

  fullViewController.prototype.closePopup = function(event){
    event.preventDefault();
    this.widget.fadeOut();
  };

  fullViewController.prototype.openPopup = function(event){
    event.preventDefault();
    var button = $(event.currentTarget),
        previews = button.closest('.image-container').parent().find('.previews'),
        elements_after = previews.find('.selected').nextAll('a').length;

    this.previews.find('a:eq(-'+(elements_after+1)+')').trigger(this.itype);
    this.widget.fadeIn();
  };

  fullViewController.prototype.showLarge = function(event){
    event.preventDefault();
    
    var link = $(event.currentTarget),
        is_video = link.hasClass('video'),
        is_selected = link.hasClass('selected'),
        url = link.attr('href');

    this.previews.find('.selected').removeClass('selected');
    link.addClass('selected');

    // video
    if(is_video){
      this.image_container_wrapper.find('img, iframe').remove();
      this.image_container_wrapper.append('<iframe width="100%" height="100%" src="'+url+'" frameborder="0" allowfullscreen></iframe>');
      return;
    }

    // image

    this.image_container_wrapper.find('img, iframe').remove();
    this.image_container.addClass('loading');
    requirejs([
      'image!'+url
    ],$.proxy(function(img){
      this.image_container.removeClass('loading');
      this.image_container_wrapper.append(img.cloneNode(true));
    },this));
  };

  return fullViewController;
});