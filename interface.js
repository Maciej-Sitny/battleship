import {Ship, Gameboard, Computer} from './logic.js';

const body = document.querySelector('body');

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
    single.addEventListener('click', ()=>{});

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