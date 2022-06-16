//siema
//co tamaa
export {Ship, Gameboard};
const Ship = (slots) => {
    let length=slots;
    let model = []; //element of model is 1 if this slot is hit, 0 if not
    for (let i =0; i<length; i++) model[i]=0;
    let hit = (slot)=> {
        if (slot>length || slot < 1){
            return Error('Incorrect slot number');
        }
        else {
            model[slot-1] = 1; 
        }
    } 
    let isSunk = () => {
        if (model.length!= length) return false;
        for(let i of model) {
            if (i != 1) return false;
        }
        return true;
    }
    return {
        length, hit, isSunk,
    }
}

const Gameboard = () => {  //koordynaty (coords) => coords[0] to y, coords[1] to x
    let tables = []
    for (let i =0; i<10;i++) tables.push([]);
    for (let i =0;i<10;i++) {
        for (let j=0;j<10;j++){
            tables[i][j]=-1;
        }
    }
    let placeShip = (ship,coords, direction)=>{ //cords array, direction "horizontal" or "perpendicular"
        console.log(coords);
        console.log(slotsUsed);
        if (direction == "perpendicular"){
            if(coords[0] + ship.length < 10){
                for (let i=0;i<ship.length;i++) {
<<<<<<< Updated upstream
                    if (tables[coords[0]+i][coords[1]]!=-1) return Error(`Ship is already placed there (${coords[0]+i}, ${coords[1]})`)
=======
                    if (tables[coords[0]+i][coords[1]]!=-1){ 
                        console.log("Err,p,1");
                        return Error

                    }
>>>>>>> Stashed changes
                    tables[coords[0]+i][coords[1]]+=1;
                }
                return "ok"
            }
<<<<<<< Updated upstream
            else return Error('Ship is too long');
=======
            else {
                console.log("Err,p,2");
                
                return Error;}
>>>>>>> Stashed changes
        }
        else if (direction=="horizontal"){
            if (coords[1]+ship.length<10) {
                for (let i=0;i<ship.length;i++) {
<<<<<<< Updated upstream
                    if (tables[coords[0]][coords[1]+i]!=-1) return Error(`Ship is already placed there (${coords[0]}, ${coords[1]+i})`)
=======
                    if (tables[coords[0]][coords[1]+i]!=-1) {
                        console.log("Err,h,1");
                        
                        return Error}
                    ship.coordinates.push([coords[0],coords[1]+i]);
                    tables[coords[0]][coords[1]+i]+=1;
                    slotsUsed.push([coords[0],coords[1]+i]);
>>>>>>> Stashed changes

                    tables[coords[0]][coords[1]+i]+=1;
                }
                return "ok"
            }
<<<<<<< Updated upstream
            else return Error('Ship is too long');
=======
            else {
                console.log("Err,h,2");
                
                return Error;}
>>>>>>> Stashed changes
        }
        else return Error("Wrong direction");
    }
    let receiveAttack = (coords)=> {
        if (tables[coords[0]][coords[1]] == 0) {}
    }
    return {
<<<<<<< Updated upstream
        tables, placeShip,
=======
        tables, placeShip, receiveAttack, allShipsSunk, numberOfHits,slotsUsed,
    }
}

