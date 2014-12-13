define(['jquery'], function(){

  function managerController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.manager-hint-widget');
    if(this.widget.length==0){
      return;
    }

    var viewport_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        wrapper = this.widget.find('.wrapper');

    wrapper.mCustomScrollbar({
      set_height: viewport_height-wrapper.offset().top-58,
      horizontalScroll:false,
      scrollInertia:0,
      scrollButtons:{
        enable: false
      },
      advanced:{
          updateOnContentResize: true
      }
    });
  }

  return managerController;
});