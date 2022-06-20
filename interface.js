import {Ship, Gameboard, Computer, removeSomething} from './logic.js';

const body = document.querySelector('body');

function isPlacingCorrect(gb,slots, direction) {

}

function updateView(gb,dupa){
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
            
                    for (let i =0;i<4;i++){
                        gb.tables[+selectable.id[0]+i][selectable.id[1]]=-2;
                        // console.log(gb.tables);
                    }
                    updateView(gb,'.selectdiv')})
                
            }
            else if (gb.tables[i][j] == 0){
                let selectable = document.createElement('div');
                selectable.classList.add('placed');
                selectable.setAttribute('id', `${i}${j}`);
                container.appendChild(selectable);
            }
            else if (gb.tables[i][j]==1) {
                let selectable = document.createElement('div');
                selectable.classList.add('hit');
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
                        updateView(gb,'.selectdiv')})
                container.appendChild(selectable);
            }
        }
    }
}

function playerPlacing(name,gb) {
    
    let currenrDirection='horizontal';
    let h1 = body.querySelector('.welcome');
    h1.innerText = "Place your ships";
    h1.setAttribute('style', 'font-size:300%;')
    body.setAttribute('style','gap:12vh;')
    removeSomething('.singleAndMulti')
    // let container = document.createElement('div');
    // container.classList.add("selectdiv");
    // 
    updateView(gb, '.selectdiv');
    
    let voids = document.querySelectorAll('.void');
    voids.forEach(v => {
        // console.log(v.id);
        // v.addEventListener('mouseleave', ()=>{

        //     for (let i =0;i<4;i++){
        //         gb.tables[+v.id[0]+i][v.id[1]]=-1;
        //         console.log('elo')
        //     }
        //     updateView(gb, '.selectdiv');
        // })
        // v.addEventListener('mouseover', ()=>{
            
        //     for (let i =0;i<4;i++){
        //         gb.tables[+v.id[0]+i][v.id[1]]=-2;
        //         console.log(gb.tables);
        //     }
        //     updateView(gb, '.selectdiv');
        // })
        
    })
    
    // console.log(gb.tables)
    updateView(gb, '.selectdiv');
    
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