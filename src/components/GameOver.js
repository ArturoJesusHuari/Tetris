var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var parameterText = urlParams.get("parametro");
console.log("Parámetro recibido: " + parameterText);
document.getElementById("score").innerHTML ='SCORE: '+parameterText;
function tryAgain(){
    var url = "./Tetriz.html";
    window.open(url, "_self");
}