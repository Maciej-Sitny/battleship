import {Ship, Gameboard, Computer} from './logic.js';

// test('returns error when slot is incorrect', ()=> {
//     let example = Ship(2);
//     example.hit(1);
//     example.hit(2);
//     expect(example.hit(0)).toBe(Error('Incorrect slot number'));
// })

// test('returns false when ship is not sunk', ()=> {
//     let example = Ship(2);
//     example.hit(1);
//     expect(example.isSunk()).toBeFalsy;
// })

// test('returns true when ship is sunk', ()=> {
//     let example = Ship(2);
//     example.hit(1);
//     example.hit(2);
//     expect(example.isSunk()).toBeTruthy;
// })

test('checking if horizontal placing works', ()=> {
    let example = Ship(2);
    let dupa = Gameboard();
    expect(dupa.placeShip(example, [0,0],'horizontal')).toBe('ok'); 
    // expect(example.length).toBe(2); 
})

test('checking if perpendicular placing works', ()=> {
    let example = Ship(2);
    let dupa = Gameboard();
    expect(dupa.placeShip(example, [0,0],'perpendicular')).toBe('ok'); 
    // expect(example.length).toBe(2); 
})
test('checking if horizontal extreme placing works', ()=> {
    let example = Ship(2);
    let dupa = Gameboard();
    expect(dupa.placeShip(example, [0,9],'horizontal')).toStrictEqual(Error('Ship is too long')); 
    // expect(example.length).toBe(2); 
})
test('checking if perpendicular extreme placing works', ()=> {
    let example = Ship(2);
    let dupa = Gameboard();
    expect(dupa.placeShip(example, [9,0],'perpendicular')).toStrictEqual(Error('Ship is too long')); 
    // expect(example.length).toBe(2); 
})
test('checking if it catches wrong direction', ()=> {
    let example = Ship(2);
    let dupa = Gameboard();
    expect(dupa.placeShip(example, [0,9],'perpendiculllllar')).toStrictEqual(Error('Wrong direction')); 
    // expect(example.length).toBe(2); 
})
test('checking if it catches placing ship on another ship', ()=> {
    let example = Ship(2);
    let example2 =Ship(3);
    let dupa = Gameboard();
    dupa.placeShip(example, [0,0],'perpendicular')
    expect(dupa.placeShip(example2, [1,0],'horizontal')).toStrictEqual(Error('Ship is already placed there (1, 0)')); 
    // expect(example.length).toBe(2); 
})

test("checking if a given ship's coordinates work", ()=>{
    let example=Ship(2);
    let dupa=Gameboard();
    dupa.placeShip(example, [0,0], 'horizontal');
    expect(example.coordinates).toStrictEqual([[0,0],[0,1]]);
})

test("checking if receiving a valid attack works", ()=> {
    let example=Ship(2);
    let dupa=Gameboard();
    dupa.placeShip(example, [0,0], 'horizontal');
    expect(dupa.receiveAttack([0, 0])).toBe("Hit");
})

test("checking if allShipsSunk() works (false)", ()=>{
    let example = Ship(2);
    let example2 = Ship(2);
    let dupa = Gameboard();
    dupa.placeShip(example,[0,0],'horizontal');
    dupa.placeShip(example2,[1,0],'horizontal');
    dupa.receiveAttack([0,0]);
    expect(dupa.allShipsSunk()).toBeFalsy();
})
test("checking if allShipsSunk() works (true)", ()=>{
    let example = Ship(2);
    let example2 = Ship(2);
    let dupa = Gameboard();
    dupa.placeShip(example,[0,0],'horizontal');
    dupa.placeShip(example2,[1,0],'horizontal');
    dupa.receiveAttack([0,0]);
    dupa.receiveAttack([1,0]);
    dupa.receiveAttack([1,1]);
    
    expect(dupa.numberOfHits()).toBe(3);
})

test("checking if Computer's placeShips works", ()=>{
    let comp = Gameboard();
    let rival = Gameboard();
    let computer = Computer(comp,rival);
    computer.placeShips();
    let a = ()=>{
        let b="";
        for(let i =0;i<10;i++){
            for (let j = 0; j<10;j++){
                b+=comp.tables[i][j];
            }
            b+=" ";
        }
        return b;
    }
    expect(comp.tables).toBe("Siema");
})

// test("dpua", ()=>{
//     let a = Ship(2);
//     let o=Ship(4);
//     let dupa = Gameboard();
//     dupa.placeShip(a,[6,1],'perpendicular');
//     dupa.placeShip(o, [5,6],"horizontal")
//     let c = ()=>{
//                 let b="";
//                 for(let i =0;i<10;i++){
//                     for (let j = 0; j<10;j++){
//                         b+=dupa.tables[i][j];
//                     }
//                     b+=" ";
//                 }
//                 return b;
//             }
//     expect(c()).toBe("elo")
// })