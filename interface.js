import {Ship, Gameboard, Computer, removeSomething} from './logic.js';
export {blockNeigbours};
const body = document.querySelector('body');

let recentSlots=[];
let hitCoords=[];
let validHitCoords=[];
function updatePlayerSide(playerGameboard,playerDisplay,coords) {
    hitCoords.push(JSON.stringify(coords))
    removeSomething('.void');
    removeSomething('.filled');
    removeSomething('.hit');
    
    for (let i=0;i<10;i++){  //going through all numbers of nested arrays and based on them adding proper div
        for (let j=0;j<10;j++) {
            if (playerGameboard.tables[i][j]==-4) playerGameboard.tables[i][j]=-1;
            if (hitCoords.includes(JSON.stringify([i,j])) && playerGameboard.tables[i][j]==-1){ //missed shot by the computer
                let m= document.createElement('div');
                m.setAttribute('style','border: 2px solid var(--titleorange);width: 30px;height: 30px;background:url("miss_ship.jpg")');
                m.classList.add('hit')
                playerDisplay.appendChild(m);
            }
            else if (playerGameboard.tables[i][j]==-1) { //not used
                let empty = document.createElement('div');
                empty.classList.add('void');
                playerDisplay.appendChild(empty)
            }
            else if (playerGameboard.tables[i][j]==0 && hitCoords.includes(JSON.stringify([i,j]))) {  //hit by the computer
                let hit = document.createElement('div');
                hit.setAttribute('style','border: 2px solid var(--titleorange);width: 30px;height: 30px;background:url("hit_ship.jpg");');
                hit.classList.add('filled')
                if (!validHitCoords.includes(JSON.stringify([i,j]))) validHitCoords.push(JSON.stringify([i,j]));
                playerDisplay.appendChild(hit);       
            }
            else if (playerGameboard.tables[i][j]==0){ //placed by the player
                let filled =document.createElement('div');
                filled.classList.add('filled');
                filled.setAttribute('style', 'border: 2px solid var(--titleorange);width: 30px;height: 30px;background: blue;')
                playerDisplay.appendChild(filled);
            }
        }
    }
    if (coords!=undefined)
        if (playerGameboard.tables[coords[0]][coords[1]]==0) return 'hit';
}

