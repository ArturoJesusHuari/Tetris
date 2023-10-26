import { Tetris } from './Tetris.js';
var tetris = new Tetris();
function dropFastShape(){tetris.dropFastShape();}
function roundShape(){tetris.roundShape(1);}
function moveShapeRight(){tetris.moveShapeInX(1);}
function moveShapeLeft(){tetris.moveShapeInX(-1);}
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft'){
        moveShapeLeft();
    }else if (event.key === 'ArrowRight') {
        moveShapeRight();
    }else if (event.key === 'ArrowUp') {
        roundShape();
    }else if (event.key === 'ArrowDown') {
        dropFastShape();
    }
});
function timeout() {
    resize();
    setTimeout(function (){
        tetris.run();
        timeout();
    }, tetris.getVelocity());
};
function resize(){
    /*const pageHeight = document.documentElement.scrollHeight;
    document.getElementById("canvas").style.width = pageHeight*45/100 + 'px';
    document.getElementById("canvas").style.height = pageHeight*9/10 + 'px';*/
}
timeout();
const drop = document.getElementById("dropShape");
const right = document.getElementById("rightShape");
const left = document.getElementById("leftShape");
const round = document.getElementById("roundShape");
round.addEventListener("click", roundShape);
left.addEventListener("click", moveShapeLeft);
right.addEventListener("click", moveShapeRight);
drop.addEventListener("click", dropFastShape);