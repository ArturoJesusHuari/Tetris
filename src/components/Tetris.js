import {I,O,Z,W,L} from './Shape.js';
import {TetrisMatrix} from './TetrisMatrix.js';
const moveSound = document.getElementById("shapeMoveSound");
const destruction = document.getElementById("destruction");
const drop = document.getElementById("drop");
export class Tetris{
    constructor(){
        this.tetrizMatrix = new TetrisMatrix();
        this.score = 1000;
        this.velocity = 1000;
        this.shape = this.generateShape();
    }
    setVelocity(){
        if(this.score==0){
            this.velocity=1000;
        }else{
            this.velocity=-2/9*this.score+9200/9;
        }
    }
    getVelocity(){
        return this.velocity;}
    generateShape(){
        var shape;
        let numAleatorio = Math.round(Math.random()*4);
        if(numAleatorio==0){
            shape = new I();
        } 
        else if(numAleatorio==1){
            shape = new O();
        }
        else if(numAleatorio==2){
            shape = new Z();
        }
        else if(numAleatorio==3){
            shape = new W();
        }
        else if(numAleatorio==4){
            shape = new L();
        }
        return shape;
    }
    moveShape(shape, coordinates){
        shape.setNewCoordinates(coordinates);
        this.tetrizMatrix.changeMatrix(shape);
        this.tetrizMatrix.draw();
    }
    moveShapeInX(displacementX){
        if (this.tetrizMatrix.validationPosition(this.shape, this.shape.moveThroughX(displacementX))) {
            this.moveShape(this.shape,this.shape.moveThroughX(displacementX));
            moveSound.play()
        }
    }
    dropFastShape(){
        const fallDelay = 30;
        const fallStep = () => {
            if (this.shape.getFloor() >= 4 && this.tetrizMatrix.validationPosition(this.shape, this.shape.fall())) {
                this.moveShape(this.shape, this.shape.fall());
                setTimeout(fallStep, fallDelay);
                drop.play();
            }
        };
        fallStep();
    }
    roundShape(){
        if (this.tetrizMatrix.validationPosition(this.shape, this.shape.round())){
            this.moveShape(this.shape,this.shape.round());
            moveSound.play()
        }
    }
    run(){
        this.tetrizMatrix.draw();
        if(this.tetrizMatrix.validationPosition(this.shape,this.shape.fall())){
            this.moveShape(this.shape,this.shape.fall());
            moveSound.play()
        }else{
            if(this.tetrizMatrix.isFullRows()){
                this.score += this.tetrizMatrix.destroyFullRows()*100;
                document.getElementById("score").innerHTML = this.score;
                this.setVelocity();
                destruction.play()}
            if(!this.tetrizMatrix.getIsFirstRowFull()){
                this.shape = this.generateShape();
            }else{
                this.gameOver(JSON.stringify(this.score));
            }
        }
    }
    gameOver(parameterText){
        var url = "./GameOver.html?parametro=" + encodeURIComponent(parameterText);
        window.open(url, "_self");
    }
}