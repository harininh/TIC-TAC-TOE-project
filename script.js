 const boxes =document.querySelectorAll('.box');
const statusTxt=document.querySelector('.status');
const btnRestart=document.querySelector('#restart');
let e="<img src='./E.png.png'> ";
let l="<img src='./L.png.png'> ";

const win=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let options=["","","","","","","","",""];
let currentPlayer=e;
let player="E";
let running=false;
init();
function init(){
boxes.forEach(box=>box.addEventListener('click',boxClick)); 
btnRestart.addEventListener('click',restartGame);
statusTxt.textContent=`${player} Your Turn`;
running=true; 
}

function boxClick(){
    const index=this.dataset.index;
    if(options[index]!="" || !running){
        return;
    }
    updateBox(this,index);
    checkWinner();

}

function updateBox(box,index){
    options[index]=player;
    box.innerHTML=currentPlayer;

}
function changePlayer(){
    player=(player=='E')? "L" : "E";
    currentPlayer=(currentPlayer==e)? l:e;
    statusTxt.textContent=`${player} Your Turn`;
   
}

function checkWinner(){
    let isWon=false;
    for(let i=0;i<win.length;i++){  
        const condition=win[i];//[0,1,2]
        const box1=options[condition[0]];//option of condition is index storing
        const box2=options[condition[1]];
        const box3=options[condition[2]];

        if(box1=="" || box2=="" || box3==""){
            continue;
        }

        if(box1==box2 && box2==box3){
            isWon=true;
            boxes[condition[0]].classList.add('win');
            boxes[condition[1]].classList.add('win');
            boxes[condition[2]].classList.add('win');
        }
    }
   if(isWon){
    statusTxt.textContent=`${player} won..`;
    running=false;

   }else if(!options.includes("")){
statusTxt.textContent=`Game Draw..!`;
running=false;
   }
   else{ 
    changePlayer();
   }

}

function restartGame(){
    options=["","","","","","","","",""];
     currentPlayer=e;
     player="E";
     running=true;
     statusTxt.textContent=`${player} Your Turn`;

     boxes.forEach(box=>{
        box.innerHTML="";
        box.classList.remove('win');
     });
}