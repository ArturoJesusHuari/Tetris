var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var parameterText = urlParams.get("parametro");
console.log("Parámetro recibido: " + parameterText);
document.getElementById("score").innerHTML ='SCORE: '+parameterText;
const gameOver = document.getElementById("gameOver");
gameOver.play();
function tryAgain(){
    var url = "./Tetris.html";
    window.open(url, "_self");
}