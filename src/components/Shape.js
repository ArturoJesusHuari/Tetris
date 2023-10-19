export class Shape {
    #colour=['#EF9A9A','#F8BBD0','#D1C4E9','#9FA8DA','#BBDEFB','#B2DFDB','#A5D6A7','#C8E6C9',
            '#E6EE9C','#FFF59D','#FFE0B2','#FFCCBC','#CFD8DC'];
    constructor(coordinates1,coordinates2,coordinates3,coordinates4){
        this.coordinatesNow = [coordinates1,coordinates2,coordinates3,coordinates4]
        this.coordinatesBefore = [];
        this.colour = this.#colour[Math.round(Math.random()*12)];
    }
    getCoordinatesBefore() {return this.coordinatesBefore;}
    getCoordinates(){return this.coordinatesNow;}
    getColour(){return this.colour}
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
export class I extends Shape{
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
export class O extends Shape{
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
export class Z extends Shape{
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
export class W extends Shape{
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
export class L extends Shape{
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