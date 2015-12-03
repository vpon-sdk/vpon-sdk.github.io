$(document).ready(function() {

  // Click hamburger icon to toggle hidden list for mobile users
  $('.open-button').on('click', function(event) {
    $('.hambg-list').toggleClass('come-on');
    $('.hambg-list').toggleClass('go-off');
  })

  document.getElementById("open-button").addEventListener('click', function(e) {
    document.getElementById('burgericon').classList.toggle('open');
  });

  //
  // -ms-transform: rotate(9deg); /* IE 9 */
  //     -webkit-transform: rotate(9deg); /* Chrome, Safari, Opera */
  //     transform: rotate(9deg);

});
