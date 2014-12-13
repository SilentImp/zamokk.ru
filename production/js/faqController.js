define(['jquery', 'starsController'], function($, starsController){

  function faqController(){
    this.itype = 'click'; 
    if($('html').hasClass('touch')){
      this.itype = 'touchstart';
    }
    this.widget = $('.faq-widget');
    if(this.widget.length==0){
      return;
    }

    this.comment_form = this.widget.find('.comment-form');
    this.comment_form.on("submit",$.proxy(this.sendComment,this));

    this.widget.find('form .stars').each(function(index, element){
      new starsController(element);
    });
    
  }

  faqController.prototype.sendComment = function(event) {
    event.preventDefault();
    var articles = this.widget.find('article'),
        len = articles.length,
        cloned = $(articles[Math.round(Math.random()*len)]).clone(true);

    this.comment_form.before(cloned);

    cloned = this.comment_form.prev();
    cloned.addClass('on-moderation');
    cloned.find('.name').text(this.comment_form.find('[name="name"]').val()+' (на модерации)');
    cloned.find('>p').text(this.comment_form.find('[name="message"]').val());
    cloned.find('.stars').attr('data-value',this.comment_form.find('.stars').attr('data-value'));
    cloned.find('.stars .value').width(this.comment_form.find('.stars').attr('data-value')+'%');

    this.comment_form.fadeOut(function(){
      $(this).remove();
    })
  };

  return faqController;
});