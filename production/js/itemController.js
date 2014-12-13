define(['jquery', 'starsController'], function($, starsController){

  function itemController(){
    this.itype = 'click';
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.item-widget');
    if(this.widget.length==0){
      return;
    }

    new starsController(this.widget.find('.stars'));
    this.image_container = this.widget.find('.image-container');
    this.image_container_wrapper = this.image_container.find('.wrapper');
    this.full_size_button = this.image_container.find('.full-size');
    this.previews = this.widget.find('.previews');
    this.previews.on(this.itype, 'a', $.proxy(this.showLarge, this))
  }

  itemController.prototype.showLarge = function(event){
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
      this.image_container_wrapper.append('<iframe width="100%" height="400" src="'+url+'" frameborder="0" allowfullscreen></iframe>');
      this.full_size_button.attr('href',url);
      return;
    }

    // image

    this.image_container_wrapper.find('img, iframe').remove();
    this.image_container.addClass('loading');
    requirejs([
      'image!'+url
    ],$.proxy(function(img){
      this.full_size_button.attr('href',img.getAttribute('src'));
      this.image_container.removeClass('loading');
      this.image_container_wrapper.append(img.cloneNode(true));
    },this));
  };

  return itemController;
});