define(['jquery','requestAnimationFramePolyfill'], function($){

  function priceController(widget){
    this.itype = 'click'; 
    this.pdtype = 'mousedown';
    this.pmtype = 'mousemove';
    this.putype = 'mouseup';
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
      this.pdtype = 'touchstart';
      this.pmtype = 'touchmove';
      this.putype = 'touchend';
    }

    this.draging_state = false;
    this.pointer = null;
    this.handle = null;

    this.widget = $(widget);
    if(this.widget.length==0){
      return;
    }
    this.minHandle = this.widget.find('.bar .min');
    this.maxHandle = this.widget.find('.bar .max');
    this.valueBar = this.widget.find('.bar .value');
    this.value_bar_width = this.widget.find('.bar').width();
    this.widget_left = this.widget.offset().left;

    this.inputs = this.widget.find('.price-input');
    this.inputs_min = this.inputs.find("input[name='min']");
    this.inputs_max = this.inputs.find("input[name='max']");
    this.inputs_min.on('change keyup', $.proxy(this.syncInput,this));
    this.inputs_max.on('change keyup', $.proxy(this.syncInput,this));

    this.inputs_min.on('change', $.proxy(this.startTimeout,this));
    this.inputs_max.on('change', $.proxy(this.startTimeout,this));
    this.inputs_min.on('focus', $.proxy(this.clearTimeout,this));
    this.inputs_max.on('focus', $.proxy(this.clearTimeout,this));


    this.min = this.getMin();
    this.max = this.getMax();
    this.current_min = this.getCurrentMinValue();
    this.current_max = this.getCurrentMaxValue();
    this.current_min_percent = this.getCurrentMin();
    this.current_max_percent = this.getCurrentMax();

    this.minHandle.on(this.pdtype, $.proxy(this.dragStart,this));
    this.maxHandle.on(this.pdtype, $.proxy(this.dragStart,this));
    $(window).on('resize',$.proxy(this.recount,this));
    this.recount();
  }

  priceController.prototype.syncInput = function(event){
    var min = Math.max(parseFloat(this.inputs_min.val(),10)-this.getMin(),0),
        max = Math.min(parseFloat(this.inputs_max.val(),10)-this.getMin(),this.getMax()),
        diff = this.getMax()-this.getMin(),
        min_percent = min*100/diff,
        max_percent = max*100/diff;
    this.minHandle.css({
      left: min_percent+"%",
    });
    this.maxHandle.css({
      left: max_percent+"%",
    });
    this.renderValueBar();
  };

  priceController.prototype.recount = function(event){
    if(this.widget.find('.bar').width()==0){
      window.setTimeout($.proxy(this.recount,this), 500);
    }
    this.value_bar_width = this.widget.find('.bar').width();
    this.widget_left = this.widget.offset().left;

    this.minHandle.css({
      left: this.current_min_percent+"%"
    });

    this.maxHandle.css({
      left: this.current_max_percent+"%"
    });
    
    this.renderValueBar();
    
  };

  priceController.prototype.dragStart = function(event){
    this.handle = $(event.currentTarget);
    this.pointer = event.clientX;
    this.draging_state = true;
    $(document).on(this.putype, $.proxy(this.dragEnd,this));
    $(document).on(this.pmtype, $.proxy(this.draging,this));
    this.animationLoop();
    this.clearTimeout();
  };

  priceController.prototype.dragEnd = function(event){
    this.handle = null;
    this.draging_state = false;
    $(document).off(this.putype, $.proxy(this.dragEnd,this));
    $(document).off(this.pmtype, $.proxy(this.draging,this));
    this.startTimeout();
  };

  priceController.prototype.clearTimeout = function(event){
    window.clearTimeout(this.timer);
  };  
  
  priceController.prototype.startTimeout = function(event){
    this.clearTimeout();
    this.timer = window.setTimeout($.proxy(this.showResult,this), 2000);
  };

  priceController.prototype.showResult = function(event){

    // Удаляем старые результаты
    old = $('.search-results');
    old.removeClass('show');
    window.setTimeout(function(){
      old.remove();
    }, 600);

    // Добавляем новые
    var count = parseInt(this.widget.attr('data-search'),10),
        wrapper = this.widget.closest('nav'),
        title = wrapper.find('.title');

    if(title.length>0){
      wrapper = title;
    }

    if(count>0){
      var goods = count*Math.floor((Math.random()*10));
      wrapper.prepend('<span class="search-results">'+this.plural(count, 'Найден', 'Найдены', 'Найдено')+' '+count+' '+this.plural(count,'модель','модели','моделей')+' ('+goods+' '+this.plural(goods,'товар','товара','товаров')+'). <a href="#">Показать?</a></span>');
    }else{
      wrapper.prepend('<span class="search-results">Товаров не найдено</span>');
    }

    // Добавляем блоку результата события для его закрытия
    var found = wrapper.find('.search-results:eq(0)');
    window.setTimeout(function(){
      found.addClass('show');
    },0);
    
    
  };

  priceController.prototype.plural = function(number, one, two, five) {
    number = Math.abs(number);
    number %= 100;
    if (number >= 5 && number <= 20) {
        return five;
    }
    number %= 10;
    if (number == 1) {
        return one;
    }
    if (number >= 2 && number <= 4) {
        return two;
    }
    return five;
  }; 

  priceController.prototype.draging = function(event){
    if(typeof(event.clientX) == "undefined"){
      this.pointer = event.originalEvent.pageX;
    }else{
      this.pointer = event.clientX;
    }
  }

  priceController.prototype.animationLoop = function() {
    if (!this.draging_state) {
      return;
    }
    this.renderHanle();
    return requestAnimationFrame($.proxy(this.animationLoop,this));
  };

  priceController.prototype.renderHanle = function() {
    var left = this.pointer-this.widget_left;
    if(left<0){
      left = 0;
    }else if(left>this.value_bar_width){
      left = this.value_bar_width;
    }
    this.handle.css('left',left);
    this.renderValueBar();
    this.inputs_min.val(this.getCurrentMinValue());
    this.inputs_max.val(this.getCurrentMaxValue());
  };

  priceController.prototype.renderValueBar = function() {
    var min = this.getCurrentMin(),
        max = this.getCurrentMax();
    if(min>max){
      min = max+min;
      max = min-max;
      min = min-max;
    }
    this.valueBar.css({
      left: min+'%',
      width: (max-min)+'%'
    });

    // console.log('from',this.getCurrentMinValue(),'to',this.getCurrentMaxValue());
  };

  priceController.prototype.getMin = function(event){
    return parseInt(this.widget.find('.values .min').text(),10);
  };

  priceController.prototype.getMax = function(event){
    return parseInt(this.widget.find('.values .max').text(),10);
  };

  priceController.prototype.getCurrentMin = function(event){
    var left_min = parseInt(this.minHandle.css('left'),10),
        left_max = parseInt(this.maxHandle.css('left'),10),
        value = Math.min(left_min,left_max);
        this.current_min_percent = Math.floor(value*100/this.value_bar_width);
        return this.current_min_percent;
  };

  priceController.prototype.getCurrentMinValue = function(event){
    var percent = this.getCurrentMin();
    return Math.floor(percent*(this.max-this.min)/100)+this.min;
  };

  priceController.prototype.getCurrentMax = function(event){
    var left_min = parseInt(this.minHandle.css('left'),10),
        left_max = parseInt(this.maxHandle.css('left'),10),
        value = Math.max(left_min,left_max);
        this.current_max_percent = Math.floor(value*100/this.value_bar_width);
        return this.current_max_percent;
  };

  priceController.prototype.getCurrentMaxValue = function(event){
    var percent = this.getCurrentMax();
    return Math.floor(percent*(this.max-this.min)/100)+this.min;
  };




  return priceController;
});