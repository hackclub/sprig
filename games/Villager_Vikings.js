
/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Villager Vikings
@author: D.M.R
@tags: ['attack']
@addedOn: 2024-08-15
🎮 CONTROLS:
  Begining controls:
	S-To watch the story
	L-To start the first level
  Battle controls:
	I, J, K, L - Use these to move around
	W-Spawns morgul
	A-Spawns knight
	D-Spawns dino
Instructions and Story:
	You live in a world packed with monsters. They include Morguls, Dinos, 
	and Bolts to name a few. Some have joined the good side and have helped
	defend the kingdom of Norgal against its enemys. But! One day a great power,
	Kharaz the Red, transforms himself into a being known only as "The Center".
	The Center can control and direct all evil monsters, giving him enormous power.
	He stormed the castle and killed the king. Upon hearing this you, the son of the king,
	journey off to find a way of defeating the Center. You come to an ancient place and,
	in it, a strange gem. Suddenly the energy of monsters is all around you!
	You are given the powers of "The Spawning Stone", the ability to create good monsters.
	Determined to save Norgal, you go to defeat "The Center"!

	
	The objective is to defeat the village and reach "The Center". You use the keys to
	spawn monsters.They will immediatly start attacking the enemy. 
 	Once you or one of your monsters reach "The Center",you will have beat the level. 
	However, beware! when the timer runs out "The Center" will unlock his last power and 
	destroy Norgal!
   P.S: Look for 'Hack-Note:' in the comments to see how to add new levels and characters!
*/
idDic = new Map()
function take(list, index){
  return list.slice(0, index).concat(list.slice(index + 1));
}
function new_id(id_user){
  let ids = idDic.get(id_user);
  if (ids.length == 0){
    ids.push(0)
    idDic.set(id_user, ids)
    return 0
  }
  ids.push(1+ids[ids.length-1]);
  idDic.set(id_user, ids)
  return ids.length-1;
}
function remove_id(id_user, id){
  let ids = idDic.get(id_user);
  ids = take(ids, id);
  for (let admin in ids.slice(id)){
    ids[admin+id+1] -= 1;
  }
  idDic.set(id_user, ids);
}
function get_id(id_user, id, list){
  let ids = idDic.get(id_user);
  return list[ids[id]];
}
idDic.set("hurt", []);

