class Tetriz{
    constructor(){
        this.tetrizMatrix = new TetrizMatrix();
        this.score = 0;
        this.level = 1;
        this.gameOver = false;
        this.generateShape();
    }
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
        this.shape = shape;
    }
    moveShape(displacementX){
        if (this.tetrizMatrix.validationPosition(this.shape, 0, displacementX)) {
            this.shape.moveThroughX(displacementX);
            this.tetrizMatrix.changeMatrix(this.shape);
            this.tetrizMatrix.draw();
        }
    }
    roundShape(){
        this.shape.round();
        this.tetrizMatrix.changeMatrix(this.shape);
        this.tetrizMatrix.draw();
    }
    run(){
        this.tetrizMatrix.draw();
        if(this.tetrizMatrix.validationPosition(this.shape,1,0)){
            this.shape.fall();
            this.tetrizMatrix.changeMatrix(this.shape);
        }else{
            alert('algo choco '+this.shape.getCoordinates());
            this.tetrizMatrix.destruccion()
            this.generateShape();
        }
    }
}
class TetrizMatrix{
    constructor(){
        this.matrix=[];
        for (let row = 0; row < 24; row++) {
            this.matrix[row] = [];
            for (let column = 0; column < 10; column++) {
                this.matrix[row][column] = 0;
            }
        }
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.arrayFullOne = [1,1,1,1,1,1,1,1,1,1];
        this.arrayFullZeros = [0,0,0,0,0,0,0,0,0,0];
    }
    getMatrix(){return this.matrix;}
    validationPosition(shape,y,x){
        var coordinates = shape.getCoordinates();
        for(let index=0;index<4;index++){
            //limits of matrix
            if(coordinates[index][0]+y == this.matrix.length 
                || coordinates[index][1]+x == -1
                || coordinates[index][1]+x == this.matrix[0].length){
                    return false;
                }
            if(!coordinates.some(arr => JSON.stringify(arr) === JSON.stringify([coordinates[index][0]+y,coordinates[index][1]+x]))){
                if(this.matrix[coordinates[index][0]+y][coordinates[index][1]+x]==1){
                    return false;
                }
            }
        }
        return true;
    }
    destruccion(){
        for(let index=0;index<24;index++){
            if(JSON.stringify(this.matrix[index]) == JSON.stringify(this.arrayFullOne)){
                this.matrix.splice(index,1);
                this.matrix.unshift(this.arrayFullZeros);
                this.draw();
            }
        }
    }
    changeMatrix(shape){
        var coordinates = shape.getCoordinates();
        var coordinatesBefore = shape.getCoordinatesBefore();
        for(let index=0;index<4;index++){
            if(!coordinates.some(coordinate => JSON.stringify(coordinate) === JSON.stringify(coordinatesBefore[index]))){
                this.matrix[coordinatesBefore[index][0]][coordinatesBefore[index][1]]=0;
            }
            this.matrix[coordinates[index][0]][coordinates[index][1]]=1;
        }
    }
    drawLittleSquare(row,column){
        //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'grey'; 
        this.context.fillRect(row*30+1, column*30+1, 28, 28);
    }
    draw(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let row = 4; row < this.matrix.length; row++) {
            for (let column = 0; column < this.matrix[0].length; column++) {
                if(this.matrix[row][column] == 1){
                    this.drawLittleSquare(column, row-4)
                }
            }
        }
    }
}
class Shape {
    //Y,X
    constructor(coordinates1,coordinates2,coordinates3,coordinates4){
        this.coordinatesNow = []
        this.coordinatesNow[0] = coordinates1;
        this.coordinatesNow[1] = coordinates2;
        this.coordinatesNow[2] = coordinates3;
        this.coordinatesNow[3] = coordinates4;
        this.coordinatesBefore = [];
    }
    getCoordinates(){return this.coordinatesNow;}
    setCoodinatesBefore(){
        for (let index = 0; index < 4; index++) {
            this.coordinatesBefore[index]=[this.coordinatesNow[index][0],this.coordinatesNow[index][1]];
        }
    }
    getCoordinatesBefore() {return this.coordinatesBefore;}
    fall(){
        this.setCoodinatesBefore();
        for (let index = 0; index < 4; index++) {
            this.coordinatesNow[index][0]+=1;
        }
    }
    moveThroughX(displacementX){
        this.setCoodinatesBefore();
        for (let index = 0; index < 4; index++) {
            this.coordinatesNow[index][1]+=displacementX;
        }
    }
}
class I extends Shape{
    //Y,X
    constructor() {
        let firstCoordinateX = Math.round(Math.random()*9)
        super([0,firstCoordinateX],
            [1,firstCoordinateX],
            [2,firstCoordinateX],
            [3,firstCoordinateX]);
    }
    round(){
        this.setCoodinatesBefore();
        if(this.coordinatesNow[0][1]==this.coordinatesNow[3][1]){
            if(this.coordinatesNow[3][1]<=4){
                for(let index=0; index<3; index++){
                    this.coordinatesNow[index]=[this.coordinatesNow[3][0],this.coordinatesNow[3][1]+3-index];
                }
            }else{
                for(let index=0; index<3; index++){
                    this.coordinatesNow[index]=[this.coordinatesNow[3][0],this.coordinatesNow[3][1]-3+index];
                }
            }
        }else{
            if(this.coordinatesNow[3][1]<=4){
                for(let index=0; index<3; index++){
                    this.coordinatesNow[index]=[this.coordinatesNow[3][0]-3+index,this.coordinatesNow[3][1]];
                }
            }else{
                this.coordinatesNow[3]=this.coordinatesNow[0];
                for(let index=0; index<3; index++){
                    this.coordinatesNow[index]=[this.coordinatesNow[3][0]-3+index,this.coordinatesNow[3][1]];
                }
            }
        }
    }
}
class O extends Shape{
    //Y,X
    constructor() {
        let firstCoordinateX = Math.round(Math.random()*8)
        super([2,firstCoordinateX],
            [2,firstCoordinateX+1],
            [3,firstCoordinateX],
            [3,firstCoordinateX+1]);
    }
    round(){}
}
class Z extends Shape{
    //Y,X
    constructor() {
        let firstCoordinateX = Math.round(Math.random()*7+1)
        super([3,firstCoordinateX],
            [3,firstCoordinateX+1],
            [2,firstCoordinateX-1],
            [2,firstCoordinateX]);
    }
    round(){
        
    }
}
class W extends Shape{
    //Y,X
    constructor() {
        let firstCoordinateX = Math.round(Math.random()*7+1)
        super([3,firstCoordinateX],
            [2,firstCoordinateX],
            [3,firstCoordinateX+1],
            [3,firstCoordinateX-1]);
    }
    round(){
        if(this.coordinatesNow[0][1]>0 && this.coordinatesNow[0][1]<9){
            this.setCoodinatesBefore();
            this.coordinatesNow[2][0]=this.coordinatesNow[1][0];
            this.coordinatesNow[2][1]=this.coordinatesNow[1][1];
            this.coordinatesNow[1][0]=this.coordinatesNow[3][0];
            this.coordinatesNow[1][1]=this.coordinatesNow[3][1];
            this.coordinatesNow[3][0]=this.coordinatesNow[0][0]+(this.coordinatesNow[0][0]-this.coordinatesNow[2][0])
            this.coordinatesNow[3][1]=this.coordinatesNow[0][1]+(this.coordinatesNow[0][1]-this.coordinatesNow[2][1])
        }
    }
}
class L extends Shape{
    //Y,X
    constructor() {
        let firstCoordinateX = Math.round(Math.random()*8+1)
        super([1,firstCoordinateX],
            [1,firstCoordinateX-1],
            [2,firstCoordinateX],
            [3,firstCoordinateX]);
    }
    round(){
        
    }
}
var t = new Tetriz();
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        t.moveShape(-1);
    } else if (event.key === 'ArrowRight') {
        t.moveShape(1);
    }
    else if (event.key === 'ArrowUp') {
        t.roundShape(1);
    }
});
setInterval("t.run()", 100);