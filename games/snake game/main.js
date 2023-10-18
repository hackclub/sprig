let inputDir={x : 0 , y : 0};
const eating= new Audio('SnakeGame/music/food.mp3');
const bg_music= new Audio('SnakeGame/music/music.mp3');
const gameEnd= new Audio('SnakeGame/music/gameover.mp3');
const dir= new Audio('SnakeGame/music/move.mp3');
 let snakeArr=[
   {x:15,y:16}
   ];
let food={x: 5 ,y:3 };
let lastPaint=0;
let speed=5;
let score=0;
let scoreBox=document.querySelector('.score');
function collide(snake){
  //if you  collide in the wall 
  if(snake[0].x>=18||snake[0].x<=0 || snake[0].y>=18||snake[0].y<=0){
    return true;
  }
  //if you collide into yourself
  for(let i=1;i<snake.length;i++)
  {
    if(snake[i].x===snake[0].x && snake[i].y===snake[0].y ){
      return true;
    }
  }
  return false;
}
function gameEngine(){
  //bg_music.play();
  
 box.innerHTML=""; 
 //if you collide;
 if(collide(snakeArr)){
   //bg_music.pause();
   //gameEnd.play();
   inputDir={x: 0,y:0};
   alert("Out huygo lawda !");
    snakeArr = [
      { x: 15, y: 16 }
      ];
   score=0;
   
 }
 
  //Eating the food
  if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
    //eating.play();
    score++;
    scoreBox.innerHTML="score:  "+ score;
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y: snakeArr[0].y+inputDir.y});
    let a=3;
    let b=17;
    food={
      x:Math.round(a+ (b-a)*Math.random()),
      y:Math.round(a+(b-a)*Math.random())
    }
  }
  
 
 //move the snake
 for(let i=snakeArr.length-2;i>=0;i--){
   snakeArr[i+1]={...snakeArr[i]}
 }
 snakeArr[0].x +=inputDir.x;
 snakeArr[0].y +=inputDir.y;
 
  snakeArr.forEach((value,index)=>{
    //snake display;
let snakeElement=document.createElement('div');
  snakeElement.style.gridRowStart=value.y;
  snakeElement.style.gridColumnStart=value.x;
  
  box.appendChild(snakeElement);
  if(index===0){
  snakeElement.classList.add('head');  
  }else{
    snakeElement.classList.add('snake');
  }    
   
  });
  
  
  //display the food 
let foodElement=document.createElement('div');
  foodElement.style.gridRowStart=food.y;
  foodElement.style.gridColumnStart=food.x;
  foodElement.classList.add('food');
  box.appendChild(foodElement);
}
function main(ctime){
  window.requestAnimationFrame(main);
   if((ctime-lastPaint)/1000 <1/speed){
     return;
     
   }
  lastPaint=ctime;
  gameEngine();
}
//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',b =>{
  intputDir={x:0 ,y:1};
  //dir.play();
  switch(b.key){
    
    case "ArrowUp":
      inputDir={x: 0, y:-1 };
      
      break;
    case "ArrowDown":
      inputDir={x: 0, y:1 };
     break;
    case "ArrowLeft":
      inputDir={x: -1, y:0 };
      break;
    case "ArrowRight":
      inputDir={x: 1, y:0 };
      break;
      default:
      break;
  }
}





);
