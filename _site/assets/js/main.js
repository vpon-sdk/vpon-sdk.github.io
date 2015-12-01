$(document).ready(function() {


  $('.close-btn').click(function() {
    // $('.hambg-list').removeClass('come-on').addClass("go-off");
  });

  $('.open-button').click(function() {
    // $('.hambg-list').removeClass('go-off').addClass('come-on');
  });

  // Click hamburger icon to toggle hidden list for mobile users
  $('.open-button').on('click', function(event) {
    $('.hambg-list').toggleClass('come-on');
    $('.hambg-list').toggleClass('go-off');
  })

  document.getElementById("open-button").addEventListener('click', function(e) {
    console.log('hihi');
    document.getElementById('burgericon').classList.toggle('open');
  });

  console.log('fdsifhsidufhlisuh');

  //
  // -ms-transform: rotate(9deg); /* IE 9 */
  //     -webkit-transform: rotate(9deg); /* Chrome, Safari, Opera */
  //     transform: rotate(9deg);

});