async function battle(playerGameboard, computerGameboard) {
    let displayContainer = document.createElement('div');
    let playerDisplay = document.createElement('div');
    let computerDisplay = document.createElement('div');
    let names = document.createElement('div')
    
    let playerName = document.createElement('h2')
    playerName.innerText="You";
    
    let computerName = document.createElement('h2')
    computerName.innerText="Computer";
    
    names.setAttribute('style', 'display:flex; width:730px;gap:14px;justify-content:space-around;');
    names.appendChild(playerName);
    names.appendChild(computerName);
    
    body.appendChild(names);

    displayContainer.classList.add('displayContainer');
    playerDisplay.classList.add('selectdiv');
    computerDisplay.classList.add('selectdiv')
    
    updatePlayerSide(playerGameboard,playerDisplay);
    
    let computer = Computer(computerGameboard);
    computer.placeShips();
    // console.log(computerGameboard.slotsUsed)
    
    let sunkArray=[] //creating this array to group slots used by the computer to know when the player sunk the ship
    for (let i=0;i<10;i++) sunkArray.push([]);
    for (let i=0;i<4;i++) sunkArray[0].push(computerGameboard.slotsUsed[i])
    for (let i=4;i<7;i++) sunkArray[1].push(computerGameboard.slotsUsed[i])
    for (let i=7;i<10;i++) sunkArray[2].push(computerGameboard.slotsUsed[i])
    for (let i=10;i<12;i++) sunkArray[3].push(computerGameboard.slotsUsed[i])
    for (let i=12;i<14;i++) sunkArray[4].push(computerGameboard.slotsUsed[i])
    for (let i=14;i<16;i++) sunkArray[5].push(computerGameboard.slotsUsed[i])
    for (let i=16;i<17;i++) sunkArray[6].push(computerGameboard.slotsUsed[i])
    for (let i=17;i<18;i++) sunkArray[7].push(computerGameboard.slotsUsed[i])
    for (let i=18;i<19;i++) sunkArray[8].push(computerGameboard.slotsUsed[i])
    for (let i=19;i<20;i++) sunkArray[9].push(computerGameboard.slotsUsed[i])
    let sunkArrayCopy = [];
    for (let i=0;i<10;i++) sunkArrayCopy.push([]);  //creating copy of sunkArray, so when the player hits the ship, these coords are deleted from the sunkArray, but they stay in its copy to compare those arrays later on
    for (let i=0;i<10;i++)
        for (let j=0;j<sunkArray[i].length;j++){
            sunkArrayCopy[i][j]=sunkArray[i][j]
        }
    for (let array of sunkArray) {
        for (let a of array) a=JSON.stringify(a);
    }

    function restartGame() {
        removeSomething('.selectdiv');
        removeSomething('.displayContainer');
        removeSomething('.welcome');
        removeSomething('.playerButton');
        hitCoords=[];
        recentSlots=[];
        names.remove()
        for (let i=0;i<10;i++)
            for (let j=0;j<10;j++){
                playerGameboard.tables[i][j]=-1;
                computerGameboard.tables[i][j]=-1;
            }
        welcome();
    }
    function computerWin(){
        if (validHitCoords.length!=20)return 'no';
        computerDisplay.setAttribute('style','pointer-events:none;')
        let winDisplay = document.createElement('h1')
        winDisplay.innerText='You lost!'
        let restartButton = document.createElement('button');
        restartButton.innerText='Play again';
        restartButton.classList.add('playerButton')
        restartButton.addEventListener('click',()=>{
            winDisplay.remove();
            restartGame();
        })
        body.appendChild(winDisplay);
        body.appendChild(restartButton);
        
    }
    function playerWin() {
        for (let i =0;i<10;i++){
            if (sunkArray[i].length!=0) return 'no';
        }
        computerDisplay.setAttribute('style','pointer-events:none;')
        let winDisplay = document.createElement('h1')
        winDisplay.innerText='You won!'
        let restartButton = document.createElement('button');
        restartButton.innerText='Play again';
        restartButton.classList.add('playerButton')
        restartButton.addEventListener('click',()=>{
            winDisplay.remove();
            restartGame();

        })
        body.appendChild(winDisplay);
        body.appendChild(restartButton);
    }
    function sunkCheck () {
        
        for (let i =0;i<10;i++){
            if (sunkArray[i].length==0){ //checking if any array of sunkArray is empty, and if so, go to its equivalent in sunkArrayCopy and use those coords to change the colors of particular slots thanks to which player knows they sunk the ship
                for (let coords of sunkArrayCopy[i]){
                    console.log('co tam');
                    document.querySelector(`#compDiv${coords[0]}${coords[1]}`).classList.remove('placed')
                    document.querySelector(`#compDiv${coords[0]}${coords[1]}`).classList.add('shipSunk')
                }
            }
        }
    }

    for (let i=0;i<10;i++){
        for (let j=0;j<10;j++) {
            let compDiv = document.createElement('div');
            compDiv.setAttribute('style', 'border: 2px solid var(--titleorange);width: 30px;height: 30px;');
            compDiv.setAttribute('id', `compDiv${i}${j}`)
            computerDisplay.appendChild(compDiv);
            compDiv.addEventListener('click', async ()=>{ //proper loop of the whole game
                // let wasHit=false;
                // let beginning;
                // let start=false;
                if (computerGameboard.tables[i][j]==0){ //player hit
                    for (let array of sunkArray){
                        for (let a of array){
                            if (JSON.stringify(a)==JSON.stringify([i,j])){
                                array.splice(array.indexOf(a),1);
                                break;
                            }
                        }
                    }
                    computerGameboard.tables[i][j]=1;
                    computerGameboard.receiveAttack([i,j])
                    compDiv.classList.add('placed');
                    sunkCheck();
                    playerWin();

                }
                else if (computerGameboard.tables[i][j]==-1 || computerGameboard.tables[i][j]==-4){ //player missed
                    compDiv.setAttribute('style', 'border: 2px solid var(--titleorange);width: 30px;height: 30px;background: red;')
                    computerGameboard.tables[i][j]=-101;
                    let check = computer.attack()
                    console.log(`aaaaaaaaaaaaa${check}`)
                    // if (start==false&&updatePlayerSide(playerGameboard,playerDisplay,[check[0],check[1]])=='hit') {beginning = [check[0],check[1]];start=true;}
                    while (updatePlayerSide(playerGameboard,playerDisplay,check)=='hit' ){ 
                        // prevCoords=[check[0],check[1]];
                        // wasHit=true
                        computerDisplay.setAttribute('style','pointer-events:none;')
                        await new Promise(resolve => setTimeout(resolve, 1700));
                        computerWin();
                        check=computer.attack();
                        
                    }
                    // wasHit=false;
                    // prevCoords=[...beginning];
                    computerDisplay.setAttribute('style','pointer-events:auto;')

                }})
        }
    }
    displayContainer.appendChild(playerDisplay); 
    displayContainer.appendChild(computerDisplay); 
    body.appendChild(displayContainer)
    body.setAttribute('style','gap:3vh;')
}

