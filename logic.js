export {Ship, Gameboard, Computer, removeSomething};
import { blockNeigbours } from "./interface.js";
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
    let coordinates =[];
    return {
        length, hit, isSunk, coordinates,
    }
}

const removeSomething = (something) => {
    let del = document.querySelectorAll(something);
    del.forEach(d => d.remove());
}

function playerPlacing() {

}

const Gameboard = () => {  //koordynaty (coords) => coords[0] to y, coords[1] to x
    let tables = [];
    let ships =[];
    let missed=[];
    let slotsUsed=[];

    for (let i =0; i<10;i++) tables.push([]);
    for (let i =0;i<10;i++) { //-1 if coords are free, 0 if they are taken by a ship, 1 if this slot was hit succesfully
        for (let j=0;j<10;j++){
            tables[i][j]=-1;
        }
    }
    let allShipsSunk = () => {
        let allSlots=0;
        for (let ship of ships) {
            allSlots+=ship.length;
        }
        return allSlots == numberOfHits();
    }
    let placeShip = (ship,coords, direction)=>{ //cords array, direction "horizontal" or "perpendicular"
        if (direction == "perpendicular"){
            // let temp=[];
            if(coords[0] + ship.length < 10){
                for (let i=0;i<ship.length;i++) {
                    if (tables[coords[0]+i][coords[1]]!=-1) return Error
                    tables[coords[0]+i][coords[1]]+=1;
                    ship.coordinates.push([coords[0]+i,coords[1]])
                    slotsUsed.push([coords[0]+i,coords[1]]);
                }
                // slotsUsed.push(temp)
                ships.push(ship);
                return "ok"
            }
            else return Error;
        }
        else if (direction=="horizontal"){
            let temp=[];
            if (coords[1]+ship.length<10) {
                for (let i=0;i<ship.length;i++) {
                    if (tables[coords[0]][coords[1]+i]!=-1) return Error
                    ship.coordinates.push([coords[0],coords[1]+i]);
                    tables[coords[0]][coords[1]+i]+=1;
                    slotsUsed.push([coords[0],coords[1]+i]);

                }
                ships.push(ship);
                // slotsUsed.push(temp);
                return "ok"
            }
            else return Error;
        }
        else return Error;
    }
    let receiveAttack = (coords)=> { 
        if (tables[coords[0]][coords[1]] == 0) {
            for(let i=0;i<ships.length;i++){ //searching for a ship that those coords belong to
                for (let coord of ships[i].coordinates){
                    if (JSON.stringify(coord) === JSON.stringify(coords)){ //gotta use JSON.stringify because simple == or === doesn't work with arrays
                        ships[i].hit(ships[i].coordinates.indexOf(coord)+1);
                        tables[coords[0]][coords[1]] =1;
                        // slotsUsed.push(coords);
                        return "Hit";
                    }
                }
            }
        }
        else if (tables[coords[0]][coords[1]] == -1) {
            missed.push([[coords[0]],[coords[1]]]);
            // slotsUsed.push(coords);

            return "Miss";
        }
    }
    let numberOfHits =()=>{
        let a=0;
        for (let i = 0; i<10;i++){
            for (let j=0;j<10;j++) if (tables[i][j]==1) a+=1;
        }
        return a;
    }
    return {
        tables, placeShip, receiveAttack, allShipsSunk, numberOfHits,slotsUsed,
    }
}

let Player = (myGameboard, yourGameboard) => {
    let slotsAttacked =[];
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max-1);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let attack = (y,x) => {
        yourGameboard.receiveAttack([y,x]);
        slotsAttacked.push([y,x]);
    }

    return (attack);
}

