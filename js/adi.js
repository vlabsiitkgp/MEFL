var day = new Date();
var s=0;
var m=0;
function st() {
var day = new Date();
var se=day.getSeconds();
var da= ct(day.getDate()) +"/"+ct(day.getMonth()) +"/"+day.getFullYear() +" "+ct(day.getHours()) + " : " + ct(day.getMinutes()) + " : " + ct(se);
document.getElementById('qqd').innerHTML =da;
if(s==59){
  m++;
  s=0;
}
else{
s++;
}
 document.getElementById('qqt').innerHTML = "Time: "+ct(m)+ " : "+ ct(s) + " sec";

var t = setTimeout(st, 1000);
};
function ct(i) {
if (i < 10) {i = "0" + i};
return i;
};
