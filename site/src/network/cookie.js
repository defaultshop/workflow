export function setCookie (cname, value, expire) {
  var date = new Date();
  date.setSeconds(date.getSeconds() + expire);
  document.cookie = cname + '=' + escape(value) + '; expires=' + date.toGMTString();
  //console.log(document.cookie)
}

export function getCookie(cname) {
  // alert(cname)
  if (document.cookie.length > 0) {
    let cstart = document.cookie.indexOf(cname + '=');
    console.log(document.cookie);
    if (cstart !== -1) {
      cstart = cstart + cname.length + 1;
      let cend = document.cookie.indexOf(';', cstart);
      if (cend === -1) cend = document.cookie.length;
      return unescape(document.cookie.substring(cstart, cend));
    }
  }
  // return ""
}

export function delCookie(cname) {
  setCookie(cname, '', -1);
}
