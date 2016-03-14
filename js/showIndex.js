$(document).ready(function() {

 /* $('a.blog-button').click(function() {
    if ($('#left').hasClass('left-col')) return;
    //currentWidth = $('.panel-cover').width();
$('#left').removeClass('panel-cover');
$('#left').addClass('left-col');
$('#overlay').removeClass('panel-cover--overlay');
$('#overlay').addClass('overlay');
    //$('.panel-cover').addClass('animated panel-cover--collapsed slideInLeft');
    //$('.content-wrapper').addClass('animated slideInLeft');
  });
*/

alert(window.location.pathname);
  if (window.location.hash && window.location.hash == "#blog") {
    //$('.panel-cover').addClass('panel-cover--collapsed');
$('#left').removeClass('panel-cover');
$('#left').addClass('left-col');  
$('#overlay').removeClass('panel-cover--overlay');
$('#overlay').addClass('overlay');
}

  if (window.location.pathname == "/") {       // if hexo in subdir of site, should change this line
    //$('.panel-cover').addClass('panel-cover--collapsed');
$('#left').removeClass('left-col');
$('#left').addClass('panel-cover');  
$('#overlay').removeClass('overlay');
$('#overlay').addClass('panel-cover--overlay');
}else
{
	$('#left').removeClass('panel-cover');
$('#left').addClass('left-col');  
$('#overlay').removeClass('panel-cover--overlay');
$('#overlay').addClass('overlay');
}

  $('.btn-mobile-menu').click(function() {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown');
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn');
  });

  $('.navigation-wrapper .blog-button').click(function() {
    // $('.navigation-wrapper').toggleClass('visible');
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn');
  });

});
