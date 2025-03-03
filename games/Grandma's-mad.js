/*

@title: Grandma's mad
@author:Agapie Patrick 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const barrel= "b"
const zombie= "z"
const wall= "w"
const grass= "g"
const finish= "f"
const niece= "n"
const rock= "r"
const zombie2= "a"


setLegend(
  [ player, bitmap`
4444444L1L444444
4444444L11L44444
444444L999L14444
444444L090LL4444
4444444939LL4444
44444444944L4444
44444444HH444444
444444488HH44444
4444448898H44444
4444448898H44444
4444444898H44444
4444444888H44444
4444444777444444
4444444777444444
4444444777444444
444444CC4C444444` ],
  [ barrel, bitmap`
4444444444444444
4444444444444444
4411111111111144
44C99CC99CC99C44
4CC99CC99CC99CC4
4CC99CC99CC99CC4
4111111111111114
4CC99CC99CC99CC4
4CC99CC99CC99CC4
4CC99CC99CC99CC4
4111111111111114
4CC99CC99CC99CC4
4CC99CC99CC99CC4
44C99CC99CC99C44
4411111111111144
4444444444444444` ],
  [ zombie, bitmap`
4444444444444444
44444DDDDDD44444
44444DDDDDD44444
44444D3DD3D44444
44444DDDDDD44444
44444D3323D44444
44444DD33DD44444
4444CCCCCCCC4444
444DCCCCCCCCD444
444DCCCCCCCCD444
444DCCCCCCCC6444
444DCCCCCCCCD444
4444555555554444
4444554444554444
4444554444554444
4444004444004444` ],
  [ zombie2, bitmap`
4444444444444444
44444DDDDDD44444
4444400DD0044444
44444D3DD3D44444
44444DDDDDD44444
44444D3333D44444
44444DD33DD44444
4444CCCCCCCC4444
444DCCCCCCCCD444
444DCCCCCCCCD444
444DCCCCCCCCF444
444DCCCCCCCCD444
4444LLLLLLLL4444
4444LL4444LL4444
4444LL4444LL4444
4444004444004444` ],
  [ grass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ],
  [ finish, bitmap`
4444444444444444
4444444444444444
4444475577774444
4444755555577444
4444775775777444
4447757757777744
4447777755757544
4445557577755544
4447575577757554
4445575775755574
4447775557755744
4447577777557744
4444775557577444
4444757575775444
4444475577774444
4444444444444444` ],
  [ niece, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444664444444
4444466664444444
4444444094444444
4444444994444444
4444497777944444
4444447777444444
4402446666444444
4420446446444444
4444444444444444
4444444444444444` ],
  [ rock, bitmap`
4444444444444444
4444444444444444
4444444444444444
44444LLLL11L4444
444LLLLLL11LL444
444LLLLLLL1LL444
4441LLLLLLL11L44
44411LLLLLL11L44
44411LLLLLLLL144
44411LLLLLLLL144
44411LLLLLLLLL44
44111LLLLLLLLLL4
41LLLLLLLLLLLLL4
4LLLLLLLLLLLLLL4
4444444444444444
4444444444444444` ]
);
setBackground(grass) 

setSolids([player,barrel,rock])

let level = 0
const levels = [
  map`
pggbgggrr
gggbgggrf
gggbggrzg
rgbrbbggg
gggggggga
rrrrrrrrr`,
  map`
rrrrrrrr
rpgbzzzr
rggbzzzr
rbgggggb
rbggggfb
rrrraabb`,
  map`
zzazzazzzz
azzzzzzzaz
bbbbbbbbbb
pgggggggfb
bbbbbbbbbb
zazzzzzzza
zzzzzazzzz`,
  map`
bbbbbbbbbb
ggprraaaag
gggrraaaag
gggggrgaag
ggrrrrggrr
ggrggrggrf
ggrrgrrgag
gggggggggg`,
  map`
pbggrrra
gbggggra
gbgaaggz
gbgbfrgz
gbgbgggz
ggggaaaz`,
  map`
rrrrrrrrrrrr
pggggzazzagg
rrrggagggggg
ggrggggggaza
rrrgggrrgazg
rrrgggrrgafg
zzrggazagggg
zzrgaazaaggg`,
  map`
pgggbbbbbg
ggggggbgbb
gggggggggb
gggggggggb
gggggggggb
ggggggggnb
bbbbbbbbbb`
]

currentLevel = levels[level];
setMap(currentLevel),

setPushables({
  [ player ]: []
})
onInput("j", () => {
    setMap(levels[level])
});
onInput("s", () => {
  getFirst(player).y += 1; 
});
onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("a", () => {
    getFirst(player).x -= 1;
});
onInput("w", () => {
    getFirst(player).y -= 1;
});
afterInput(() => {
    const finishCovered = tilesWith(player, finish); 

   
    if (finishCovered.length >= 1) {
        
        level = level + 1;

        
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("you win!", { y: 4, color: color`7` });
        }
    }
});
afterInput(() => {
    const nieceCovered = tilesWith(player, niece); 

    if (nieceCovered.length >= 1) {
        
        level = level + 1;

       
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
addText("you found your niece!", { y: 4, color: color`7` });
        }
    }
});
afterInput(() => {
    
    const zombieCovered = tilesWith(player, zombie); 
    
    
    if (zombieCovered.length > 0) {
        setMap(levels[level])
    }
})
afterInput(() => {
   
    const zombie2Covered = tilesWith(player, zombie2); 
    
    
    if (zombie2Covered.length > 0) {
        setMap(levels[level])
    }
})