
/*
    @title: jumpgame!
    @author: darthkenobi2407
    @description: an endless runner where your aim to to maxx out your score and avoid hitting obstacles!!
    @tags: ['jump', 'run', 'endless']
    @addedOn: 2026-10-18

*/

//jumpgame! an endless runner where your aim to to maxx out your score and avoid hitting obstacles
// use A and D to move left and rigt!


setLegend(
  // this is the player sprite
  ["p", bitmap`
................
................
...LLLLLLLL.....
...L222222L.....
...L2L22L2L.....
...LLLLLLLL.....
0000843060000...
...0123450......
...0678910......
....01090.......
....0.0.0.......
................
................
................
................
................`],

  // tree spirte
      ["t", bitmap`
....DDDDD.......
...DDDDDDD......
..DDDDDDDDD.....
..DDDDDDDDD.....
.DDDDDDDDDDD....
.DDDDDDDDDDD....
..DDDDDDDDD.....
....LLLL........
....LLLL........
....LLLL........
....LLLL........
....LLLL........
....LLLL........
....LLLL........
....LLLL........
................`],
     // rock
  ["r", bitmap`
................
................
...LLLLLLLL.....
..L11111111L....
..L11111111L....
..L11111111L....
..L11111111L....
..L11111111L....
...LLLLLLLL.....
................
................
................
................
................
................
................`],

        // grouynd
["g", bitmap`
1111122222233333
1111122222233333
1111122222233333
1111122222233333
1111122222233333
1111122222233333
1111122222233333
1111122222233333
1111122222233333
1111122222233333
1111122222233333
1111122222233333
1111122222233333
1111122222233333
1111122222233333
1111122222233333`]
);

      setMap(map`
gggggggggg
gggggggggg
gggggggggg
gggggggggg
gggggggggg
gggggggggg
gggggggggg
gggggggggg`);

const lane_positions=[3,5,7];
        const playerrow=4;
const fstobsrow=0;
      const lstobsrow=5;

let currentlane=1;
let treesandrocks=[];
      let score=0;
let gameends=false;
let obsmovetimer=0;
        let obsspawntimer=0;
let scorecounttimer=0;

addSprite(lane_positions[currentlane],playerrow,"p");



onInput("a",()=>{
        if(gameends)return;
  if(currentlane>0){
            currentlane--;
      getFirst("p").x=lane_positions[currentlane];
  }
});

onInput("d",()=>{ if(gameends)return;
      if(currentlane<2){
  currentlane++;
            getFirst("p").x=lane_positions[currentlane]; }
});

      onInput("j",()=>{
if(gameends)startoved();
      });

function addrandobs(){
const obslane=Math.floor(Math.random()*3);
        const obstype=Math.random()<0.5?"t":"r";
  addSprite(lane_positions[obslane],fstobsrow,obstype);
            treesandrocks.push({obslane,obsrow:fstobsrow,obstype});
}

      function movedown(){
const rmts=[];
for(let i=0;i<treesandrocks.length;i++){
            const obs=treesandrocks[i];
      const sprites=getAll(obs.obstype);
  for(const s of sprites){
            if(s.x===lane_positions[obs.obslane]&&s.y===obs.obsrow){
      s.remove();
                  break;
      }
  }
            obs.obsrow++;
if(obs.obsrow>lstobsrow){
      rmts.push(i);
            }else{
  addSprite(lane_positions[obs.obslane],obs.obsrow,obs.obstype);
      }
}
        for(let i=rmts.length-1;i>=0;i--){
treesandrocks.splice(rmts[i],1);
            }
}

function hitobs(){
      for(const obs of treesandrocks){
if(obs.obsrow===playerrow&&obs.obslane===currentlane){
            return true;
      }
}
        return false;
}

      function startoved(){
for(const obs of treesandrocks){
  const sprites=getAll(obs.obstype);
            for(const s of sprites){
      if(s.x===lane_positions[obs.obslane]&&s.y===obs.obsrow){
                  s.remove();
            break;
      }
            }
}
treesandrocks=[];
        score=0;
currentlane=1;
      gameends=false;
obsmovetimer=0;
            obsspawntimer=0;
scorecounttimer=0;
      getFirst("p").x=lane_positions[currentlane];
getFirst("p").y=playerrow;
        clearText();
addText("0",{x:1,y:0,color:color`2`});
}

setInterval(()=>{
      if(gameends)return;
scorecounttimer++;
        if(scorecounttimer>=5){
score++;
      scorecounttimer=0;
            addText(`${score}`,{x:1,y:0,color:color`2`});
}
  obsspawntimer++;
        const spwndelay=Math.max(8,20-Math.floor(score/5));
if(obsspawntimer>=spwndelay){
      addrandobs();
            obsspawntimer=0;
}
obsmovetimer++;
      if(obsmovetimer>=6){
  movedown();
            obsmovetimer=0;
}
if(hitobs()){
      gameends=true;
addText("game over :(\nbetter luck\n next time ",{x:4,y:2,color:color`5`});
            addText(`\n\n\nScore: ${score}`,{x:1,y:3,color:color`5`});
      addText("\n\n\n\npress j to restart",{x:1,y:4,color:color`5`});
}
},100);
