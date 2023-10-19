export class TetrisMatrix{
    constructor(){
        this.matrix=Array.from({ length: 24 }, () => Array(10).fill(0));
        this.matrixColour=Array.from({ length: 24 }, () => Array(10).fill('0'));
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.fullRow = Array(10).fill(1);
        this.emptyRow = Array(10).fill(0);
    }
    getMatrix(){return this.matrix;}
    getLimits(coordinates){
        return coordinates[0] == this.matrix.length 
        || coordinates[1] == -1
        || coordinates[1] == this.matrix[0].length
    }
    getIsGameOver(){
        return this.matrix[4].some(element => element === 1);
    }
    validationPosition(shape, newCoordinates){
        var coordinates = shape.getCoordinates();
        for(let index=0;index<4;index++){
            if(this.getLimits(newCoordinates[index])){
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
    destroyFullRows(){
        const rowsToRemove = [];
        let score = 0;
        for (let row = 0; row < this.matrix.length; row++) {
            if (this.matrix[row].every(cell => cell === 1)) {
                rowsToRemove.push(row);
            }
        }
        rowsToRemove.forEach(row => {
            this.matrix.splice(row, 1);
            this.matrix.unshift([...this.emptyRow]);
            score++;
        });
        if(score==1){
            return score;
        }else{
            return score*(score-1)
        }
    }
    changeMatrix(shape) {
        const coordinates = shape.getCoordinates();
        const coordinatesBefore = shape.getCoordinatesBefore();
        for (let index = 0; index < 4; index++) {
            if (!coordinates.some(coordinate => JSON.stringify(coordinate) === JSON.stringify(coordinatesBefore[index]))) {
                this.setMatrixCell(coordinatesBefore[index][0], coordinatesBefore[index][1], 0);
            }
            this.setMatrixCell(coordinates[index][0], coordinates[index][1], 1, shape.getColour());
        }
    }
    setMatrixCell(row, col, value, color = '0') {
        this.matrix[row][col] = value;
        this.matrixColour[row][col] = color;
    }
    drawLittleSquare(row,column,colour){
        this.context.fillStyle = colour;
        this.context.fillRect(row*30+1, column*30+1, 28, 28);
    }
    draw(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let row = 4; row < this.matrix.length; row++) {
            for (let column = 0; column < this.matrix[0].length; column++) {
                if(this.matrix[row][column] == 1){
                    this.drawLittleSquare(column, row-4,this.matrixColour[row][column]);
                }
            }
        }
    }
}