function sleeper(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(ms){
  await sleeper(ms);
}

const startMusic = tune`
333.3333333333333: G4/333.3333333333333 + D4~333.3333333333333,
333.3333333333333: B4/333.3333333333333 + F4~333.3333333333333,
333.3333333333333: C5/333.3333333333333 + G4~333.3333333333333,
333.3333333333333: B4/333.3333333333333 + F4~333.3333333333333,
333.3333333333333: G4/333.3333333333333 + D4~333.3333333333333,
333.3333333333333: B4/333.3333333333333 + F4~333.3333333333333,
333.3333333333333: C5/333.3333333333333 + G4~333.3333333333333,
333.3333333333333: D5-333.3333333333333 + A4^333.3333333333333,
333.3333333333333: F5-333.3333333333333 + C5^333.3333333333333,
333.3333333333333: G5-333.3333333333333 + D5^333.3333333333333,
333.3333333333333: F5-333.3333333333333 + C5^333.3333333333333,
333.3333333333333: D5-333.3333333333333 + A4^333.3333333333333,
333.3333333333333: F5~333.3333333333333 + C5/333.3333333333333,
333.3333333333333: F5~333.3333333333333 + C5/333.3333333333333,
333.3333333333333: F5~333.3333333333333 + C5/333.3333333333333,
333.3333333333333: G5/333.3333333333333 + D5~333.3333333333333,
333.3333333333333: F5/333.3333333333333 + C5~333.3333333333333,
333.3333333333333: D5-333.3333333333333 + A4^333.3333333333333,
333.3333333333333,
333.3333333333333: F5-333.3333333333333 + C5^333.3333333333333,
333.3333333333333: D5^333.3333333333333 + A4-333.3333333333333,
333.3333333333333: C5~333.3333333333333 + G4/333.3333333333333,
333.3333333333333,
333.3333333333333: B4^333.3333333333333 + F4-333.3333333333333,
333.3333333333333: G4^333.3333333333333 + D4^333.3333333333333,
333.3333333333333: G4^333.3333333333333 + D4^333.3333333333333,
333.3333333333333: G4~333.3333333333333 + D4~333.3333333333333,
333.3333333333333: G4~333.3333333333333 + D4~333.3333333333333,
333.3333333333333: G4~333.3333333333333 + D4~333.3333333333333,
333.3333333333333,
333.3333333333333: C4-333.3333333333333 + B5^333.3333333333333 + E5~333.3333333333333 + G4/333.3333333333333,
333.3333333333333`
const levelMusic = [ tune`
179.64071856287424: F5^179.64071856287424 + D5~179.64071856287424,
179.64071856287424: G5^179.64071856287424 + E5~179.64071856287424,
179.64071856287424: F5^179.64071856287424 + D5~179.64071856287424,
179.64071856287424: E5^179.64071856287424 + C5~179.64071856287424,
179.64071856287424: F5^179.64071856287424 + D5~179.64071856287424,
179.64071856287424: E5^179.64071856287424 + C5~179.64071856287424,
179.64071856287424: D5^179.64071856287424 + B4~179.64071856287424,
179.64071856287424: E5^179.64071856287424 + C5~179.64071856287424,
179.64071856287424: D5^179.64071856287424 + B4~179.64071856287424,
179.64071856287424: E5^179.64071856287424,
179.64071856287424: C5^179.64071856287424,
179.64071856287424: E5^179.64071856287424,
179.64071856287424: A4~179.64071856287424 + F4~179.64071856287424,
179.64071856287424: A4~179.64071856287424 + F4~179.64071856287424,
179.64071856287424: A4~179.64071856287424 + F4~179.64071856287424,
179.64071856287424,
179.64071856287424: C5-179.64071856287424,
179.64071856287424: D5-179.64071856287424,
179.64071856287424: C5-179.64071856287424,
179.64071856287424: B4-179.64071856287424,
179.64071856287424: C5-179.64071856287424,
179.64071856287424: B4-179.64071856287424,
179.64071856287424: A4-179.64071856287424,
179.64071856287424: B4-179.64071856287424,
179.64071856287424: A4-179.64071856287424,
179.64071856287424: F4/179.64071856287424 + C4/179.64071856287424,
179.64071856287424: F4/179.64071856287424 + C4/179.64071856287424,
179.64071856287424: F4/179.64071856287424 + C4/179.64071856287424,
179.64071856287424,
179.64071856287424: F5^179.64071856287424,
179.64071856287424: G5^179.64071856287424,
179.64071856287424: F5^179.64071856287424`, 
                    tune`
461.53846153846155: C4^461.53846153846155 + A5-461.53846153846155,
461.53846153846155: C4^461.53846153846155,
461.53846153846155: E4^461.53846153846155,
461.53846153846155: D4^461.53846153846155,
461.53846153846155: E4^461.53846153846155,
461.53846153846155: F4^461.53846153846155,
461.53846153846155: A4^461.53846153846155,
461.53846153846155: G4^461.53846153846155 + D5-461.53846153846155,
461.53846153846155: F4^461.53846153846155,
461.53846153846155: E4^461.53846153846155,
461.53846153846155: D4^461.53846153846155,
461.53846153846155: E4^461.53846153846155,
461.53846153846155: D4^461.53846153846155,
461.53846153846155: C4^461.53846153846155 + G4-461.53846153846155,
461.53846153846155: C4^461.53846153846155,
461.53846153846155: C4^461.53846153846155 + E4^461.53846153846155,
461.53846153846155: F4^461.53846153846155,
461.53846153846155: F4^461.53846153846155,
461.53846153846155: G4^461.53846153846155,
461.53846153846155: G4^461.53846153846155,
461.53846153846155: A4^461.53846153846155,
461.53846153846155: B4^461.53846153846155 + E5-461.53846153846155,
461.53846153846155: A4^461.53846153846155,
461.53846153846155: C5^461.53846153846155,
461.53846153846155: G4^461.53846153846155,
461.53846153846155,
461.53846153846155: G4~461.53846153846155,
461.53846153846155: C4-461.53846153846155 + E4~461.53846153846155 + E5~461.53846153846155,
461.53846153846155: C5~461.53846153846155 + G4~461.53846153846155,
461.53846153846155,
461.53846153846155: G4~461.53846153846155 + B4~461.53846153846155 + C4~461.53846153846155,
461.53846153846155: C4~461.53846153846155 + F4~461.53846153846155`,
                    tune`
329.6703296703297: E4~329.6703296703297 + E5^329.6703296703297,
329.6703296703297: E4~329.6703296703297,
329.6703296703297: E4~329.6703296703297 + G4^329.6703296703297,
329.6703296703297: E4~329.6703296703297,
329.6703296703297: E4~329.6703296703297 + G4^329.6703296703297,
329.6703296703297: E4~329.6703296703297 + E5^329.6703296703297,
329.6703296703297: E4~329.6703296703297,
329.6703296703297: E4~329.6703296703297 + B4^329.6703296703297,
329.6703296703297: E4~329.6703296703297,
329.6703296703297: E4~329.6703296703297,
329.6703296703297: E4~329.6703296703297 + B4^329.6703296703297,
329.6703296703297: E4~329.6703296703297 + A5^329.6703296703297,
329.6703296703297: E4~329.6703296703297,
329.6703296703297: E4~329.6703296703297 + E5^329.6703296703297,
329.6703296703297: E4~329.6703296703297,
329.6703296703297: E4~329.6703296703297,
329.6703296703297: E4~329.6703296703297 + F4^329.6703296703297 + D5^329.6703296703297,
329.6703296703297: E4~329.6703296703297,
329.6703296703297: E4~329.6703296703297,
329.6703296703297: E4~329.6703296703297 + A4^329.6703296703297,
329.6703296703297: E4~329.6703296703297,
329.6703296703297: E4~329.6703296703297 + A5^329.6703296703297,
329.6703296703297: E4~329.6703296703297 + B4^329.6703296703297,
329.6703296703297: E4~329.6703296703297,
329.6703296703297: E4~329.6703296703297,
329.6703296703297: E4~329.6703296703297 + E5^329.6703296703297,
329.6703296703297: E4~329.6703296703297,
329.6703296703297: E4~329.6703296703297 + A4^329.6703296703297,
329.6703296703297: E4~329.6703296703297,
329.6703296703297: E4~329.6703296703297 + G5^329.6703296703297 + C5^329.6703296703297,
329.6703296703297: E4~329.6703296703297 + A4^329.6703296703297,
329.6703296703297: E4~329.6703296703297`,
                    tune`
500: C4~500,
500: C4~500,
500: C4~500,
500: C4~500,
500: C4~500 + D4~500,
500: E4~500 + C4~500,
500: F4~500 + D4~500,
500: G4~500 + E4~500,
500: A4~500 + F4~500,
500: B4~500 + G4~500,
500: B4~500 + G4~500,
500: B4~500 + G4~500,
500: B4~500,
500: B4~500 + G4~500 + D5~500 + F5~500 + E4~500,
500: G5~500 + E5~500 + C5~500 + A4~500 + F4~500,
500: A5~500 + F5~500 + D5~500 + B4~500 + G4~500,
500: B5~500 + G5~500 + E5~500 + C5~500 + A4~500,
500,
500: E4~500 + G4~500 + B4~500 + D5~500 + F5~500,
500: F4~500 + A4~500 + C5~500 + E5~500 + G5~500,
500: A5~500 + F5~500 + D5~500 + B4~500 + G4~500,
500: B5~500 + G5~500 + E5~500 + C5~500 + A4~500,
500,
500: C4~500 + E4~500 + G4~500 + B4~500 + D5~500,
500: E5~500 + C5~500 + A4~500 + F4~500 + D4~500,
500: D5~500 + B4~500 + G4~500 + E4~500 + C4~500,
500: E5~500 + C5~500 + A4~500 + F4~500 + D4~500,
500: F5~500 + D5~500 + B4~500 + G4~500 + E4~500,
500: G5~500 + E5~500 + C5~500 + A4~500 + F4~500,
500: F5~500 + D5~500 + B4~500 + G4~500 + E4~500,
500: E5~500 + C5~500 + A4~500 + F4~500 + D4~500,
500`,
                    tune`
227.27272727272728: G5/227.27272727272728 + C4^227.27272727272728,
227.27272727272728: F5/227.27272727272728 + C4^227.27272727272728,
227.27272727272728: G5/227.27272727272728 + C4^227.27272727272728,
227.27272727272728: D5-227.27272727272728 + A4^227.27272727272728,
227.27272727272728: D5-227.27272727272728 + A4^227.27272727272728,
227.27272727272728: G5/227.27272727272728 + E4^227.27272727272728,
227.27272727272728: F5/227.27272727272728 + E4^227.27272727272728,
227.27272727272728: G5/227.27272727272728 + E4^227.27272727272728,
227.27272727272728: D5-227.27272727272728 + A4^227.27272727272728,
227.27272727272728: D5-227.27272727272728 + D4^227.27272727272728 + A4^227.27272727272728,
227.27272727272728: G5/227.27272727272728 + D4^227.27272727272728,
227.27272727272728: F5/227.27272727272728 + D4^227.27272727272728,
227.27272727272728: G5/227.27272727272728 + D4^227.27272727272728,
227.27272727272728: D5-227.27272727272728 + A4^227.27272727272728,
227.27272727272728: D5-227.27272727272728 + C4^227.27272727272728 + A4^227.27272727272728,
227.27272727272728: G5/227.27272727272728 + C4^227.27272727272728,
227.27272727272728: F5/227.27272727272728 + C4^227.27272727272728,
227.27272727272728: G5/227.27272727272728 + C4^227.27272727272728,
227.27272727272728: D5-227.27272727272728 + A4^227.27272727272728,
227.27272727272728: D5-227.27272727272728 + E4^227.27272727272728 + A4^227.27272727272728,
227.27272727272728: G5/227.27272727272728 + E4^227.27272727272728,
227.27272727272728: F5/227.27272727272728 + E4^227.27272727272728,
227.27272727272728: G5/227.27272727272728 + E4^227.27272727272728,
227.27272727272728: D5-227.27272727272728 + A4^227.27272727272728,
227.27272727272728: D5-227.27272727272728 + D4^227.27272727272728 + A4^227.27272727272728,
227.27272727272728: G5/227.27272727272728 + D4^227.27272727272728,
227.27272727272728: F5/227.27272727272728 + D4^227.27272727272728,
227.27272727272728: G5/227.27272727272728 + D4^227.27272727272728,
227.27272727272728: D5-227.27272727272728 + A4^227.27272727272728,
227.27272727272728: D5-227.27272727272728 + C4^227.27272727272728 + A4^227.27272727272728,
227.27272727272728: C4^227.27272727272728,
227.27272727272728: C4^227.27272727272728`,
                    tune`
545.4545454545455: G4^545.4545454545455,
545.4545454545455: D4^545.4545454545455,
545.4545454545455: F4^545.4545454545455,
545.4545454545455,
545.4545454545455: E5^545.4545454545455,
545.4545454545455: B4^545.4545454545455,
545.4545454545455: D5^545.4545454545455,
545.4545454545455,
545.4545454545455: G4^545.4545454545455,
545.4545454545455: B4^545.4545454545455,
545.4545454545455: E4^545.4545454545455 + C4~545.4545454545455,
545.4545454545455,
545.4545454545455: F4~545.4545454545455 + F5^545.4545454545455,
545.4545454545455: D4~545.4545454545455 + C5^545.4545454545455,
545.4545454545455: E5^545.4545454545455,
545.4545454545455: G4~545.4545454545455,
545.4545454545455: E4~545.4545454545455,
545.4545454545455: A4~545.4545454545455 + D5^545.4545454545455,
545.4545454545455: F4~545.4545454545455 + A4^545.4545454545455,
545.4545454545455: C5^545.4545454545455,
545.4545454545455: C4~545.4545454545455,
545.4545454545455: C4~545.4545454545455,
545.4545454545455: C4~545.4545454545455 + A5^545.4545454545455,
545.4545454545455: D4~545.4545454545455 + E5^545.4545454545455,
545.4545454545455: D4~545.4545454545455 + G5^545.4545454545455,
545.4545454545455: E4~545.4545454545455,
545.4545454545455: E4~545.4545454545455 + C4~545.4545454545455 + E5^545.4545454545455,
545.4545454545455: D4~545.4545454545455 + B4^545.4545454545455,
545.4545454545455: D4~545.4545454545455 + D5^545.4545454545455,
545.4545454545455: C4~545.4545454545455 + B4^545.4545454545455,
545.4545454545455: C4~545.4545454545455 + A4^545.4545454545455,
545.4545454545455: G4^545.4545454545455`,
                   ];

const spell = tune`
37.5: C4^37.5,
37.5: C4^37.5,
37.5: C4^37.5,
37.5: C4^37.5,
37.5: D4^37.5,
37.5: D4^37.5,
37.5: D4^37.5,
37.5: C4^37.5,
37.5: C4^37.5,
37.5: C4^37.5,
37.5: C4^37.5,
37.5: D4^37.5,
37.5: C4^37.5,
37.5: D4^37.5,
37.5: E4^37.5,
37.5: C4^37.5,
37.5: D4^37.5,
37.5: C4^37.5,
37.5: D4^37.5,
37.5: E4^37.5,
37.5: C4^37.5,
37.5: D4^37.5,
37.5: C4^37.5,
37.5: D4^37.5,
37.5: E4^37.5,
37.5: C4-37.5,
37.5: D4-37.5 + C4-37.5,
37.5: E4-37.5 + D4-37.5 + C4-37.5,
37.5: C4-37.5 + D4-37.5 + E4-37.5 + F4-37.5,
112.5`
const thunder = tune`
37.5: G4^37.5 + C4/37.5 + D4-37.5 + E4^37.5 + F4~37.5,
37.5: F4^37.5 + C4/37.5 + D4-37.5 + E4^37.5,
37.5: E4^37.5 + C4/37.5 + D4-37.5,
37.5: D4^37.5 + C4/37.5,
37.5: C4^37.5,
37.5: C4^37.5,
37.5: D4^37.5 + C4/37.5,
37.5: E4^37.5 + C4/37.5 + D4-37.5,
37.5: F4^37.5 + C4/37.5 + D4-37.5 + E4^37.5,
37.5: G4^37.5 + C4/37.5 + D4-37.5 + E4^37.5 + F4~37.5,
825`
const win = 12
const stone = "s"
const center = "c"
const knight = "k"
const morgul = "m"
const dino = "d"
const spike_box = "b"
const bolt = "l"
const glob = "g"
const weak_block = "w"
const tough_block = "t"
const back = "q"
const st1 = "1"
const st2 = "2"
const st3 = "3"
const st4 = "4"
const st5 = "5"
const st6 = "6"
const hurt = "h"
const scorp = "p"


setLegend([stone, bitmap`
0000000000000000
0044444004444400
04FFFFFFFFFFFF40
04FF4F44FCFCCF40
04FF4F44FCFCCF40
04FF4F44FCFFFF40
04FF44F4FFFCCF40
00FF44F4FCFFCF00
00F4F4F4CFCFCF00
04F4F44FCFFFCF40
04F4F4F4FCFFCF40
04F4F4F4CFFFCF40
04F4F44FCCCFCF40
04FFFFFFFFFFFF40
0044444004444400
0000000000000000`],//Hack-Note: When you want to add a guy, don't forget to look at the init function!
          [dino, bitmap`
................
................
.......DD.......
......3DD2......
......DDD.......
......DDD2......
.....DD3D.......
....DDDDD2.2.2..
...DDDDDDDDDDD..
.DDDDDDDDDDDD...
DDDDDDDDDDDD....
..DDDDDDDDDD....
..DDDDDDDD.DDD6.
..DDDDDD.DDD6...
..DD..DD........
..00..00........`],
          [morgul, bitmap`
..11LL0000LL11..
..1LL00FF00LL1..
111L00FFFF00L111
LLLL0F3FF3F0LLLL
L0000CCCCCC0000L
L0CCCCCCCCCCCC0L
L0CC0CCCCCC0CC0L
L0CC0CCCCCC0CC0L
L0C00CCCCCC00C0L
L0000CCCCCC0000L
LLLL0CCCCCC0LLLL
111L0CCCCCC0L111
..1L00H00H00L1..
..1LL0H00H0LL1..
..1L00H00H0L11..
..1L0DD0DD0L1...`],
          [knight, bitmap`
......CC........
.....1111.......
....1F11F1......
...11111111.....
LL...1111....LLL
.L.11111111...LL
LL11.1111.1..L.L
.L1..1111.1.L...
.L1L.1111.11....
.11..1111.L.....
.L.L.1..1L......
.....1..1.......
.....1..1.......
.....1..1.......
.....1..1.......
.....1..1.......`],
          [spike_box, bitmap`
.......11.......
.111..1LL1..111.
.1LL1.1LL1.1LL1.
.1LLL1LLLL1LLL1.
..1LL1LLLL1LL1..
...11FFFFFF11...
.11LLFFCCFFLL11.
1LLLLFCFFCFLLLL1
1LLLLFCFFCFLLLL1
.11LLFFCCFFLL11.
...11FFFFFF11...
..1LL1LLLL1LL1..
.1LLL1LLLL1LLL1.
.1LL1.1LL1.1LL1.
.111..1LL1..111.
.......11.......`],
          [bolt, bitmap`
.....000000.....
.....066660.....
.....066660.....
.....0066600....
......066660....
......006660....
.......066600...
.......066660...
.......066660...
.......0066600..
........066660..
........066660..
........066660..
........0066600.
.........006660.
..........00000.`],
          [scorp, bitmap`
................
................
.C.C.......C.C..
..C.........C...
..C..C1C1C..C...
...C.CCCCC.C....
...CCCCCCCCC....
....CC333CC.....
.FFF33CCC33FFF..
....CC333CC.....
.FFF33CCC33F33..
....CC333CC.3.3.
..FF33CCC33FF.F.
.....CCCCC...FF.
.....CCCCC..FFF.
......FFF..FFF..`],
          [glob, bitmap`
......333.......
....33777333....
...337H377733...
..377733HH7733..
..37333333H773..
.3H733333777H73.
.3H7HH33377H773.
.3777H333777773.
..3H733H373733..
..33H77737333...
...3377773H3....
....33H7733.....
......333.......
................
................
................`],
          [weak_block, bitmap`
CCCCCC1CCCCCC1CC
C....C1C....C.C.
CCCCCC1CCCCCC1CC
11.111.111111111
CCC1CCCCCC1CCCCC
..C1C....C.C....
CCC1CCCCCC1CCCCC
111111111111.111
CCCCCC.CCCCCC1CC
C....C1C....C1C.
CCCCCC.CCCCCC.CC
11111.11111..111
CCC1CCCCCC.CCCCC
..C1C....C.C....
CCC.CCCCCC1CCCCC
1111111111111111`],
          [hurt, bitmap`
....6....66.....
.....6...6.666..
66....6..6..6.66
..66...66...6...
....66..6...6...
6.....6666..6...
.66.....6666....
...6...66.66....
.6..6666...666..
..6.6.66...6..6.
...6...66..6....
.66.66.6.6.6....
6.....66..66....
......66..6.6...
......6.6.6..66.
......6..66....6`],
          [tough_block, bitmap`
1111111111111111
1CCCCCC1CCCCCC11
1CCCCCC1CCCCCC11
1CCCCCC1CCCCCC11
1111111111111111
1CCC1CCCCCC1CCC1
1CCC1CCCCCC1CCC1
1CCC1CCCCCC1CCC1
1111111111111111
1CCCCCC1CCCCCCC1
1CCCCCC1CCCCCCC1
1CCCCCC1CCCCCCC1
1111111111111111
1CCC1CCCCCC1CCC1
1CCC1CCCCCC1CCC1
1111111111111111`],
          [center, bitmap`
5555LCCCLCCCL555
555LHLCL0LCLHLH5
55LHHHL000LHH4L5
5LH9999999999HHL
LHH95HH66HH59HLC
CLH9H56DD65H9LCC
CCL9H65CC56H90LC
CL096DCDDCD6900L
L0096DCDDCD690LC
CL09H65CC56H9LCC
CCL9H56DD65H9HLC
CLH95HH66HH59HHL
LHH9999999999HL5
5L4HHL000LHHHL55
5HLHLCL0LCLHL555
555LCCCLCCCL5555`],
          [st1, bitmap`
......000.......
.....0FFF0......
....0FCFCF0.....
....0FFFFF0.....
.....0LLL0......
.....0LLL0......
......000.......
.......0........
...000000000....
.......0........
.......0........
.......0........
......0.0.......
.....0...0......
.....0...0......
....00...00.....`],
          [st2, bitmap`
................
................
......FFF.......
......FCF.......
.6...6FFF6...6..
.66.666F666.66..
.6666666666666..
.6999999999996..
.6999FFFFF9996..
.699FF...FF996..
.69FF.....FF96..
.6FF.......FF6..
.6...........6..
................
................
................`],
          [st3, bitmap`
............LLLL
.............LLL
............LLLL
...........LLL.L
..........LLL...
.........LLL....
........LLL.....
.......LLL......
......LLL.......
.....LLL........
....LLL.........
...LLL..........
..LLL...........
.LLL............
LLL.............
LL..............`],
          [st5, bitmap`
......CC..33....
.....CL0C3L13...
....CL0L3C1L13..
...CL0L300C1L13.
..CL0L3100LL1L13
.CL0L30100LLC1L3
CL0L300000000C3.
C0L3110100LLL3C.
.C300000000L3L0C
.3C000000003L0LC
3L1CLL0L003L0LC.
31L1LL0LL3L0LC..
.31L1C0L3L0LC...
..31L1C3L0LC....
...31L3C0LC.....
....33..CC......`],
          [st6, bitmap`
....FFFFFFFF....
...FFFFFFFFFF...
..FFFFFFFFFFFF..
.FFFFCCCCCCFFFF.
FFFFCCCCCCCCFFFF
FFFCCCFFFFCCCFFF
FFFCCFFFFFFCCFFF
FFFCCFF66FFCCFFF
FFFCCFF66FFCCFFF
FFFCCFFFFFFCCFFF
FFFCCCFFFFCCCFFF
FFFFCCCCCCCCFFFF
.FFFFCCCCCCFFFF.
..FFFFFFFFFFFF..
...FFFFFFFFFF...
....FFFFFFFF....`],
          [st4, bitmap`
FFFFFFFFFFFCFFFF
FFFFFFFFFFFCFFFF
CCCCCCCCCCCCCCCC
FFFCFFFFFFFFFFFF
FFFCFFFFFFFFFFFF
CCCCCCCCCCCCCCCC
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC
FFFFFFFFFFFFCFFF
FFFFFFFFFFFFCFFF
CCCCCCCCCCCCCCCC
FFFFFFFCFFFFFFFF
FFFFFFFCFFFFFFFF
CCCCCCCCCCCCCCCC
FFFFFFFFFFFCFFFF`],
          [back, bitmap`
44D444444DD44444
44D444444DD44444
4DD4444444444444
4D44D444D44D444D
4D4DD44DD4DD444D
444DD44DD4DD44DD
44DD44DD4DD444DD
44DD44DD4DD44DD4
4444D444444D4DD4
444DD44444DD44D4
444DD44D44DD4DD4
44DD44DD4DD44DD4
44DD44DD4DD4DD44
44444DD44444DD44
4D444DD4DDD44444
4DD44444DD444444`]
         )

setSolids([stone, dino, morgul, knight, spike_box, bolt, glob, weak_block, tough_block, scorp])

let level = 0
let levelChange = true
const levels = [//Hack-Note: When making levels follow theses rules
  map`
.....
.....
dmskd
gwtwg
lbcbl`,//Hack-Note: 1. It has to be 20x16
  map`
....................
....................
....................
.....tttttttttt.....
.....tl.gw..wbt.....
.....t..tttbw.t.....
.....twwtct.wgt.....
.....tbwtttwwwt.....
.....t.w.w..wgt.....
.....tbw.w.lw.t.....
.....tttttttttt.....
....................
....................
....................
....................
..........s.........`,//Hack-Note: 2. Their has to be exactly one, of the center and spawning stone.
  map`
....................
....................
....................
...tttttttttttttt...
...t.l..w...t.l.t...
...t....wg..w...t...
...t.b..www.wbwwt...
...twwwwwcwwwww.t...
...t....wtw...wwt...
...tttt..g..ttttt...
.......twwwt........
....................
....................
....................
....................
.........s..........`,//Hack-Note: 3. The Center has to be surounded by either tough_blocks, monsters, or a combination
  map`
....................
......l.l.gl........
....ttttttttttl.....
...ltttttttttt......
....tt.ttt..tt......
...gtt.tct..ttl.....
...ltt.ttt..ttg.....
....tt......tt......
....ttttttttttl.....
...ltttttttttt......
......l.g.l..l......
....................
....................
....................
....................
.........s..........`,//Hack-Note: 4. Don't forget to add a time for the level in the levelTimes list
  map`
.....sw.............
.wwwwwwwwwwwwww.l..l
......ww......w.lll.
wwwww.ttttttt.w.l.l.
......ttttttt.w.llll
.wwwwwttttttt.wl....
....g.tttcttt.wwwwww
wwwww.ttttttt.......
.g....ttttttt.wwww.w
.wwwwwttttttt.wwww.w
....g.w.w.w...wwww.w
wwwww.w.w.w.wwwwwwww
.g....w.w....w.....w
.wwwwww.ww.w.......w
.g..g.w....w.wwwwwww
wwwww..bwwww.......w`,
  map`
llllllllllllllllllll
....................
.b..................
....................
....................
........ttt.........
lllgg...ttt....gglll
........tct.........
.......ttttt........
.......ttttt........
....ggg.....ggg.....
bbbbbbbbbbbbbbbbbbbb
l.....l.....l...l..l
wwwwwwwwwwwwwwwwwwww
..w..w..w.w..w..w..w
..w..w..wsw..w..w..w`,
  map`
....................
....................
ttttttwwtttt........
ttttttwwtttt.......l
ggggggggttttllllllll
ggggggggtcttll...lll
ggggggggtttt.llll...
ggggggggttbt........
ttttwwttttttttt.tttt
ttttwwttttwtttt.tttt
ttttwwttttwtttt.tttt
ttttwwttttttttt.tttt
..wwwwwttt.t.t....tg
..wwwww............g
..wwwww............g
..wwwww.s.........tg`,
  map`
tttttttttttttttttt.s
tttttttttttttttttttt
gtttgtttgttgttgttttt
tttttttttttttttttttt
tttttttttttttttttttt
ttttttttttttttgttttt
tttttttttttttttttttt
ltttltttlttltttttttt
ttttttttttttttgttttt
tttttttttttttttttttt
tttttttttttttttttttt
tttttttttttltttttttt
ttttttttttttttgttttt
tttttttttttttttttttt
ggtttttttttttttttttt
cgtttttttttlttgttttt`,
  map`
....................
...l..b.............
.........b..........
....................
..l...ggggg.wwwww...
.....bgtttgbwtttw...
......gtctg.wt2tw...
l.....gtttg.wtttw...
....b.ggggg.wwwww.b.
....................
.....l..............
.l.....b............
.......www..l.......
.......w.wb.......b.
.......wsw..........
..l....www..........`,
  map`
.............t.w.w.s
.............tgwlwb.
.............t.w.www
.............tgwl.l.
.............t.wwwww
ttttttttttt..tg.g.g.
wwwwwwwwwwt..ttttttt
wwwwwwwwwwt.........
llllllllwwt.........
llllllllwwt.........
ggggggllwwt.........
gbbbbgllwwt.........
bbbbbgllwwt.........
tttbbgllwwt.........
gctbbgllwwt.........
ggtbggllwwt.........`,
  map`
wswttttttttttttttttt
...twwwwwwwwwwwtwwww
...twlllllllllwt....
...twltttttttlwt....
...twltwwwwwtlwt....
wwwtwltgggggtlwtwwww
...twltgptpgtlwt....
...twltgtctgtlwt....
...twltgptpgtlwt....
wwwtwltgggggtlwtwwww
...twltttttttlwt....
...twlllllllllww....
...twwwwwwwwwwww....
wwwtttttttttttttwwww
...w...w...w...w....
...w...w...w...w....`,
  map`
..g............g....
g.......l...g.......
.ttt.g.g...........l
.tgtt...tt...tt.l...
gtgpt...tptltpt.....
.tgptl.tp.t.t.pt..g.
.tgtt..tp.tst.pt....
.ttt..tp...t...pt...
g............g....l.
.....g..l..l...l....
l....tttt..........g
...l.t.ct...gl......
.....tttt..l....l..g
l..l.tlt.......g....
.....tllt....l...l..
..l..tl.lt..g.......`,
  map`
....................
.tttttttttttttttttt.
.t..bpg.gtg.gpb...t.
.t..pwwwwtwwwwp...t.
.t..gwp..t..pwg...t.
.t...w.pltlp.w....t.
.t..gw.lptpl.wg...t.
.ttttttttcttttttttt.
.t..gw.lptpl.wg...t.
.t...w.pltlp.w....t.
.t..gwp..t..pwg...t.
.t..pwwwwtwwwwp...t.
.t..bpg.gtg.gpb...t.
.t.......t........t.
.tttttttttttttttttt.
s...................`
]
const levelTimes = [60, 40, 60, 70, 50, 30, 120, 60, 70, 70, 70, 60]

setMap(levels[level])

function init_object(enemy, attack, health, speed, them, sprite){
  sprite.HP = health
  sprite.AP = attack
  sprite.SP = speed
  sprite.enm_types = enemy
  sprite.enm = []
  sprite.go = 100
  addText(enemy.toString(), {color:color`2`})
  for (let typ of sprite.enm_types){
      sprite.enm = sprite.enm.concat(getAll(typ))
    }
  sprite.att = them
  sprite.dir = "N"
  sprite.move = (dir, distance)=>{if (dir=="N"){
      sprite.y = sprite.y - distance;}
    if (dir=="E"){
      sprite.x = sprite.x + distance;}
    if (dir=="W"){
      sprite.x = sprite.x - distance;}
    if (dir=="S"){
      sprite.y = sprite.y + distance;}}
  sprite.get_new_pos = (dir)=>{let new_pos = [1,2];
    if (dir == "N") {
        new_pos = [sprite.x, sprite.y - 1];
        return new_pos;
    }
    if (dir == "E") {
        new_pos = [sprite.x + 1, sprite.y];
        return new_pos;
    }
    if (dir == "W") {
        new_pos = [sprite.x - 1, sprite.y]; // corrected sprite line
        return new_pos;
    }
    if (dir == "S") {
        new_pos = [sprite.x, sprite.y + 1];
        return new_pos;
    }
    if (dir==""){
      return "No Way"
    }
    }
  sprite.attack = (dir)=>{
    let np = sprite.get_new_pos(dir);
    let ind = 2
    if (np == "No Way"){
      return 0;
    }
    for (let i of getTile(np[0], np[1])){
      let str = typeof i
      if (sprite.att.includes(i.type)){
        i.HP -= sprite.AP;
        let h = addSprite(np[0], np[1], hurt);
        setTimeout(()=>{
          if (getAll(hurt).length > 0){
          getFirst(hurt).remove()}}, 500)//TO/DO: add in atack graphics
    }}}
  sprite.distance = (pos)=>{
    return Math.abs(sprite.x-pos[0]) + Math.abs(sprite.y-pos[1])}
  sprite.direction = (pos1, pos2)=>{if (pos1==pos2){
      return ""
    }
    if (Math.abs(pos1[0]-pos2[0]) > Math.abs(pos1[1]-pos2[1])){
      if (pos1[0]<pos2[0]){
        return "E";
      } return "W";} 
    else{
      if (pos1[1] < pos2[1]){
        return "S";
      } return "N";}
                }
  sprite.auto_move = ()=>{let min_dst = [100,null];
    if (sprite.enm.length == 0){
      return ""
    }
    for (let enemy of sprite.enm){
      if (sprite.distance([enemy.x, enemy.y])<min_dst[0]){
        min_dst = [sprite.distance([enemy.x, enemy.y]),enemy]
      }}
    let my_pos = [sprite.x, sprite.y];
    let enm_pos = [min_dst[1].x, min_dst[1].y];
    return sprite.direction(my_pos, enm_pos);}
  sprite.update = ()=>{
  sprite.enm = []
  for (let typ of sprite.enm_types){
      sprite.enm = sprite.enm.concat(getAll(typ))
    }
    sprite.dir = sprite.auto_move();
    if (sprite.go < 0){
    sprite.move(sprite.dir,1);
    sprite.attack(sprite.dir);
    sprite.go = 100}
    else{
      sprite.go -= sprite.SP
    }
    if (sprite.HP < 1){
        sprite.remove()}
  
}
  return sprite
  }
function get_stats(stype){
  if (stype == "d"){
    return Dino
  }else if (stype == "m"){
    return Morgul
  }else if (stype == "k"){
    return Knight
  }else if (stype == "b"){
    return Box
  }else if (stype == "l"){
    return Bolt
  }else if (stype == "g"){
    return Blob
  }else  if (stype == "w"){
    return Pebble
  }else if (stype == "t"){
    return Brick
  }else{
  throw new Error("Sprite does not have stats!")
  }}
function init(){//Hack-Note: in order to make a new guy write this code->getAll(newType).forEach(function(def){init_object([types_to_go_towards], attack, health, speed, 'Write attack here if its on the defense, otherwise defense')})
  defense = [bolt, spike_box, glob, weak_block, tough_block, scorp];
  attack = [knight, morgul, dino, weak_block];
  Knight = [[center], 5, 20, 10, defense, 5];
  Morgul = [[bolt], 10, 25, 10, defense, 15];
  Dino = [[center], 15, 30, 15, defense, 25];
  Blob = [[knight, morgul, dino], 10, 25, 10, attack];
  let rand = Math.floor(Math.random() * 2);
  if (rand==0){
    Box = [[knight], 15, 10, 15, attack];
  }
  else if (rand==1){
    Box = [[morgul], 15, 10, 0, attack];
  }
  else{
    Box = [[dino], 15, 10, 10, attack];
  }
  
  Bolt = [[knight], 5, 30, 15, attack];
  Scorpion = [[dino, knight, morgul], 20, 30, 15, attack]
  Brick = [[], 0, 40, 0, []];
  Pebble = [[], 0, 15, 0, []];
  getAll(glob).forEach(def1 => {
    init_object(Blob[0], Blob[1], Blob[2], Blob[3], Blob[4], def1)
  })
  getAll(bolt).forEach(def2 => {
    init_object(Bolt[0], Bolt[1], Bolt[2], Bolt[3], Bolt[4], def2)
  })
  getAll(scorp).forEach(def6 => {
    init_object(Scorpion[0], Scorpion[1], Scorpion[2], Scorpion[3], Scorpion[4], def6)
  })
  getAll(spike_box).forEach(def3 => {
      init_object(Box[0], Box[1], Box[2], Box[3], Box[4], def3)
  })
  getAll(tough_block).forEach(def4 => {
    init_object(Brick[0], Brick[1], Brick[2], Brick[3], Brick[4], def4)
  })
  getAll(weak_block).forEach(def5 => {
    init_object(Pebble[0], Pebble[1], Pebble[2], Pebble[3], Pebble[4], def5)
  })
  let timeLeft = levelTimes[level-1]*10
  gameLoop = setInterval(()=>{updateAll();
                             timeLeft -= 1;
                             if (timeLeft == 0){
                               endGame()
                             };
                             if (start == true){
                             clearText("")
                             addText((timeLeft/10).toString()+"secs left", {color:color`2`})}}, 100)}//Hack-Note: Look inside on how to add stats to your new guy!
function lightning(){
  let tme = 0;
  let pos = [[6,2],[6,4],[7,2],[8,4],[6,3],[8,3],[8,4]]
  for (let p of pos){
    tme += Math.floor(Math.random() * 200)+200
    setTimeout(()=>{addSprite(p[0], p[1], hurt);
                   playTune(thunder, 1)}, tme)
  }
  for (let b of getAll(bolt)){
    tme += Math.floor(Math.random() * 200)+200
    setTimeout(()=>{b.remove()}, tme)
  }
}
function story(){
  let castle1 = map`
tttttttttt
...t......
...t......
2..t......
1...k.....`
  let castle2 = map`
ttttttqqqq
.ktk.tqqqq
.tttttqqqq
..t..tqqqq
......qqqq`
  let gem_find = map`
bbbbbbbbbb
.b333b...b
.bbbbb...b
.....b.5.b
.....k...b`
  let wild = map`
..........
..........
.......k..
....k3....
....13.g.k`
  let time = 0
  setBackground(st4)
  setMap(castle1)
  addSprite(2, 4, st1)
  clearText("")
  addText("Soon son you will \nbe king", {x: 2, y:1, color: color`2`})
  setTimeout(()=>{
  clearText("")
  addText("Then the villages \nwill be your", {x: 2, y:0, color: color`2`}) 
  addText("responsibility.", {x: 2, y:2, color: color`2`})}, time+2000)//TO/DO fix.
  time += 2000
  setTimeout(()=>{
  clearText("")
  addText("I'll do my very \nbest father.", {x: 2, y:1, color: color`2`})}, time+3000)
  time += 3000
  setTimeout(()=>{
  clearText("")}, time+1500)
  time += 1500
  setTimeout(()=>{
  setMap(gem_find)
  addSprite(3, 4, st1)
  addText("You shall not pass!", {x: 2, y:1, color: color`2`})}, time+3000)
  time += 3000
  setTimeout(()=>{
  clearText("")
  addText("Oh really, is that \nwhat you think.", {x: 2, y:1, color: color`2`})
  playTune(spell, 1)}, time+2000)
  time += 2000
  setTimeout(()=>{
  getFirst(knight).remove();
  getFirst(st1).x = getFirst(st1).x + 1;
  clearText("")}, time+1000)
  time += 1000
  setTimeout(()=>{
    lightning();
  }, time+100)
  time += 100
  setTimeout(()=>{
    getFirst(st1).x = getFirst(st1).x + 2
  }, time+5000)
  time += 6000
  setTimeout(()=>{
    setBackground(hurt);
    addText("Arghhhh!", {x: 2, y:1, color: color`2`});
  }, time+1000)
  time += 1000
  setTimeout(()=>{
    setBackground(st4);
    getFirst(st1).remove();
    addSprite(6, 4, center);
    clearText("");
    addText("Yessss!", {x: 2, y:1, color: color`2`})
  }, time+2000)
  time += 2000
  setTimeout(()=>{
    setMap(castle2);
    addSprite(7, 4, center);
    clearText("")
  }, time+3000)
  time += 3000
  for (let i = 0; i<7; ++i){
    setTimeout(()=>{getFirst(center).x = getFirst(center).x - 1}, time+500)
    time += 500
  }
  setTimeout(()=>{
    setMap(castle1);
    addSprite(9, 4, center);
    addText("You can't go into \nthe throne room", {x: 2, y:1, color: color`2`});
  }, time+1000)
  time += 1000
  setTimeout(()=>{
    clearText("");
    addText("Can't I?", {x: 2, y:1, color: color`2`})
  }, time+1000)
  time += 1000
  setTimeout(()=>{
    getFirst(knight).remove();
    addSprite(4, 4, bolt);
  }, time+2000)
  time += 2000
  setTimeout(()=>{
    getFirst(bolt).y = getFirst(bolt).y - 1;
    clearText("")
  }, time+1000)
  time += 1000
  for (let i = 0; i<8; ++i){
    setTimeout(()=>{
      getFirst(center).x = getFirst(center).x - 1
    }, time+500)
    time += 500
  }
  setTimeout(()=>{
    addText("Die!", {x: 1, y:1, color: color`C`})
    addText("Help, guards!", {x: 7, y:1, color: color`2`})
  }, time+1000)
  time += 1000
  setTimeout(()=>{
    getFirst(st1).remove()
  }, time+1000)
  time += 1000
  setTimeout(()=>{
    setMap(wild);
    setBackground(back)
    clearText("");
    addText("Let the last evil \nmonster die.", {x: 2, y:1, color: color`2`});
  }, time+2000)
  time += 2000
  setTimeout(()=>{
    clearText("");
    addText("Your father has \nbeen killed!", {x: 2, y:1, color: color`2`});
    addSprite(0,4,knight);
  }, time+2000)
  time += 2000
  setTimeout(()=>{
    clearText("")
    addText("What? No, no, \nnooooo!", {x: 2, y:1, color: color`2`})
  }, time+1000)
  time += 1000
  for (let i = 0; i<5; ++i){
    setTimeout(()=>{
      getFirst(st1).x = getFirst(st1).x + 1
    }, time+500)
    time += 500
  }
  setTimeout(()=>{
    setMap(map`
qbbbbbbbbb
qqblgb...b
qqbbbb...b
qqb......b
qq........`);
    setBackground(st4);
    addSprite(1, 4, st1);
    clearText("")
    addText("After a winding \njourney.", {x: 2, y:1, color: color`2`})
  }, time+1000)
  time += 1000
  setTimeout(()=>{
    clearText("")
    addText("What foul place \nis sprite?", {x: 2, y:1, color: color`2`})
  }, time+2000)
  time += 2000
  for (let i = 0; i<8; ++i){
    setTimeout(()=>{
      getFirst(st1).x = getFirst(st1).x + 1
    }, time+500);
    time += 500;
  }
  setTimeout(()=>{
    setMap(gem_find);
    addSprite(3, 4, st1);
    addSprite(7, 3, st6);
    getFirst(st5).remove();
    getFirst(knight).remove();
    playTune(levelMusic[2], 2);
    music.end();
  }, time+500)
  setTimeout(()=>{
  getFirst(st1).x = getFirst(st1).x + 1;
  clearText("")}, time+1500)
  time += 1000
  setTimeout(()=>{
    lightning();
  }, time+100)
  time += 100
  setTimeout(()=>{
    getFirst(st1).x = getFirst(st1).x + 2
  }, time+5000)
  time += 6000
  setTimeout(()=>{
    setBackground(hurt);
    addText("Yaaaaa!", {x: 2, y:1, color: color`2`});
  }, time+1000)
  time += 1000
  setTimeout(()=>{
    setBackground(st4);
    getFirst(st1).remove();
    addSprite(6, 4, stone);
    clearText("");
    addText("I will do my duty \n...or die!", {x: 2, y:1, color: color`2`})
  }, time+2000)
  time += 2000
  setTimeout(()=>{
    clearText("");
    addText("Press L to play\n the game!", {x: 2, y:1, color: color`2`})
    addText("Story by: D.M.R\nMusic by:X.H.R", {x: 2, y:5, color: color`2`})
  }, time+3000)
  
}
function update(stype){
  let stats = get_stats(stype)
  getAll(stype).forEach((chr)=>{
    if (!Object.hasOwn(chr, "HP")){
      init_object(stats[0], stats[1], stats[2], stats[3], stats[4], chr)}
  })
}
function updateMove(stype){
  for (let chr of getAll(stype)){
    if (Object.hasOwn(chr, "HP")){
      chr.update()}
  }
}
function updateAll(){
  for (let def of defense){
    updateMove(def)
  }
  let cnt = getFirst(center)
  for (let att of attack){
    updateMove(att)
    for (let guy of getAll(att)){
      if (guy.x == cnt.x && guy.y == cnt.y){
        finishLevel(level == levels.length-1);
      }
    }
  }
}
function finishLevel(end){
  levelChange = true
  music.end()
  music = playTune(startMusic, Infinity)
  clearInterval(gameLoop)
  setMap(map`
tt6tt
b...b
b...b
12.21`)
  setBackground(st4)
  if (!end){
  setTimeout(()=>{
  clearText("")
  addText("You won level "+level.toString(), {x:2, y:8, color:color`4`, fontSize:2})
  addText("Press L to play\nthe next level!", {x:2, y: 9, color:color`6`})}, 110)}
  else{
    setTimeout(()=>{clearText("")
      addText("You beat the \nCenter!", {x:3, y:8, color:color`5`})},) 
    levelChange = false
    let time = 0
    for (let i = 0; i<4; ++i){
    for (let i of [3,2,1]){
      time += 100
      setTimeout(()=>{addSprite(2, i, hurt);
                     playTune(thunder);}, time)
    }
    for (let i = 0; i<3; ++i){
      setTimeout(()=>{getFirst(hurt).remove()}, time)
      time += 100}}
      }
}
function endGame(){//The Avengers worst nightmare, thats what this is!:)
  setMap(map`
bbbbb
b....
....2
l31.c`)
  setBackground(st4)
  levelChange = false
  clearInterval(gameLoop)
  setTimeout(()=>{
  clearText("")
  addText("You Lost!\n Game Over!", {x:2, y:8, color: color`0`})}, 110)
}
read=false
let start = false
//setPushables({
//  [ player ]: []
//})Alpha, Beta, Gamma, Epsilon, Zeta, Eta, Theta, 
vill = [addText("Villager", {x:5, y: 1, color: color`0`}), addText("Vikings", {x:6, y: 4, color: color`0`})]; 
addText("Press S", {x: 2, y:6, color: color`2`})
setTimeout(()=>{clearText("");addText("Villager", {x:5, y: 1, color: color`0`}); addText("Vikings", {x:6, y: 4, color: color`0`});}, 1000)
function spawner(monster){// TO/DO The new Manager classes need their particular sprite
  let spawningStone = getFirst(stone);
  let village = getFirst(center);
  R = init_object([],2,3,4,5,spawningStone)
  dir = R.direction([spawningStone.x, spawningStone.y], [village.x, village.y]);
  np = R.get_new_pos(dir);
  addSprite(np[0], np[1], monster)
  update(monster)
  }

setBackground(back)
music = playTune(startMusic, Infinity)
p = 0;//What is this? Its a random variable from middleofnowhere, mybrain.
onInput("i", () => {
  if (!levelChange){
  getFirst(stone).y -= 1;}
  
})
onInput("j", () => {
  if (!levelChange){
  getFirst(stone).x -= 1}
})
onInput("k", () => {
  if (!levelChange){
  getFirst(stone).y += 1}
})
onInput("l", () => {
  if (levelChange == true || read==true){
   level += 1;
   setMap(levels[level]);
   levelChange = false
   clearText("");
   if (level == 1){
   addText("Use the i,j,k,l", {x: 2, y: 1, color: color`C`})
   addText("keys to move.", {x: 2, y: 2, color: color`C`})
   addText("d spawns dino, w: ", {x: 2, y:12, color: color`C`})
   addText("morgul, a: knight", {x: 2, y:13, color: color`C`})}
   setTimeout(() => {clearText("");
                     start = true
                     music.end();
                     music = playTune(levelMusic[Math.floor(Math.random() * 5)],Infinity);
                    }, 5000)
   init()
   }
  else{
  getFirst(stone).x += 1;}
})
onInput("d",() => {
  if (!levelChange){
  spawner(dino);}
})
onInput("w",() => {
  if (!levelChange){
  spawner(morgul);}
})
onInput("a",() => {
  if (!levelChange){
  spawner(knight);}
})
onInput("s",() => {
  if (level == 0){
  music.end()
  music = playTune(levelMusic[1], Infinity);
  story();}
  else{
    }
})
//TO/DO: update all the sprites every moment

