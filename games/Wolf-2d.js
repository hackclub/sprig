/* TODO

*/


const verbose = false

var dead = 0

setLegend(             // Assets 
    ['p',bitmap`
.....000000.....
....00222200....
....02200220....
.....000000.....
4444444444444444
4.440000000044.4
4.440444444044.4
4.440444444044.4
4.440444444044.4
4.440444444044.4
4..4444..4444..4
4...44....44...4
4....4....4....4
.....4....4.....
....44....44....
...444....444...`],
    ['g',bitmap`
....00000000....
...0666666660...
...0666666660...
....00066000....
0000000660000000
0666666666666660
0700666666660660
0700666666660060
0600066666600060
0600066666600060
0660000000000660
0660066666600660
0000066666600000
....06600660....
....06600660....
.....00..00.....`],
    ['w',bitmap`
        HHHHHHHHHHHHHHHH
        HHHHHHHHHHHHHHHH
        HHHHHHHHHHHHHHHH
        HHHHHHHHHHHHHHHH
        HHHHHHHHHHHHHHHH
        HHHHHHHHHHHHHHHH
        HHHHHHHHHHHHHHHH
        HHHHHHHHHHHHHHHH
        HHHHHHHHHHHHHHHH
        HHHHHHHHHHHHHHHH
        HHHHHHHHHHHHHHHH
        HHHHHHHHHHHHHHHH
        HHHHHHHHHHHHHHHH
        HHHHHHHHHHHHHHHH
        HHHHHHHHHHHHHHHH
        HHHHHHHHHHHHHHHH`],
    ['c',bitmap`...`],
    ['b',bitmap`
        CCCCCCCCCCCCCCCC
        CCCCCCCCCCCCCCCC
        CCCCCCCCCCCCCCCC
        CCCCCCCCCCCCCCCC
        CCCCCCCCCCCCCCCC
        CCCCCCCCCCCCCCCC
        CCCCCCCCCCCCCCCC
        CCCCCCCCCCCCCCCC
        CCCCCCCCCCCCCCCC
        CCCCCCCCCCCCCCCC
        CCCCCCCCCCCCCCCC
        CCCCCCCCCCCCCCCC
        CCCCCCCCCCCCCCCC
        CCCCCCCCCCCCCCCC
        CCCCCCCCCCCCCCCC
        CCCCCCCCCCCCCCCC`],
    ['s',bitmap`
        0000000000000000
        0000000000000000
        0000000000000000
        0000000000002000
        0000000000000000
        0000000000000000
        0200000000000000
        0000000000000000
        0000000000000000
        0000000200000000
        0000000000000000
        0000000000000000
        0000000000000000
        0000000000000000
        0000000000000000
        0000000000000000`]
)
var maps = [           // Maps               // its been about a day, and i just realized that the map is actually the tiles, and not just all the tiles compiled onto a img
    map`
ssssssssss
ssssssssss
ssssssssss
ssssssssss
ssssssssss
ssssssssss`,                // main menu
    map`
..........
..........
..........
..........
..........
..........`                 // lvl 1
]
function clear(){
    console.log('\n');console.log('\n');console.log('\n');console.log('\n');console.log('\n');console.log('\n');console.log('\n');console.log('\n');console.log('\n');console.log('\n');console.log('\n');
}
function mainMenuHandler(){
    setMap(maps[0])
    addText("Press Anything",{
        x:1,
        y:3,
        color: color`3`
    })
    addText("to Play",{
        x:1,
        y:4,
        color: color`3`
    })
    var check = false;
    function checker(){
        if (!check){
            check = true
            run()
        }
    }
    onInput('w',checker)  // left hand controls
    onInput('a',checker)
    onInput('s',checker)
    onInput('d',checker)
  
    onInput('i',checker)  // right hand controls
    onInput('j',checker)
    onInput('k',checker)
    onInput('l',checker)
}

class mapcreator{
    constructor(){

    }
    walls = ()=>{
        for (let x=0;x<10;x++){
            for (let y=0;y<6;y++){
                if (x==0||x==9||y==0||y==5){
                    if (!(x==4||x==5)){
                        addSprite(x,y,'w')
                    } else{
                        console.log(x,y)
                        addSprite(x,y,'c')
                    }
                }
            }
    }
    }
}

var rooms=[
    [
        0,
        0,
        0,
        0
    ]
]

