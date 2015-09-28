$(document).ready(function(){

console.log("hello");

for (var i = 0; i <= $('.price').length; i++) {
var commaPrice = Number($('.price').eq(i).html()).toLocaleString()
$('.price').eq(i).html('$' + commaPrice);
}

})



