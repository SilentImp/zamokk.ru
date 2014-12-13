define([
  'jquery',
  "jquery.maskedinput/jquery.maskedinput.min"
  ], function(dummy1, dummy2){

  function orderController(){
    this.html = $('html');
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.page>.order-step-1');
    if(this.widget.length==0){
      return;
    }
    this.form = $('.page>.order-step-2');
    if(this.form.length==0){
      return;
    }

    this.scrolling = false;
    this.max_scroll_time = 1500;
    this.scroll_time_step = 250;
    this.scroll_px_step = 1000;

    this.indicator = $('.fast-access .card');

    this.widget.on('submit', $.proxy(this.showForm2,this));
    this.widget.find('.summary input').on('change', $.proxy(this.totalRecount,this));

    this.form.find('.sets-controller input').on('change', $.proxy(this.changeSet,this));
    this.fieldset = this.form.find('.input-sets');

    this.total = this.widget.find('.price-total .price strong');

    this.widget.find('.inc-dec-widget input').on('change', $.proxy(this.recount,this));
    this.widget.on(this.itype, '.remove', $.proxy(this.removeItem, this));
    this.widget.on('change', '.price', $.proxy(this.totalRecount,this));

    $(".tel").mask("+7 999 999 99 99");
    
    this.totalRecount();
  }

  orderController.prototype.scrollToSpecial = function(element){
    this.scrolling = true;
    this.html.addClass('scrolling');
    this.startTime = parseInt(new Date().getTime().toString().substr(-5), 10);
    this.startPos = window.pageYOffset;

    this.endPos = element.offset().top-50;
    this.vector = 1;
    if (this.endPos < this.startPos) {
      this.vector = -1;
    }
    this.toScroll = Math.abs(this.endPos - this.startPos);
    this.duration = Math.round(this.toScroll * this.scroll_time_step / this.scroll_px_step);

    if (this.duration > this.max_scroll_time) {
      this.duration = this.max_scroll_time;
    }
    this.scrollPerMS = this.toScroll / this.duration;
    this.endTime = this.startTime + this.duration;

    return this.animationLoop();
  };

  orderController.prototype.animationLoop = function() {
    if (!this.renderScroll()) {
      this.scrolling = false;
      this.html.removeClass('scrolling');
      return;
    }
    return requestAnimationFrame($.proxy(this.animationLoop,this));
  };

  orderController.prototype.renderScroll = function() {
    var currentTime, time;
    time = parseInt(new Date().getTime().toString().substr(-5), 10);
    if (time > this.endTime) {
      time = this.endTime;
    }
    currentTime = time - this.startTime;
    window.scroll(0, Math.round((this.vector * this.scrollPerMS * currentTime) + this.startPos));
    if (this.endTime <= time) {
      return false;
    }
    if (window.pageYOffset === this.endPos) {
      return false;
    }
    return true;
  };

  orderController.prototype.showForm2 = function(event){
    event.preventDefault();
    this.form.fadeIn();
    this.scrollToSpecial(this.form);
  };

  orderController.prototype.changeSet = function(event){
    var checked = this.form.find('.sets-controller input:checked'),
        target = checked.attr('data-target'),
        set = this.fieldset.find('fieldset.'+target);
        this.fieldset.find('fieldset.selected').removeClass('selected');
        set.addClass('selected');
  };

  orderController.prototype.totalRecount = function(event){
    var items = this.widget.find('.item'),
        summ = 0,
        item = null,
        price = null,
        count = null,
        num = 0,
        total = 0;


    if(items.length==0){
      this.form.hide();
      this.widget.hide();
      $('.card-is-empty').removeClass('hidden');
    }

    for(var i=0; i<items.length; i++){
      item = $(items[i]);
      price = item.find('.price');
      count = item.find('.inc-dec-widget input');
      num = parseInt(price.attr('data-price'),10)*count.val();
      price.text((num+"").split(/(?=(?:\d{3})+$)/).join(" ").trim());
      if(item.hasClass('main-item')){
        total+=parseInt(count.val(),10);
      }
      summ+=num;
    }

    var counter = this.indicator.find('.count');
    if(total<1){
      counter.remove();
    }else{
      if(counter.length==0){
        this.indicator.prepend('<span class="count">1</span>');
        counter = this.indicator.find('.count');
      }
      counter.text(total);
    }


    var services = $('.summary input:checked'),
        services_index = services.length,
        price = 0;

    while(services_index--){
      price = parseInt(services[services_index].getAttribute('data-price'),10);
      if(isNaN(price)){
        continue;
      }
      summ+=price;
    }


    this.total.text((summ+"").split(/(?=(?:\d{3})+$)/).join(" ").trim())
  };

  orderController.prototype.removeItem = function(event){
    event.preventDefault();
    var button = $(event.currentTarget),
        item = button.closest('.item');

    if(item.hasClass('main-item')){
      item = item.closest('article');
    }

    item.fadeOut($.proxy(function(){
      item.remove();
      window.setTimeout($.proxy(this.totalRecount,this),10);
    },this));

  };

  orderController.prototype.recount = function(event){
    event.preventDefault();
    var input = $(event.currentTarget),
        line = input.closest('.item'),
        price = line.find('.price'),
        num = parseInt(input.val(),10),
        numeral = num*parseInt(price.attr('data-price'),10),
        length = (numeral).toString().length;


    price.text((numeral).toString().split("").reverse().join("").replace(/([\d][\d][\d])/g,"$1 ").split("").reverse().join("").trim());
    price.trigger('change');
  };

  return orderController;
});