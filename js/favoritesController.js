define(['jquery'], function(){

  function favoritesController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    
    $('body').on(this.itype, '.controls .favorite', $.proxy(this.toggleFavorite,this));
  }

  favoritesController.prototype.toggleFavorite = function(event){
    event.preventDefault();
    var button = $(event.currentTarget);
    button.toggleClass('loveit');
  };


  return favoritesController;
});