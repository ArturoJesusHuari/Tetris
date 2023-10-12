class Tetriz{
    constructor(){
        this.tetrizMatrix = new TetrizMatrix();
        this.score = 0;
        this.level = 1;
        this.gameOver = false;
        this.shape = this.generateShape();
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
        return shape;
    }
    moveShape(displacementX){
        if (this.tetrizMatrix.validationPosition(this.shape, this.shape.moveThroughX(displacementX))) {
            this.shape.setNewCoordinates(this.shape.moveThroughX(displacementX));
            this.tetrizMatrix.changeMatrix(this.shape);
            this.tetrizMatrix.draw();
        }
    }
    fallFastShape(){
        while(this.tetrizMatrix.validationPosition(this.shape,this.shape.fall())){
            this.shape.setNewCoordinates(this.shape.fall());
            this.tetrizMatrix.changeMatrix(this.shape);
            this.tetrizMatrix.draw();
        }
    }
    roundShape(){
        if (this.tetrizMatrix.validationPosition(this.shape, this.shape.round())){
            this.shape.setNewCoordinates(this.shape.round());
            this.tetrizMatrix.changeMatrix(this.shape);
            this.tetrizMatrix.draw();
        }
    }
    run(){
        this.tetrizMatrix.draw();
        if(this.tetrizMatrix.validationPosition(this.shape,this.shape.fall())){
            this.shape.setNewCoordinates(this.shape.fall());
            this.tetrizMatrix.changeMatrix(this.shape);
        }else{
            this.tetrizMatrix.destruccion();
            if(this.tetrizMatrix.validationPosition(this.generateShape(),this.generateShape().getCoordinates())){
                this.shape = this.generateShape();
            }else{
                alert('GAME OVER');
            }
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
    validationPosition(shape, newCoordinates){
        var coordinates = shape.getCoordinates();
        for(let index=0;index<4;index++){
            if(newCoordinates[index][0] == this.matrix.length 
                || newCoordinates[index][1] == -1
                || newCoordinates[index][1] == this.matrix[0].length){
                    return false;
                }
            if(!coordinates.some(coordinate => JSON.stringify(coordinate) === JSON.stringify([newCoordinates[index][0],newCoordinates[index][1]]))){
                if(this.matrix[newCoordinates[index][0]][newCoordinates[index][1]]==1){
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
                alert(this.matrix);
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
    getCoordinatesBefore() {return this.coordinatesBefore;}
    getCoordinates(){return this.coordinatesNow;}
    setCoodinatesBefore(){
        for (let index = 0; index < 4; index++) {
            this.coordinatesBefore[index]=[this.coordinatesNow[index][0],this.coordinatesNow[index][1]];
        }
    }
    setNewCoordinates(newCoordinates){
        this.setCoodinatesBefore();
        for (let index = 0; index < 4; index++) {
            this.coordinatesNow[index]=[newCoordinates[index][0],newCoordinates[index][1]];
        }
    }
    fall(){
        let newCoordinates=[[],[],[],[]]
        for (let index = 0; index < 4; index++) {
            newCoordinates[index]=[this.coordinatesNow[index][0]+1,this.coordinatesNow[index][1]];
        }
        return newCoordinates;
    }
    moveThroughX(displacementX){
        let newCoordinates=[[],[],[],[]]
        for (let index = 0; index < 4; index++) {
            newCoordinates[index]=[this.coordinatesNow[index][0],this.coordinatesNow[index][1]+displacementX];
        }
        return newCoordinates;
    }
}
class I extends Shape{
    //Y,X
    constructor() {
        let firstCoordinateX = Math.round(Math.random()+4)
        super([0,firstCoordinateX],
            [1,firstCoordinateX],
            [2,firstCoordinateX],
            [3,firstCoordinateX]);
    }
    round(){
        let newCoordinates=[[],[],[],[]]
        if(this.coordinatesNow[0][1]==this.coordinatesNow[3][1]){
            newCoordinates[3]=[this.coordinatesNow[3][0],this.coordinatesNow[3][1]];
            if(this.coordinatesNow[3][1]<=4){
                for(let index=0; index<3; index++){
                    newCoordinates[index]=[this.coordinatesNow[3][0],this.coordinatesNow[3][1]+3-index];
                }
            }else{
                for(let index=0; index<3; index++){
                    newCoordinates[index]=[this.coordinatesNow[3][0],this.coordinatesNow[3][1]-3+index];
                }
            }
        }else{
            let initShape, finishShape;
            if(this.coordinatesNow[3][1]<this.coordinatesNow[0][1]){
                initShape = this.coordinatesNow[3];
                finishShape = this.coordinatesNow[0];
            }else{
                initShape = this.coordinatesNow[0];
                finishShape = this.coordinatesNow[3];
            }
            if(initShape[1]>=0 && initShape[1]<=2){
                newCoordinates[3]=initShape;
            }else if(initShape[1]==3){
                newCoordinates[3]=[initShape[0]+1,initShape[1]+1];
            } else if(finishShape[1]==6){
                newCoordinates[3]=[initShape[0]+1,initShape[1]-1];
            }else{
                newCoordinates[3]=finishShape;
            }
            for(let index=0; index<3; index++){
                newCoordinates[index]=[newCoordinates[3][0]-3+index,newCoordinates[3][1]];
            }
        }
        return newCoordinates;
    }
}
class O extends Shape{
    //Y,X
    constructor() {
        let firstCoordinateX = Math.round(Math.random()+4)
        super([2,firstCoordinateX],
            [2,firstCoordinateX+1],
            [3,firstCoordinateX],
            [3,firstCoordinateX+1]);
    }
    round(){
        return this.coordinatesNow;
    }
}
class Z extends Shape{
    //Y,X
    constructor() {
        let firstCoordinateX = Math.round(Math.random()+4)
        super([3,firstCoordinateX],
            [3,firstCoordinateX+1],
            [2,firstCoordinateX-1],
            [2,firstCoordinateX]);
    }
    round(){
        let newCoordinates=[[],[],[],[]]
        newCoordinates[0]=[this.coordinatesNow[0][0],this.coordinatesNow[0][1]];
        if(this.coordinatesNow[0][0] == this.coordinatesNow[1][0]){
            newCoordinates[2]=[this.coordinatesNow[0][0],this.coordinatesNow[0][1]+1];
            newCoordinates[3]=[this.coordinatesNow[0][0]-1,this.coordinatesNow[0][1]+1];
            newCoordinates[1]=[this.coordinatesNow[0][0]+1,this.coordinatesNow[0][1]];
        }else{
            newCoordinates[2]=[this.coordinatesNow[0][0]-1,this.coordinatesNow[0][1]];
            newCoordinates[3]=[this.coordinatesNow[0][0]-1,this.coordinatesNow[0][1]-1];
            newCoordinates[1]=[this.coordinatesNow[0][0],this.coordinatesNow[0][1]+1];
        }
        return newCoordinates;
    }
}
class W extends Shape{
    //Y,X
    constructor() {
        let firstCoordinateX = Math.round(Math.random()+4)
        super([3,firstCoordinateX],
            [2,firstCoordinateX],
            [3,firstCoordinateX+1],
            [3,firstCoordinateX-1]);
    }
    round(){
        let newCoordinates=[[],[],[],[]];
        newCoordinates[0]=[this.coordinatesNow[0][0],this.coordinatesNow[0][1]];
        newCoordinates[2][0]=this.coordinatesNow[1][0];
        newCoordinates[2][1]=this.coordinatesNow[1][1];
        newCoordinates[1][0]=this.coordinatesNow[3][0];
        newCoordinates[1][1]=this.coordinatesNow[3][1];
        newCoordinates[3][0]=this.coordinatesNow[0][0]+(newCoordinates[0][0]-newCoordinates[2][0])
        newCoordinates[3][1]=this.coordinatesNow[0][1]+(newCoordinates[0][1]-newCoordinates[2][1])
        return newCoordinates;
    }
}
class L extends Shape{
    //Y,X
    constructor() {
        let firstCoordinateX = 5;
        super([1,firstCoordinateX],
            [1,firstCoordinateX-1],
            [2,firstCoordinateX], //centro
            [3,firstCoordinateX]);
    }
    round(){
        let newCoordinates=[[],[],[],[]];
        newCoordinates[2]=[this.coordinatesNow[2][0],this.coordinatesNow[2][1]];
        if(this.coordinatesNow[2][1]==this.coordinatesNow[0][1]){
            if(this.coordinatesNow[0][0]>this.coordinatesNow[2][0]){
                newCoordinates[0]=[newCoordinates[2][0],newCoordinates[2][1]+1];
                newCoordinates[1]=[newCoordinates[2][0]-1,newCoordinates[2][1]+1];
                newCoordinates[3]=[newCoordinates[2][0],newCoordinates[2][1]-1];
            }else{
                newCoordinates[0]=[newCoordinates[2][0],newCoordinates[2][1]-1];
                newCoordinates[1]=[newCoordinates[2][0]+1,newCoordinates[2][1]-1];
                newCoordinates[3]=[newCoordinates[2][0],newCoordinates[2][1]+1];
            }
        }else{
            if(this.coordinatesNow[1][0]>this.coordinatesNow[0][0]){
                newCoordinates[0]=[newCoordinates[2][0]+1,newCoordinates[2][1]];
                newCoordinates[1]=[newCoordinates[2][0]+1,newCoordinates[2][1]+1];
                newCoordinates[3]=[newCoordinates[2][0]-1,newCoordinates[2][1]];
            }else{
                newCoordinates[0]=[newCoordinates[2][0]-1,newCoordinates[2][1]];
                newCoordinates[1]=[newCoordinates[2][0]-1,newCoordinates[2][1]-1];
                newCoordinates[3]=[newCoordinates[2][0]+1,newCoordinates[2][1]];
            }
        }
        return newCoordinates;
    }
}
var t = new Tetriz();
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        t.moveShape(-1);
    }else if (event.key === 'ArrowRight') {
        t.moveShape(1);
    }else if (event.key === 'ArrowUp') {
        t.roundShape(1);
    }else if (event.key === 'ArrowDown') {
        t.fallFastShape();
    }
});
setInterval("t.run()", 500);