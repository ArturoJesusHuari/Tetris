import { Tetris } from './Tetris.js';
var t = new Tetris();
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft'){
        t.moveShapeInX(-1);
    }else if (event.key === 'ArrowRight') {
        t.moveShapeInX(1);
    }else if (event.key === 'ArrowUp') {
        t.roundShape(1);
    }else if (event.key === 'ArrowDown') {
        t.dropFastShape();
    }
});
function timeout() {
    setTimeout(function (){
        t.run();
        timeout();
    }, t.getVelocity());
};
timeout();