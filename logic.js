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
    let coordinates =[];
    return {
        length, hit, isSunk, coordinates,
    }
}

const Gameboard = () => {  //koordynaty (coords) => coords[0] to y, coords[1] to x
    let tables = [];
    let ships =[];
    let missed=[];
    let numberOfHits=0;
    for (let i =0; i<10;i++) tables.push([]);
    for (let i =0;i<10;i++) {
        for (let j=0;j<10;j++){
            tables[i][j]=-1;
        }
    }
    let placeShip = (ship,coords, direction)=>{ //cords array, direction "horizontal" or "perpendicular"
        if (direction == "perpendicular"){
            if(coords[0] + ship.length < 10){
                for (let i=0;i<ship.length;i++) {
                    if (tables[coords[0]+i][coords[1]]!=-1) return Error(`Ship is already placed there (${coords[0]+i}, ${coords[1]})`)
                    tables[coords[0]+i][coords[1]]+=1;
                    ship.coordinates.push([coords[0]+i,coords[1]])
                }
                ships.push(ship);
                return "ok"
            }
            else return Error('Ship is too long');
        }
        else if (direction=="horizontal"){
            if (coords[1]+ship.length<10) {
                for (let i=0;i<ship.length;i++) {
                    if (tables[coords[0]][coords[1]+i]!=-1) return Error(`Ship is already placed there (${coords[0]}, ${coords[1]+i})`)
                    ship.coordinates.push([coords[0],coords[1]+i]);
                    tables[coords[0]][coords[1]+i]+=1;
                }
                ships.push(ship);
                return "ok"
            }
            else return Error('Ship is too long');
        }
        else return Error("Wrong direction");
    }
    let receiveAttack = (coords)=> { 
        if (tables[coords[0]][coords[1]] == 0) {
            for(let i=0;i<ships.length;i++){ //searching for a ship that those coords belong to
                for (let coord of ships[i].coordinates){
                    if (JSON.stringify(coord) === JSON.stringify(coords)){ //gotta use JSON.stringify because simple == or === doesn't work with arrays
                        ships[i].hit(ships[i].coordinates.indexOf(coord)+1);
                        tables[coords[0]][coords[1]] =1;
                        numberOfHits+=1;
                        return "Hit";
                    }
                }
            }
        }
        else if (tables[coords[0]][coords[1]] == -1) {
            missed.push([[coords[0]],[coords[1]]]);
            return "Miss";
        }
    }
    return {
        tables, placeShip, receiveAttack,
    }
}

// module.exports = Ship;
// module.exports = Gameboard;
