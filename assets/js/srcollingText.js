function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

function SetCookie(name,value){
  var exp=new Date();
  exp.setTime(exp.getTime() + 10*60*1000);//有效期10分鐘
  document.cookie=name + "=" +escape(value) + ";expires=" + exp.toGMTString();
}

if(getCookie('refresh') != 10){
  $(".message").show();
}

$(".boxclose").click(function(){
  $(".message").fadeOut('slow');
  SetCookie('refresh','10');
});