function blockNeigbours(gb){ //blocking slots right next to the ship in order to avoid placing ships right next to each other
    for (let i=0;i<10;i++){
        for (let j=0;j<10;j++){
            // console.log(gb.tables[i][j])
            if (gb.tables[i][j]==0){
                
                if (i+1>=0 && i+1<=9 && j>=0 && j<=9)
                    if (gb.tables[i+1][j]==-1) gb.tables[i+1][j]=-4;
                if (i+1>=0 && i+1<=9 && j+1>=0 && j+1<=9)  
                    if (gb.tables[i+1][j+1]==-1 ) gb.tables[i+1][j+1]=-4;
                if (i-1>=0 && i-1<=9 && j-1>=0 && j-1<=9)
                    if (gb.tables[i-1][j-1]==-1) gb.tables[i-1][j-1]=-4;
                if (i>=0 && i<=9 && j+1>=0 && j+1<=9)
                    if (gb.tables[i][j+1]==-1 ) gb.tables[i][j+1]=-4;
                if (i-1>=0 && i-1<=9 && j>=0 && j<=9)
                    if (gb.tables[i-1][j]==-1 ) gb.tables[i-1][j]=-4;
                if (i>=0 && i<=9 && j-1>=0 && j-1<=9)    
                    if (gb.tables[i][j-1]==-1) gb.tables[i][j-1]=-4;
                if (i+1>=0 && i+1<=9 && j-1>=0 && j-1<=9)    
                    if (gb.tables[i+1][j-1]==-1 ) gb.tables[i+1][j-1]=-4;
                if (i-1>=0 && i-1<=9 && j+1>=0 && j+1<=9)    
                    if (gb.tables[i-1][j+1]==-1) gb.tables[i-1][j+1]=-4;
            }
            
        }
    }
}

