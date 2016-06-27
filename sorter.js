var fileFilter = function(projects, wrapper) {
  this.projects = projects;
  this.wrapper = wrapper;
  this.select = this.wrapper.find('select');

  this.select.dropkick({
    mobile: true
  });
}


fileFilter.prototype.filter = function(text, className) {
  this.select.val(text);
  this.wrapper.find('.dk-selected').text(text);

  $.each(this.wrapper.find('.dk-option'), function() {
    if ($(this).text() === text)
      $(this).addClass('dk-option-highlight, dk-option-selected');
    else
      $(this).removeClass('dk-option-highlight, dk-option-selected');
  });

  if (className === "all") {
    this.projects.hide().fadeIn();
  } else {
    this.projects.each(function() {
      if ($(this).hasClass(className))
        $(this).hide().fadeIn();
      else
        $(this).hide();
    });
  }
}


$(document).ready(function(){
  if($('body.resources').length) {

    var f = new fileFilter($('.project'), $('.mobile-select'));
    var hash = window.location.href.split('#')[1]

    if(hash != undefined){
      f.filter($("." + hash).html(), hash);
    }

    $('.sorts a').on("click", function(e){
      f.filter($(this).html(), $(this).attr("class"));
    });

    f.select.on("change", function(e){
      f.filter($(this).find('option:selected').text(), $(this).val());
    });
  }
});