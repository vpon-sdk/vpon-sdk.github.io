$(document).ready(function() {
  // remove 300ms delay
  FastClick.attach(document.body);

  // Click hamburger icon to toggle hidden list for mobile users
  $('.open-button').on('click', function(event) {
    $('.hambg-list').toggleClass('come-on');
    $('.hambg-list').toggleClass('go-off');
  })

  $('.open-button').on('click', function(event) {
    $('body').toggleClass('scroll-locked');
  })

  $('.open-button').on('click', function(event) {
    $(this).toggleClass('be-fixed');
  })

  document.getElementById("open-button").addEventListener('click', function(e) {
    document.getElementById('burgericon').classList.toggle('open');
  });
});

