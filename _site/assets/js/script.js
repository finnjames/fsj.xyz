window.onload = function () {

  let address = document.getElementById("email-address");
  address.value = hex2a("6865794066736a2e78797a") // hex email address

  exit_select = function () {
    this.selectionStart = this.selectionEnd;
  }
  // address.addEventListener('select', exit_select, false);
  // address.addEventListener('focus', exit_select, false);
  address.addEventListener('focus', function () {
    this.select()
  }, false);
  let mail_btn = document.getElementById("email-copy");


  mail_btn.addEventListener("click", function () {
    address.select();
    address.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
  })
};

function a2hex(str) {
  var arr = [];
  for (var i = 0, l = str.length; i < l; i++) {
    var hex = Number(str.charCodeAt(i)).toString(16);
    arr.push(hex);
  }
  return arr.join('');
}

function hex2a(hexx) {
  var hex = hexx.toString(); //force conversion
  var str = '';
  for (var i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}