const SNAKE="s"
const FOOD="f"
const EMPTY="e"

setLegend(
  [SNAKE, bitmap`
..3333..
.322223.
.322223.
..3333..
..3..3..
..3..3..
..3..3..
..3..3..`],
  [FOOD, bitmap`
........
..4444..
..4444..
..4444..
..4444..
........
........
........`],
  [EMPTY, bitmap`
................
................
................
................
................
................
................
................`]
)

setMap(map`
eeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeee
`)
setSolids([SNAKE])

let snake=[{x:10,y:8}]
let dir={x:0,y:0}
let food={x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*16)}
addSprite(food.x,food.y,FOOD)
let gameOver=false

function moveSnake(){
  if(gameOver)return
  const head={x:snake[0].x+dir.x,y:snake[0].y+dir.y}
  if(head.x<0||head.x>19||head.y<0||head.y>15||snake.some(s=>s.x===head.x&&s.y===head.y)){gameOver=true;return}
  snake.unshift(head)
  if(head.x===food.x&&head.y===food.y){
    food={x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*16)}
    addSprite(food.x,food.y,FOOD)
  } else {snake.pop()}
}

function draw(){
  clearText()
  getAll(SNAKE).forEach(s=>s.remove())
  snake.forEach(s=>addSprite(s.x,s.y,SNAKE))
}

onInput("w",()=>{if(dir.y!==1)dir={x:0,y:-1}})
onInput("s",()=>{if(dir.y!==-1)dir={x:0,y:1}})
onInput("a",()=>{if(dir.x!==1)dir={x:-1,y:0}})
onInput("d",()=>{if(dir.x!==-1)dir={x:1,y:0}})
onInput("r",()=>{snake=[{x:10,y:8}];dir={x:0,y:0};gameOver=false;getAll(FOOD).forEach(f=>f.remove());food={x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*16)};addSprite(food.x,food.y,FOOD)})

setInterval(()=>{
  if(gameOver)return
  moveSnake()
  draw()
},200)