function spawn(r){
    r = Math.abs(r)
    console.log(`Room: ${r}. Spawn Guards`) // FIRST part of script, removes all previous bots
    var tiles = getAll('g')

    var p = getFirst('p')
    var x = p.x
    var y = p.y
    tiles.forEach(tile=>{
        var sprites = getTile(tile.x,tile.y)
        p.x = 1
        p.y = 1
        if (sprites.includes('p')){
            p.x += 1
        }
        clearTile(tile.x,tile.y)
        addSprite(tile.x,tile.y,'b')
    })
    p.x = x
    p.y = y

    if (rooms.length > r){
        r = Math.abs(r)
        console.log(`length: ${rooms.length}, r: ${r}`)
        for (var i = 0; i < 4; i++){
            if (rooms[r-1][i] == 1){                       //this line is cursed. wtf.
                addSprite(1,i+1,'g')
            }
        }
    } else{
        function rand(chance){
            var num = Math.random()
            if (num<=chance){
                return 1;
            } else{
                return 0;
            }
        }
        var list; // creates the list to be appended

        const distance = r      // creates the chance for a guard to spawn per tile
        const baseChance = 0.05
        const maxChance = 0.5
        const scale = 0.05

        const chance = Math.min(baseChance + distance * scale, maxChance) // the actual chance
        console.log(chance*100+'%')

        list = [
            rand(chance),
            rand(chance),
            rand(chance),
            rand(chance)
        ]

        const count = list.filter(element => element === 1).length;

        if (count<=1&&r>=5){
            list = [
                rand(chance+.2),
                rand(chance+.2),
                rand(chance+.2),
                rand(chance+.2)
            ]
        }

        if (count<1&&r>=2){
            list = [
                rand(chance+.2),
                rand(chance+.2),
                rand(chance+.2),
                rand(chance+.2)
            ]
        }

        if (r>=10){
            list = [
                1,
                1,
                1,
                1
            ]
        }

        console.log(list.toString())

        for (var i=0;i<=4;i++){
            if (list[i]==1){
                addSprite(1,i+1,'g')
            }
        }

        rooms.push(list)
    }
    moveGuards()
}

function kill(){
    console.log('the user has been killed :(')
    dead = 1
    var x;
    var y;
    var p = getFirst('p')
    x = p.x
    y = p.y

    clearTile(p.x,p.y)
    addSprite(x,y,'b')
    addSprite(x,y,'g')
}

var guardX = 1;
var direction = 1; // 1 = forward, -1 = backward
function moveGuards() {
    getAll('g').forEach(guard => {
        guard.x = Math.abs(guardX);
    });
    if (guardX === 8) {
        direction = -1;
    } else if (guardX === 1 && direction === -1) {
        direction = 1;
    }
    guardX += direction;

    if (checkGuardsChecking()){
        kill()
    }
}


function checkGuardsChecking(){
    var tiles;
    tiles = tilesWith('g','p')
    if (tiles.length>=1){
        return true
    }
    return false
}

function run(){           // the actual start function 

    var tick = setInterval(() => { // super duper cool tick
        if (dead != 1){
            moveGuards()
        }
    }, 350)

    var room = 0
    var inTeleport = false

    const mapper = new mapcreator()
    mapper.walls()

    setSolids(['p','w'])
    clearText()
    console.log('run')
    for (let x=0;x<10;x++){
        for (let y=0;y<6;y++){
            addSprite(x,y,'b')
        }
    }

    addSprite(1,1,'p'); var p = getFirst('p'); // gets/sets the p var to the player after creation
    
    var x;       // movement controller
    var y;
    (function(){
        onInput('w',()=>{          // left hand controls
            if (dead == 1) return;
            y = p.y
            p.y-=1
            if (p.y == y){
                if (inTeleport){
                    if (p.y == 0){
                        p.y = 5
                        room+=1
                        spawn(room)
                    }
                }
                return
            };
            console.log('unique movement y' + p.y)
        })
        onInput('a',()=>{
            if (dead == 1) return;
            x = p.x
            p.x-=1
            if (p.x == x) return;
            console.log('unique movement x' + p.x)
        })
        onInput('s',()=>{
            if (dead == 1) return;
            y = p.y
            p.y+=1
            if (p.y == y){
                if (inTeleport){
                    if (p.y == 5){
                        p.y = 0
                        room-=1
                        spawn(room)
                    }
                }
                return
            };
            console.log('unique movement y' + p.y)
        })
        onInput('d',()=>{
            if (dead == 1) return;
            x = p.x
            p.x+=1
            if (p.x == x) return;
            console.log('unique movement x' + p.x)
        })
    })()

    afterInput(()=>{
        if (checkGuardsChecking()) kill();
        var tiles = tilesWith('p','c')
        tiles = tiles.length

        if (tiles != 1){inTeleport = false; return};
        if (!inTeleport){
            inTeleport = true
        }
    })
}

mainMenuHandler()