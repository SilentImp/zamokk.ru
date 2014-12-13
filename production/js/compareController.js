define(['jquery'], function(){

  function compareController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.compare-widget');
    if(this.widget.length==0){
      return;
    }

    this.widget.find('.close').on(this.itype, $.proxy(this.closePopup,this));
    this.button = $('.screen-controls .rate');
    this.button.on(this.itype, $.proxy(this.openPopup,this));

    $('body').on(this.itype, '.controls .compare', $.proxy(this.addItem,this));
    this.widget.on(this.itype, '.remove', $.proxy(this.removeItem,this));
  }

  compareController.prototype.addItem = function(event){
    event.preventDefault();
    var button = $(event.currentTarget),
        count = parseInt(this.button.attr('data-count'),10);
    if(isNaN(count)){
      this.button.attr('data-count',1);
    }else{
      if(button.hasClass('comparing')){
        count--;
        this.button.attr('data-count',count);
        $('body .page').removeClass('compare-blocked');
        button.removeClass('comparing',true);
        return;
      }
      if(count==3){
        return;
      }
      count++;
      this.button.attr('data-count',count);
    }
    if(count==3){
      $('body .page').addClass('compare-blocked');
    }
    button.toggleClass('comparing',true);
  };

  compareController.prototype.removeItem = function(event){
    event.preventDefault();
    var link = $(event.currentTarget),
        item = link.closest('article'),
        items = item.closest('.items'),
        articles = items.find('article').length,
        index = articles-item.nextAll('article').length,
        details = items.find('.details'),
        count = parseInt(this.button.attr('data-count'),10);

    if(isNaN(count)){
      this.button.attr('data-count',0);
    }else{
      if(count==0){
        return;
      }
      count--;
      this.button.attr('data-count',count);
    }
    $('body .page').removeClass('compare-blocked');

    item.fadeOut(function(){$(this).remove();});
    if(index==3){
      details.find('tr>td:nth-child(4n+'+(index+1)+')').html('');
    }else{
      details.find('tr').each(function(number, element){
        var tr = $(element),
            td = tr.find('td:eq('+index+')');
        td.html('');
        tr.append(td);
      });
    }

  };

  compareController.prototype.closePopup = function(event){
    event.preventDefault();
    this.widget.fadeOut();
  };

  compareController.prototype.openPopup = function(event){
    event.preventDefault();
    this.widget.fadeIn();
  };



  return compareController;
});