async function updateView(gb,dupa, length, direction,next, used){ //updating the grid on which player places ships
    if (length==0 && document.querySelector('#doneButton')==null) {let done = document.createElement('button'); 
        done.innerText='Done';
        done.setAttribute('id','doneButton')
        done.classList.add('playerButton');
        done.addEventListener('mouseover', ()=> {
            done.setAttribute('style', 'color: #000814; background: #ffe8d6; border:3px solid #000814;')
        })
        done.addEventListener('mouseleave', ()=> {
            done.setAttribute('style', 'background: #000814; color: #ffe8d6; border: 3px solid #ffe8d6;')
        })
        done.addEventListener('click',()=>{
            removeSomething('.selectdiv')
            removeSomething('.playerButton')
            document.querySelector('.welcome').innerText="Let the battle begin!";
            let a=Gameboard()
            battle(gb,a)
        })
        body.appendChild(done);}
    let a = document.querySelector(dupa);
    if (a!=null) a.remove();
    let container = document.createElement('div');
    container.classList.add("selectdiv");
    container.addEventListener("contextmenu", e => e.preventDefault());
    container.addEventListener('contextmenu', ()=> {  //clicking left button on the mouse changes direction of placing the ship
        if (direction=='horizontal') direction = 'perpendicular';
        else if (direction=='perpendicular') direction = 'horizontal';
    })
    body.appendChild(container);
    for (let i=0;i<10;i++){ //creating the grid but also preparing it for hovering over it
        for (let j=0;j<10;j++) {
            if (gb.tables[i][j]==-1) {
                let selectable = document.createElement('div');
                selectable.classList.add('void');
                selectable.setAttribute('id', `${i}${j}`);
                container.appendChild(selectable);
                
                selectable.addEventListener('mouseover', ()=>{
                    if (length==0) return;
                    let temp=false;
                    for (let i =0;i<length;i++){ //making sure that the slots on which the ship will be placed are valid
                        if (direction=='perpendicular' && +selectable.id[0]+length<11){
                            if (gb.tables[+selectable.id[0]+i][+selectable.id[1]]==-1)//if the slot is valid, it changes its value to -2 - "prepared"
                                gb.tables[+selectable.id[0]+i][+selectable.id[1]]=-2;
                            else if (gb.tables[+selectable.id[0]+i][+selectable.id[1]]==0 ){ // if a given slot is already used, changing all the slots values before it to -3
                                for (let k = 0; k<length;k++){
                                    if (k<i)
                                        gb.tables[+selectable.id[0]+k][+selectable.id[1]]=-3;}break;}
                            
                            else if (gb.tables[+selectable.id[0]+i][+selectable.id[1]]==-4){ //if a given slot is right next to the other ship
                                gb.tables[+selectable.id[0]+i][+selectable.id[1]]=-5
                                
                                    for (let k = 0; k<length;k++){ //making all the slots  BEFORE the invalid one red
                                        if (k<=i)
                                            if (gb.tables[+selectable.id[0]+k][+selectable.id[1]]==-4)
                                                gb.tables[+selectable.id[0]+k][+selectable.id[1]]=-5;
                                            else if (gb.tables[+selectable.id[0]+k][+selectable.id[1]]==-2)
                                                gb.tables[+selectable.id[0]+k][+selectable.id[1]]=-3;
                                        else {
                                            if (gb.tables[+selectable.id[0]+k][+selectable.id[1]]==0)break;
                                            else if (gb.tables[+selectable.id[0]+k][+selectable.id[1]]==-2 )gb.tables[+selectable.id[0]+k][+selectable.id[1]]=-3;
                                            else if (gb.tables[+selectable.id[0]+k][+selectable.id[1]]==-4 )gb.tables[+selectable.id[0]+k][+selectable.id[1]]=-5;
                                            
                                        }
                                        }break;}
                            }
                        else if (direction=='horizontal' && +selectable.id[1]+length<11){ //the same as earlier but for direction = 'horizontal
                            if (gb.tables[+selectable.id[0]][+selectable.id[1]+i]==-1)

                                gb.tables[+selectable.id[0]][+selectable.id[1]+i]=-2;
                            else if (gb.tables[+selectable.id[0]][+selectable.id[1]+i]==-4){
                                gb.tables[+selectable.id[0]][+selectable.id[1]+i]=-5
                                
                                for (let k = 0; k<length;k++){
                                    if (k<=i){
                                        if (gb.tables[+selectable.id[0]][+selectable.id[1]+k]==-4)
                                            gb.tables[+selectable.id[0]][+selectable.id[1]+k]=-5;
                                        else if (gb.tables[+selectable.id[0]][+selectable.id[1]+k]==-2)
                                            gb.tables[+selectable.id[0]][+selectable.id[1]+k]=-3;}
                                    else {
                                        if (gb.tables[+selectable.id[0]][+selectable.id[1]+k]==0)break;
                                        else if (gb.tables[+selectable.id[0]][+selectable.id[1]+k]==-2 )gb.tables[+selectable.id[0]][+selectable.id[1]+k]=-3;
                                        else if (gb.tables[+selectable.id[0]][+selectable.id[1]+k]==-4 )gb.tables[+selectable.id[0]][+selectable.id[1]+k]=-5;
                                        
                                    }
                                    }break;
                            }    
                            else if (gb.tables[+selectable.id[0]][+selectable.id[1]+i]==0 ){
                                for (let k = 0; k<length;k++){
                                    if (k<i)
                                        gb.tables[+selectable.id[0]][+selectable.id[1]+k]=-3;}break;}
                                    // else gb.tables[+selectable.id[0]][+selectable.id[1]+k]=-4;}//////////////////////////
                                                        
                        }
                        else if (direction=='perpendicular' && +selectable.id[0]+length>=11){ // if the ship is too long and it crosses the border
                            if (+selectable.id[0]+i<10)
                                gb.tables[(+selectable.id[0]+i)][+selectable.id[1]]=-3;
                        }
                        else if (direction=='horizontal' && +selectable.id[1]+length>=11){ // if the ship is too long and it crosses the border
                            gb.tables[+selectable.id[0]][(+selectable.id[1]+i)]=-3;
                        }

                    }
                    updateView(gb,'.selectdiv',length,direction,next,used)})
                
            }
            else if (gb.tables[i][j] == 0){  //placed
                let selectable = document.createElement('div');
                selectable.setAttribute('style', 'border: 2px solid var(--titleorange);width: 30px;height: 30px;background: blue;')
                selectable.setAttribute('id', `${i}${j}`);
                container.appendChild(selectable);
                blockNeigbours(gb)

            }
            else if (gb.tables[i][j]==1) {  // hit
                let selectable = document.createElement('div');

                selectable.setAttribute('id', `${i}${j}`);
                container.appendChild(selectable);
            }
            else if (gb.tables[i][j]==-2) { //prepared
                let selectable = document.createElement('div');
                selectable.setAttribute('id', `${i}${j}`);
                selectable.setAttribute('style', 'border: 2px solid var(--titleorange);width: 30px;height: 30px;background: var(--prepared);')
                selectable.addEventListener('mouseout', ()=>{ //returning to its previous state
        
                    for (let i =0;i<10;i++){
                        for (let j =0;j<10;j++){
                            if (gb.tables[i][j]==-2) gb.tables[i][j]=-1;    
                        }}
                        updateView(gb,'.selectdiv',length,direction,next,used)})
                selectable.addEventListener('click', ()=> { //placing the ship
                    recentSlots =[]
                    for (let i =0;i<10;i++){
                        for (let j =0;j<10;j++){
                            if (gb.tables[i][j]==-2) {
                                recentSlots.push([i,j]);
                                gb.tables[i][j]=0;    }
                            else if (gb.tables[i][j]==-5) gb.tables[i][j]=-4;
                        }}
                        if (next==true) updateView(gb,'.selectdiv',length-1,direction,false,0); //deciding how long the next ship will be
                        else {
                            if (length==3 && used<0) updateView(gb, '.selectdiv', length, direction,false,used+1);
                            if (length==3 && used==0) updateView(gb, '.selectdiv', length, direction,true,used+1);
                            else if (length==2 && used<1) updateView(gb, '.selectdiv', length, direction,false,used+1)  
                            else if (length==2 && used==1) updateView(gb, '.selectdiv', length, direction,true,0)  
                            else if (length==1 && used<2) updateView(gb, '.selectdiv', length, direction,false,used+1)  
                            else if (length==1 && used==2) updateView(gb, '.selectdiv', length, direction,true,used+1)  
                           
                        }
                        // return 'elo';
                    })
                container.appendChild(selectable);
            }
            else if (gb.tables[i][j]==-3) { // wrong placing
                let selectable = document.createElement('div');
                selectable.setAttribute('id', `${i}${j}`);
                selectable.setAttribute('style', 'border: 2px solid var(--titleorange);width: 30px;height: 30px;background: red;')
                selectable.addEventListener('mouseout', ()=>{
        
                    for (let i =0;i<10;i++){
                        for (let j =0;j<10;j++){
                            if (gb.tables[i][j]==-3) gb.tables[i][j]=-1;    
                            else if (gb.tables[i][j]==-5) gb.tables[i][j]=-4;    
                        }}
                        updateView(gb,'.selectdiv',length,direction,next,used)})
                container.appendChild(selectable);
            }
            else if (gb.tables[i][j]==-5) { // if ship is being placed next to other one
                let selectable = document.createElement('div');
                selectable.setAttribute('id', `${i}${j}`);
                selectable.setAttribute('style', 'border: 2px solid var(--titleorange);width: 30px;height: 30px;background: red;')
                selectable.addEventListener('mouseout', ()=>{
        
                    for (let i =0;i<10;i++){
                        for (let j =0;j<10;j++){
                            if (gb.tables[i][j]==-5) gb.tables[i][j]=-4;    
                            else if (gb.tables[i][j]==-3) gb.tables[i][j]=-1;    
                        }}
                        updateView(gb,'.selectdiv',length,direction,next,used)})
                container.appendChild(selectable);
            }
            else if (gb.tables[i][j]==-4) { //slot preventing from placing ship next to other one 
                let selectable = document.createElement('div');
                selectable.setAttribute('id', `${i}${j}`);
                selectable.setAttribute('style', 'border: 2px solid var(--titleorange);width: 30px;height: 30px;')
                selectable.addEventListener('mouseover', ()=>{
                    

                    for (let i =0;i<length;i++){ // showing to the player that they cannot place the ship next to other one
                        if (direction=='perpendicular' && +selectable.id[0]+length<11){
                            if (gb.tables[+selectable.id[0]+i][+selectable.id[1]]==-4 ) 
                                gb.tables[+selectable.id[0]+i][+selectable.id[1]]=-5
                            else if (gb.tables[+selectable.id[0]+i][+selectable.id[1]]==-1)
                                gb.tables[+selectable.id[0]+i][+selectable.id[1]]=-3
                            else if (gb.tables[+selectable.id[0]+i][+selectable.id[1]]==0){
                                for (let k =0;k<i;k++)
                                gb.tables[+selectable.id[0]+k][+selectable.id[1]]=-3;
                                break
                            }
                        }
                        else if (direction=='horizontal' && +selectable.id[1]+length<11){
                            if (gb.tables[+selectable.id[0]][+selectable.id[1]+i]==-4) 
                                gb.tables[+selectable.id[0]][+selectable.id[1]+i]=-5
                            else if (gb.tables[+selectable.id[0]][+selectable.id[1]+i]==-1)
                                gb.tables[+selectable.id[0]][+selectable.id[1]+i]=-3 
                            else if (gb.tables[+selectable.id[0]][+selectable.id[1]+i]==0){
                                for (let k =0;k<i;k++)
                                    gb.tables[+selectable.id[0]][+selectable.id[1]+k]=-3; 
                                break; 
                            }
                        }
                        
                    }
                        updateView(gb,'.selectdiv',length,direction,next,used)
                })
                selectable.addEventListener('mouseout',()=>{
                    selectable.setAttribute('style', 'border: 2px solid var(--titleorange);width: 30px;height: 30px;')

                })
                container.appendChild(selectable);
            }
        }
    }
}

