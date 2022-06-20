import {Ship, Gameboard, Computer, removeSomething} from './logic.js';

const body = document.querySelector('body');

function isPlacingCorrect(gb,slots, direction) {

}

function updateView(gb,dupa, length, direction){
    // let a = document.querySelectorAll('.void')
    // container.removeChild(a);
    let a = document.querySelector(dupa);
    if (a!=null) a.remove();
    // let b = document.querySelectorAll('.placed')
    // container.removeChild(b);
    // removeSomething('.hit');
    // gb.tables[2][3] = 0;
    let container = document.createElement('div');
    container.classList.add("selectdiv");
    container.addEventListener('contextmenu', ()=> {
        if (direction=='horizontal') direction = 'perpendicular';
        else if (direction=='perpendicular') direction = 'horizontal';
    })
    body.appendChild(container);
    for (let i=0;i<10;i++){
        for (let j=0;j<10;j++) {
            if (gb.tables[i][j]==-1) {
                let selectable = document.createElement('div');
                // selectable.addEventListener('mouseover', ()=>{
                //     if (direction=='horizontal'){
                        
                //     }
                // })
                selectable.classList.add('void');
                selectable.setAttribute('id', `${i}${j}`);
                container.appendChild(selectable);
                
                selectable.addEventListener('mouseover', ()=>{
                    
                    for (let i =0;i<length;i++){
                        if (direction=='perpendicular' && +selectable.id[0]+length<11){
                            if (gb.tables[+selectable.id[0]+i][+selectable.id[1]]==-1)
                                gb.tables[+selectable.id[0]+i][+selectable.id[1]]=-2;
                            else 
                                gb.tables[+selectable.id[0]+i][+selectable.id[1]]=-3;}
                        else if (direction=='horizontal' && +selectable.id[1]+length<11){
                            if (gb.tables[+selectable.id[0]][+selectable.id[1]+i]==-1)
                                gb.tables[+selectable.id[0]][+selectable.id[1]+i]=-2;
                            else if (gb.tables[+selectable.id[0]][+selectable.id[1]+i]==0)
                                for (let k = 0; k<length;k++)
                                    if (k<i)
                                        gb.tables[+selectable.id[0]][+selectable.id[1]+k]=-3;
                                    else gb.tables[+selectable.id[0]][+selectable.id[1]+k]=-4;}//////////////////////////
                        else if (direction=='perpendicular' && +selectable.id[0]+length>=11){
                            if (+selectable.id[0]+i<10)
                                gb.tables[(+selectable.id[0]+i)][+selectable.id[1]]=-3;
                        }
                        else if (direction=='horizontal' && +selectable.id[1]+length>=11){
                            gb.tables[+selectable.id[0]][(+selectable.id[1]+i)]=-3;
                        }

                    }
                    updateView(gb,'.selectdiv',length,direction)})
                
            }
            else if (gb.tables[i][j] == 0){
                let selectable = document.createElement('div');
                selectable.setAttribute('style', 'border: 2px solid var(--titleorange);width: 30px;height: 30px;background: blue;')
                selectable.setAttribute('id', `${i}${j}`);
                container.appendChild(selectable);
                // return "placed"
            }
            else if (gb.tables[i][j]==1) {
                let selectable = document.createElement('div');

                selectable.setAttribute('id', `${i}${j}`);
                container.appendChild(selectable);
            }
            else if (gb.tables[i][j]==-2) {
                let selectable = document.createElement('div');
                selectable.setAttribute('id', `${i}${j}`);
                selectable.setAttribute('style', 'border: 2px solid var(--titleorange);width: 30px;height: 30px;background: var(--prepared);')
                selectable.addEventListener('mouseout', ()=>{
        
                    for (let i =0;i<10;i++){
                        for (let j =0;j<10;j++){
                            if (gb.tables[i][j]==-2) gb.tables[i][j]=-1;    
                        }}
                        updateView(gb,'.selectdiv',length,direction)})
                selectable.addEventListener('click', ()=> {
                    for (let i =0;i<10;i++){
                        for (let j =0;j<10;j++){
                            if (gb.tables[i][j]==-2) gb.tables[i][j]=0;    
                        }}
                        updateView(gb,'.selectdiv',length,direction)})
                container.appendChild(selectable);
            }
            else if (gb.tables[i][j]==-3) {
                let selectable = document.createElement('div');
                selectable.setAttribute('id', `${i}${j}`);
                selectable.setAttribute('style', 'border: 2px solid var(--titleorange);width: 30px;height: 30px;background: red;')
                selectable.addEventListener('mouseout', ()=>{
        
                    for (let i =0;i<10;i++){
                        for (let j =0;j<10;j++){
                            if (gb.tables[i][j]==-3) gb.tables[i][j]=-1;    
                        }}
                        updateView(gb,'.selectdiv',length,direction)})
                container.appendChild(selectable);
            }
            else if (gb.tables[i][j]==-4) {
                let selectable = document.createElement('div');
                selectable.setAttribute('id', `${i}${j}`);
                selectable.setAttribute('style', 'border: 2px solid var(--titleorange);width: 30px;height: 30px;background: red;')
                selectable.addEventListener('mouseout', ()=>{
        
                    for (let i =0;i<10;i++){
                        for (let j =0;j<10;j++){
                            if (gb.tables[i][j]==-4) gb.tables[i][j]=0;    
                        }}
                        updateView(gb,'.selectdiv',length,direction)})
                container.appendChild(selectable);
            }
        }
    }
}

function playerPlacing(name,gb) {
    
    let currentDirection='horizontal';
    let h1 = body.querySelector('.welcome');
    h1.innerText = "Place your ships";
    h1.setAttribute('style', 'font-size:300%;')
    body.setAttribute('style','gap:12vh;')
    removeSomething('.singleAndMulti')
    // let container = document.createElement('div');
    // container.classList.add("selectdiv");
    

    updateView(gb, '.selectdiv', 4, currentDirection);
    
    
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
    single.innerText = "Singleplayer";
    single.addEventListener('mouseover', ()=> {
        single.setAttribute('style', 'color: #000814; background: #ffe8d6; border:3px solid #000814;')
    })
    single.addEventListener('mouseleave', ()=> {
        single.setAttribute('style', 'background: #000814; color: #ffe8d6; border: 3px solid #ffe8d6;')
    })
    single.addEventListener('click', ()=>{
        let playerGameboard = Gameboard();
        playerPlacing("dupa",playerGameboard );
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
    buttons.appendChild(multi);

    body.appendChild(h1);
    body.appendChild(buttons);
}

welcome();

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