let Computer = (myGameboard, yourGameboard) => {
    let slotsAttacked =[];
    let shipsSlots=[]
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max-1);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    
    

    function baranie(ship, coords,direction){
        console.log(`${ship.length}AAAAAAAFSGAWGGASG`)
        if (direction == 'perpendicular'){
            for (let i=0;i<ship.length;i++) {
                if (myGameboard.tables[coords[0]+i][coords[1]]!=-1 && myGameboard.tables[coords[0]+i][coords[1]]!=-4) return Error;        
            }
        }
        else if (direction=='horizontal'){
            for (let i=0;i<ship.length;i++) {
                if (myGameboard.tables[coords[0]][coords[1]+i]!=-1 && myGameboard.tables[coords[0]][coords[1]+i]!=-4) return Error;      
            }
        }
        return "git";
    }
      
    let generateNumber = (range1, range2,dupa,ship,direction)=> {
        console.log(myGameboard.slotsUsed)
        let y = getRandomInt(range1[0],range1[1]);
        let x = getRandomInt(range2[0],range2[1]);
        while (baranie(ship,[y,x],direction)==Error) {
            y = getRandomInt(range1[0],range1[1]);
            x = getRandomInt(range2[0],range2[1]);
        }
        // let shipArray=[]
        // if (direction == 'perpendicular') {
        //     for (let i =0;i<ship.length;i++) shipArray.push(JSON.stringify([y+i,x]))
        // }
        // else if (direction == 'horizontal') {
        //     for (let i =0;i<ship.length;i++) shipArray.push(JSON.stringify([y,x+i]))
        // }
        // shipsSlots.push(shipArray)
        return [y,x];
    }

    let placeShips = ()=>{
        let four = Ship(4);
        if (getRandomInt(0,2) == 0){

            while (myGameboard.slotsUsed.length!=4){ ///////////
                if (myGameboard.slotsUsed.length>4) {
                    while (myGameboard.slotsUsed.length!=0)
                        myGameboard.slotsUsed.pop();
                }
                 myGameboard.placeShip(four, generateNumber([0,7],[0,10],myGameboard.slotsUsed,four,'perpendicular'),'perpendicular');
            }
            // shipsSlots.push(JSON.stringify(temp));
            
        }
        else {

            while (myGameboard.slotsUsed.length!=4){
                if (myGameboard.slotsUsed.length>4) {
                    while (myGameboard.slotsUsed.length!=0)
                        myGameboard.slotsUsed.pop();
                }
                 myGameboard.placeShip(four, generateNumber([0,10],[0,7],myGameboard.slotsUsed,four,'horizontal'),'horizontal');}
            // console.log(`eeeeoeoeoeo ${temp}`)
            // shipsSlots.push(JSON.stringify(temp))
        }
        console.log(myGameboard.slotsUsed.length)
        blockNeigbours(myGameboard)
        let three1 = Ship(3);
        let three2 = Ship(3);
        if (getRandomInt(0,2)==0){
            while (myGameboard.slotsUsed.length!=7){
                if (myGameboard.slotsUsed.length>7) {
                    while (myGameboard.slotsUsed.length!=4)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(three1, generateNumber([0,8],[0,10],myGameboard.slotsUsed,three1,'perpendicular'),'perpendicular');
            }
        }
        else {
            while (myGameboard.slotsUsed.length!=7){
                if (myGameboard.slotsUsed.length>7) {
                    while (myGameboard.slotsUsed.length!=4)
                        myGameboard.slotsUsed.pop();
                }
                 myGameboard.placeShip(three1, generateNumber([0,10],[0,8],myGameboard.slotsUsed,three1,'horizontal'),'horizontal');;
            }
        }
        console.log(myGameboard.slotsUsed.length)
        blockNeigbours(myGameboard)

        if (getRandomInt(0,2)==0){
            while (myGameboard.slotsUsed.length!=10){
                if (myGameboard.slotsUsed.length>10) {
                    while (myGameboard.slotsUsed.length!=7)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(three2, generateNumber([0,8],[0,10],myGameboard.slotsUsed,three2,'perpendicular'),'perpendicular');
            }
        }
        else {
            while (myGameboard.slotsUsed.length!=10){
                if (myGameboard.slotsUsed.length>10) {
                    while (myGameboard.slotsUsed.length!=7)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(three2, generateNumber([0,10],[0,8],myGameboard.slotsUsed,three2,'horizontal'),'horizontal');
            }
        }
        console.log(myGameboard.slotsUsed.length)
        blockNeigbours(myGameboard)

        let two1 = Ship(2)
        let two2 = Ship(2)
        let two3 = Ship(2)

        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length!=12){
                if (myGameboard.slotsUsed.length>12) {
                    while (myGameboard.slotsUsed.length!=10)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(two1, generateNumber([0,10],[0,9],myGameboard.slotsUsed,two1,'horizontal'),'horizontal');
            }
        }
        else {
            while(myGameboard.slotsUsed.length!=12){
                if (myGameboard.slotsUsed.length>12) {
                    while (myGameboard.slotsUsed.length!=10)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(two1, generateNumber([0,9],[0,10],myGameboard.slotsUsed,two1,'perpendicular'),'perpendicular');
            }
        }
        console.log(myGameboard.slotsUsed.length)
        blockNeigbours(myGameboard)

        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length!=14){
                if (myGameboard.slotsUsed.length>14) {
                    while (myGameboard.slotsUsed.length!=12)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(two2, generateNumber([0,10],[0,9],myGameboard.slotsUsed,two2,'horizontal'),'horizontal');
            }
        }
        else {
            while(myGameboard.slotsUsed.length!=14){
                if (myGameboard.slotsUsed.length>14) {
                    while (myGameboard.slotsUsed.length!=12)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(two2, generateNumber([0,9],[0,10],myGameboard.slotsUsed,two2,'perpendicular'),'perpendicular');
            }
        }
        console.log(myGameboard.slotsUsed.length)
        blockNeigbours(myGameboard)

        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length!=16){
                if (myGameboard.slotsUsed.length>16) {
                    while (myGameboard.slotsUsed.length!=14)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(two3, generateNumber([0,10],[0,9],myGameboard.slotsUsed,two3,'horizontal'),'horizontal');
            }
        }
        else {
            while(myGameboard.slotsUsed.length!=16){
                if (myGameboard.slotsUsed.length>16) {
                    while (myGameboard.slotsUsed.length!=14)
                        myGameboard.slotsUsed.pop();
                }
                if (myGameboard.placeShip(two3, generateNumber([0,9],[0,10],myGameboard.slotsUsed,two3,'perpendicular'),'perpendicular')==Error)myGameboard.placeShip(two3, generateNumber([0,9],[0,10],myGameboard.slotsUsed,two3,'horizontal'),'perpendicular');
            }
        }
        console.log(myGameboard.slotsUsed.length)
        blockNeigbours(myGameboard)

        let one1=Ship(1);
        let one2=Ship(1);
        let one3=Ship(1);
        let one4=Ship(1);
        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length!=17){
                if (myGameboard.slotsUsed.length>17) {
                    while (myGameboard.slotsUsed.length!=16)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(one1, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one1,'horizontal'),'horizontal');
            }
        }
        else {
            while(myGameboard.slotsUsed.length!=17){
                if (myGameboard.slotsUsed.length>17) {
                    while (myGameboard.slotsUsed.length!=16)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(one1, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one1,'perpendicular'),'perpendicular');
            }
        }
        console.log(myGameboard.slotsUsed.length)
        blockNeigbours(myGameboard)

        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length!=18){
                if (myGameboard.slotsUsed.length>18) {
                    while (myGameboard.slotsUsed.length!=17)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(one2, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one2,'horizontal'),'horizontal');
            }
        }
        else {
            while(myGameboard.slotsUsed.length!=18){
                if (myGameboard.slotsUsed.length>18) {
                    while (myGameboard.slotsUsed.length!=17)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(one2, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one2,'perpendicular'),'perpendicular');
        }
        }
        blockNeigbours(myGameboard)

        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length!=19){
                if (myGameboard.slotsUsed.length>19) {
                    while (myGameboard.slotsUsed.length!=18)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(one3, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one3,'horizontal'),'horizontal');
            }
        }
        else {
            while(myGameboard.slotsUsed.length!=19){
                if (myGameboard.slotsUsed.length>19) {
                    while (myGameboard.slotsUsed.length!=18)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(one3, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one3,'perpendicular'),'perpendicular');
            }
        }
        blockNeigbours(myGameboard)

        if (getRandomInt(0,2)==0){
            while(myGameboard.slotsUsed.length!=20){
                if (myGameboard.slotsUsed.length>20) {
                    while (myGameboard.slotsUsed.length!=19)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(one4, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one4,'horizontal'),'horizontal');
            }
        }
        else {
            while(myGameboard.slotsUsed.length!=20){
                if (myGameboard.slotsUsed.length>20) {
                    while (myGameboard.slotsUsed.length!=19)
                        myGameboard.slotsUsed.pop();
                }
                myGameboard.placeShip(one4, generateNumber([0,10],[0,10],myGameboard.slotsUsed,one4,'perpendicular'),'perpendicular');
            }
        }
        blockNeigbours(myGameboard)

    }

    let attack = (wasHit,prevCoords,direction) => {
        if (wasHit) {
            if (direction=="+horizontal" && prevCoords[1]+1<=9) {slotsAttacked.push(JSON.stringify([prevCoords[0],prevCoords[1]+1])); return [prevCoords[0],prevCoords[1]+1,'+horizontal'];}
            else if (direction=="-horizontal" && prevCoords[1]-1>=0){slotsAttacked.push(JSON.stringify([prevCoords[0],prevCoords[1]-1])); return [prevCoords[0],prevCoords[1]-1,'-horizontal']}
            else if (direction=="-perpendicular" && prevCoords[0]-1>=0){slotsAttacked.push(JSON.stringify([prevCoords[0]-1,prevCoords[1]])); return [prevCoords[0]-1,prevCoords[1],"-perpendicular"]}
            else if (direction=="+perpendicular" && prevCoords[0]+1<=9){slotsAttacked.push(JSON.stringify([prevCoords[0]+1,prevCoords[1]])); return [prevCoords[0]+1,prevCoords[1],"+perpendicular"]}
            else if (direction==null){
                if (slotsAttacked.includes(JSON.stringify([prevCoords[0]+1,prevCoords[1]]))==false && prevCoords[0]+1<=9){
                    return [prevCoords[0]+1,prevCoords[1],'+perpendicular']
                }
                else if (slotsAttacked.includes(JSON.stringify([prevCoords[0]-1,prevCoords[1]]))==false && prevCoords[0]-1<=0){
                    return [prevCoords[0]-1,prevCoords[1],'-perpendicular']
                }
                else if (slotsAttacked.includes(JSON.stringify([prevCoords[0],prevCoords[1]+1]))==false && prevCoords[1]+1<=9){
                    return [prevCoords[0],prevCoords[1]+1,'+horizontal']
                }
                else if (slotsAttacked.includes(JSON.stringify([prevCoords[0],prevCoords[1]-1]))==false && prevCoords[1]-1<=0){
                    return [prevCoords[0],prevCoords[1]-1,'-horizontal']
                }
            }}
        else {
            let y = getRandomInt(0,10);
            let x = getRandomInt(0,10);
                while (slotsAttacked.includes(JSON.stringify([y,x]))!=false){
                    y = getRandomInt(0,10);
                    x = getRandomInt(0,10);
                }
                // yourGameboard.receiveAttack([y,x]);
            slotsAttacked.push(JSON.stringify([y,x]));
            return [y,x,null]
            }
        }
        
    

    return {placeShips,attack}
}

// let comp = Gameboard();
// let rival = Gameboard();
// let computer = Computer(comp,rival);
// computer.placeShips();
// console.log(comp.slotsUsed);
