import {I,O,Z,W,L} from './Shape.js';
import {TetrisMatrix} from './TetrisMatrix.js';
export class Tetris{
    constructor(){
        this.tetrizMatrix = new TetrisMatrix();
        this.score = 0;
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
        console.log(this.velocity);
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
        }
    }
    dropFastShape(){
        while(this.tetrizMatrix.validationPosition(this.shape,this.shape.fall())){
            this.moveShape(this.shape,this.shape.fall());
        }
    }
    roundShape(){
        if (this.tetrizMatrix.validationPosition(this.shape, this.shape.round())){
            this.moveShape(this.shape,this.shape.round());
        }
    }
    run(){
        this.tetrizMatrix.draw();
        if(this.tetrizMatrix.validationPosition(this.shape,this.shape.fall())){
            this.moveShape(this.shape,this.shape.fall());
        }else{
            this.score += this.tetrizMatrix.destroyFullRows()*100;
            document.getElementById("score").innerHTML = this.score;
            this.setVelocity();
            if(!this.tetrizMatrix.getIsGameOver()){
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