let Computer = (myGameboard, yourGameboard) => {
    let slotsAttacked =[];
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max-1);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
      
    let generateNumber = (range1, range2,dupa,ship,direction)=> {
        let y = getRandomInt(range1[0],range1[1]);
        let x = getRandomInt(range2[0],range2[1]);
        function temp (y,x){
            
            if (direction == "perpendicular"){
                for (let i=1;i<ship.length;i++) {
                    if(dupa.includes([y+i,x])==true)return true;}
                return false;}
            else if (direction == "horizontal"){
                for (let i=1;i<ship.length;i++) {
                    if(dupa.includes([y,x+1])==true)return true;}
                return false;}
            

        }
        while (dupa.includes([y,x])==true && temp(y,x)==true) {
            y = getRandomInt(range1[0],range1[1]);
            x = getRandomInt(range2[0],range2[1]);
            
        }
        return [y,x];
    }

    let placeShips = ()=>{
        let four = Ship(4);
        if (getRandomInt(0,2) ==0){
            while(myGameboard.slotsUsed.length!=4){
                console.log(1.1);
                myGameboard.placeShip(four, generateNumber([0,10],[0,7],myGameboard.slotsUsed,four,'horizontal'),'horizontal');
            }
        }
        else {
            while(myGameboard.slotsUsed.length!=4){
                console.log(1.2);
                
                myGameboard.placeShip(four, generateNumber([0,7],[0,10],myGameboard.slotsUsed,four,'perpendicular'),'perpendicular');
            }
        }
        let three1 = Ship(3);
        let three2 = Ship(3);
        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length!=7){
                console.log(2.1);
                myGameboard.placeShip(three1, generateNumber([0,10],[0,8],myGameboard.slotsUsed,three1,'horizontal'),'horizontal');
            }
        }
        else {
            while(myGameboard.slotsUsed.length!=7){
                console.log(2.2);

                myGameboard.placeShip(three1, generateNumber([0,8],[0,10],myGameboard.slotsUsed,three1,'perpendicular'),'perpendicular');
            }
        }
        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length!=10){
                console.log(3.1);
                myGameboard.placeShip(three2, generateNumber([0,10],[0,8],myGameboard.slotsUsed,three2,'horizontal'),'horizontal');
            }
        }
        else {
            while(myGameboard.slotsUsed.length!=10){
                console.log(3.2);
                myGameboard.placeShip(three2, generateNumber([0,8],[0,10],myGameboard.slotsUsed,three2,'perpendicular'),'perpendicular');
            }
        }
        let two1 = Ship(2)
        let two2 = Ship(2)
        let two3 = Ship(2)

        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length!=12){
                console.log(4.1);
                myGameboard.placeShip(two1, generateNumber([0,10],[0,9],myGameboard.slotsUsed,two1,'horizontal'),'horizontal');
            }
        }
        else {
            while(myGameboard.slotsUsed.length!=12){
                console.log(4.2);
                myGameboard.placeShip(two1, generateNumber([0,9],[0,10],myGameboard.slotsUsed,two1,'perpendicular'),'perpendicular');
            }
        }
        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length!=14){
                console.log(5.1);
                myGameboard.placeShip(two2, generateNumber([0,10],[0,9],myGameboard.slotsUsed,two2,'horizontal'),'horizontal');
            }
        }
        else {
            while(myGameboard.slotsUsed.length!=14){
                console.log(5.2);
                myGameboard.placeShip(two2, generateNumber([0,9],[0,10],myGameboard.slotsUsed,two2,'perpendicular'),'perpendicular');
            }
        }
        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length!=16){
                console.log(6.1);
                myGameboard.placeShip(two3, generateNumber([0,10],[0,9],myGameboard.slotsUsed,two3,'horizontal'),'horizontal');
            }
        }
        else {
            while(myGameboard.slotsUsed.length!=16){
                console.log(6.2);
                myGameboard.placeShip(two3, generateNumber([0,9],[0,10],myGameboard.slotsUsed,two3,'perpendicular'),'perpendicular');
            }
        }

        let one1=Ship(1);
        let one2=Ship(1);
        let one3=Ship(1);
        let one4=Ship(1);
        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length!=17){
                console.log(7.1);
                myGameboard.placeShip(one1, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one1,'horizontal'),'horizontal');
            }
        }
        else {
            while(myGameboard.slotsUsed.length!=17){
                console.log(7.2);
                myGameboard.placeShip(one1, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one1,'perpendicular'),'perpendicular');
            }
        }
        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length !=18){
                console.log(8.1);
                myGameboard.placeShip(one2, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one2,'horizontal'),'horizontal');
            }
        }
        else {while(myGameboard.slotsUsed.length !=18){
            console.log(8.2);
            myGameboard.placeShip(one2, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one2,'perpendicular'),'perpendicular');}}
        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length !=19){
                console.log(9.1);
                myGameboard.placeShip(one3, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one3,'horizontal'),'horizontal');
            }
        }
        else {while(myGameboard.slotsUsed.length !=19){
            console.log(9.2);
            myGameboard.placeShip(one3, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one3,'perpendicular'),'perpendicular');}}
        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length !=20){
                console.log(10.1);
                myGameboard.placeShip(one4, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one4,'horizontal'),'horizontal');
            }
        }
        else {while(myGameboard.slotsUsed.length !=20){
            console.log(10.2);
            myGameboard.placeShip(one4, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one4,'perpendicular'),'perpendicular');}}
>>>>>>> Stashed changes
    }
}

<<<<<<< Updated upstream
// module.exports = Ship;
// module.exports = Gameboard;
=======
// let comp = Gameboard();
// let rival = Gameboard();
// let computer = Computer(comp,rival);
// computer.placeShips();
// console.log(comp.slotsUsed);
>>>>>>> Stashed changes