function playerPlacing(gb) {
    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    let currentDirection='horizontal'; //setting up the default direction
    let h1 = body.querySelector('.welcome');
    h1.innerText = "Place your ships";
    h1.setAttribute('style', 'font-size:300%;')
    // let back = document.createElement('button');
    // back.innerText = 'Back';
    // back.classList.add('playerButton');
    // back.addEventListener('mouseover', ()=> {
    //     back.setAttribute('style', 'color: #000814; background: #ffe8d6; border:3px solid #000814;')
    // })
    // back.addEventListener('mouseleave', ()=> {
    //     back.setAttribute('style', 'background: #000814; color: #ffe8d6; border: 3px solid #ffe8d6;')
    // })
    // back.addEventListener('click',()=>{
    //     for (let i=0;i<10;i++)
    //         for (let j =0;j<10;j++){
    //             for (let dupa of recentSlots){
    //                 if (equals(dupa,[i,j])) {gb.tables[i][j]=-1;break;}
    //             }
                
    //         }
    //     updateView(gb, '.selectdiv', 4, currentDirection);
        
    // })
    // body.appendChild(back);
    body.setAttribute('style','gap:5vh;')
    removeSomething('.singleAndMulti')
    // let container = document.createElement('div');
    // container.classList.add("selectdiv");
    
    // while (numberOfPlacedSlots!=4)
    let a = updateView(gb, '.selectdiv', 4, currentDirection,true)
    
    // if (a=='elo')
    //     console.log('siema');
    // else console.log('nie')
    let container = document.createElement('div');
    container.classList.add("selectdiv");
    // container.addEventListener("contextmenu", e => e.preventDefault());
    // container.addEventListener('contextmenu', ()=> {
    //     if (direction=='horizontal') direction = 'perpendicular';
    //     else if (direction=='perpendicular') direction = 'horizontal';
    // })
    // body.appendChild(container);
    // for (let i=0;i<10;i++){
    //     for (let j=0;j<10;j++) {
            
    //             let selectable = document.createElement('div');
    //             // selectable.addEventListener('mouseover', ()=>{
    //             //     if (direction=='horizontal'){
                        
    //             //     }
    //             // })
    //             selectable.classList.add('void');
    //             selectable.setAttribute('id', `${i}${j}`);
    //             container.appendChild(selectable);}}
    
    // console.log(gb.tables)
    
    // body.appendChild(container);
    // body.setAttribute('style', 'justify-content:center;')
}


