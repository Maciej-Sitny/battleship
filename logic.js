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
        if (direction == "perpendicular"){
            if(coords[0] + ship.length < 10){
                for (let i=0;i<ship.length;i++) {
                    if (tables[coords[0]+i][coords[1]]!=-1) return Error(`Ship is already placed there (${coords[0]+i}, ${coords[1]})`)
                    tables[coords[0]+i][coords[1]]+=1;
                }
                return "ok"
            }
            else return Error('Ship is too long');
        }
        else if (direction=="horizontal"){
            if (coords[1]+ship.length<10) {
                for (let i=0;i<ship.length;i++) {
                    if (tables[coords[0]][coords[1]+i]!=-1) return Error(`Ship is already placed there (${coords[0]}, ${coords[1]+i})`)

                    tables[coords[0]][coords[1]+i]+=1;
                }
                return "ok"
            }
            else return Error('Ship is too long');
        }
        else return Error("Wrong direction");
    }
    let receiveAttack = (coords)=> {
        if (tables[coords[0]][coords[1]] == 0) {}
    }
    return {
        tables, placeShip,
    }
}

// module.exports = Ship;
// module.exports = Gameboard;
