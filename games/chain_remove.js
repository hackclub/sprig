
/* 
@title: chain_remove
@author: imcute
@tags: ['endless']
@img: ""
@addedOn: 2023-07-22
*/

    /*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const red="r",blue="b",green="g",cursor="c",bomb="*";

setLegend(
  [ red, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ],
  [ blue, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ],
  [ green, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ bomb, bitmap`
2222222222622262
2222222222266622
2222222220006622
2222222200266622
2222222002622262
2222200000022222
2222000000002222
2222000000002222
2222000000002222
2222000000002222
2222000000002222
2222000000002222
2222200000022222
2222222222222222
2222222222222222
2222222222222222` ],
  [ cursor, bitmap`
................
................
................
........0.......
.......0.0......
......0...0.....
.....0..0..0....
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
................
................
................` ],
)

setSolids([])

function arrayMap(map,pos){
  let m=``;
  for(let i in map){
    for(let j in map[i]){
      if(i==pos.x&&j==pos.y)m+="c";
      else m+=map[i][j];
    }
    m+="\n";
  }
  //console.log(m);
  setMap(m);
}
function restrictPos(pos){
  pos.x=pos.x<0?0:pos.x;
  pos.x=pos.x>=20?19:pos.x;
  pos.y=pos.y<0?0:pos.y;
  pos.y=pos.y>=20?19:pos.y;
}
function checkFloating(grid){
  let flag=false;
  for(let i in grid[0]){
    for(let j = grid.length-2;j>=0;j--){
      if(grid[j+1][i]=="."&&grid[j][i]!="."){
        grid[j+1][i]=grid[j][i];
        grid[j][i]=".";
        //console.log(j+1,i,j,i);
        flag=true;
      }
    }
  }
  if(flag)return checkFloating(grid)
}
function checkMissing(grid){
  for(let i in grid){
    for(let j in grid[i]){
      if(grid[i][j]=="."){
        if(Math.random()<0.02)grid[i][j]="*";
        else grid[i][j]=["r","g","b"][Math.floor(Math.random()*3)];
      }
    }
  }
}
function rootBlock(grid,pos){
  try{
    grid[pos.x][pos.y][0]
  }catch(e){
    //out of bounds,ignore
    return
  }
  removeBlock(grid,pos,grid[pos.x][pos.y]);
}
function removeBlock(grid,pos,type){
  //console.log(pos.x,pos.y);
  if(type==".")return
  grid[pos.x][pos.y]=".";
  for(let i of [[-1,0],[1,0],[0,1],[0,-1]]){
    if(grid[pos.x+i[0]] && grid[pos.x+i[0]][pos.y+i[1]]==type){
      removeBlock(grid,{x:pos.x+i[0],y:pos.y+i[1]},type);
    }else if(grid[pos.x+i[0]] && grid[pos.x+i[0]][pos.y+i[1]]==bomb){
      for(let xo=-1;xo<=1;xo++){
        for(let yo=-1;yo<=1;yo++){
          //console.log(pos.x+i[0]+xo,pos.y+i[1]+yo);
          if(xo!=0||yo!=0)rootBlock(grid,{x:pos.x+i[0]+xo,y:pos.y+i[1]+yo});
          else grid[pos.x+i[0]][pos.y+i[1]]=".";
        }
      }
    }
  }
}
const pos={x:0,y:0};
const grid=Array(20).fill(0).map(e=>Array(20).fill("."));
checkMissing(grid);
arrayMap(grid,pos);

setPushables({
  [ red ]: []
})

onInput("w", () => {
  pos.x--;
})
onInput("s", () => {
  pos.x++;
})
onInput("a", () => {
  pos.y--;
})
onInput("d", () => {
  pos.y++;
})
onInput("k", () => {
  rootBlock(grid,pos);
})

afterInput(() => {
  restrictPos(pos);
  checkFloating(grid);
  checkMissing(grid);
  //console.log(grid);
  arrayMap(grid,pos);
})