function welcome(){
    let h1 = document.createElement('h1');
    h1.innerText = "Let's play battleship!";
    h1.classList.add('welcome')

    let single = document.createElement('button');
    single.classList.add('playerButton');
    single.innerText = "Start";
    single.addEventListener('mouseover', ()=> {
        single.setAttribute('style', 'color: #000814; background: #ffe8d6; border:3px solid #000814;')
    })
    single.addEventListener('mouseleave', ()=> {
        single.setAttribute('style', 'background: #000814; color: #ffe8d6; border: 3px solid #ffe8d6;')
    })
    single.addEventListener('click', ()=>{
        let playerGameboard = Gameboard();
        playerPlacing(playerGameboard);
    });

    let multi = document.createElement('button');
    multi.classList.add('playerButton')
    multi.innerText = "Multiplayer";
    multi.addEventListener('mouseover', ()=> {
        multi.setAttribute('style', 'color: #000814; background: #ffe8d6; border:3px solid #000814;')
    })
    multi.addEventListener('mouseleave', ()=> {
        multi.setAttribute('style', 'background: #000814; color: #ffe8d6; border: 3px solid #ffe8d6;')
    })
    multi.addEventListener('click', ()=>{});

    let buttons = document.createElement('div');
    buttons.classList.add('singleAndMulti');
    buttons.appendChild(single);
    // buttons.appendChild(multi);

    body.appendChild(h1);
    body.appendChild(buttons);
}

welcome(); //starting the whole process

// for (let i =0;i<10;i++)
    //     for (let j =0;j<10;j++) {
    //         let selectable = document.createElement('div');
    //         selectable.classList.add('selectable')
    //         selectable.addEventListener('mouseover', () => {
    //             if (currenrDirection == "perpendicular"){
    //                 if(j + ship.length < 10){
    //                     for (let k=0;k<ship.length;k++) {
    //                         if (gb.tables[j+k][i]!=-1) return Error
    //                     }
    //                     return "ok"
    //                 }
    //                 else return Error;
    //             }
    //             else if (direction=="horizontal"){
    //                 if (i+ship.length<10) {
    //                     for (let k=0;k<ship.length;k++) {
    //                         if (gb.tables[j][i+k]!=-1) return Error;
    //                     return "ok"
    //                        }   }
    //                 else return Error;
                
    //             }
    //             else return Error;
    //         })