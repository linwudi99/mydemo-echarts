// 获取当前时间
function getCurrentTime() {
  let date = new Date();
  let y = date.getFullYear();
  let M = date.getMonth() + 1; 
  let d = date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  M = checkTime(M);
  d = checkTime(d);
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  // var week = "星期" + "日一二三四五六".charAt(date.getDay());
  
  let curTime = y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
  document.querySelector(".time").innerHTML = curTime
  
  setTimeout(getCurrentTime,1000)
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
getCurrentTime()