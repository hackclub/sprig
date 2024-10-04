
/* 
@title: Maths_Speedrun
@author: Anshuman M.
@tags: ['puzzle']
@addedOn: 2023-05-17
*/

    /* 
  @title Maths Speedrun
  @author Anshuman M.
  Controls : A for Addition
             D for Multiplication
             S to Reset the game
*/
const player = "p"
let score = 0;

var no1 = 0;
var no2 = 0;

var looping = true;
var isOver = false;
var res = 0;

setLegend(
    [player, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`]
)

setSolids([])

let level = 0
const levels = [
    map`
....
..p.
....`
]

function gameOver() {
    looping = false;
    isOver = true;
    clearText()
    addText("Gameover", {
        x: 5,
        y: 1,
        color: color`3`
    })
    addText("S = Reset", {
        x: 1,
        y: 9,
        color: color`9`
    })
    addText("Score:" + score, {
        x: 3,
        y: 3,
        color: color`3`
    })
    setTimeout(function() {
        clearText()
        addText("Gameover", {
            x: 5,
            y: 1,
            color: color`3`
        })
        addText("S = Reset", {
            x: 1,
            y: 9,
            color: color`9`
        })
        addText("Score:" + score, {
            x: 3,
            y: 3,
            color: color`3`
        })
    }, 1400);

}

function reset() {
    clearText()
    looping = true;
    isOver = false;
    loop(2);

}
setMap(levels[level])

setPushables({
    [player]: []
})


function setres(x) {
    res = x;
}



function loop(count) {
    if (looping) {
        setTimeout(function() {
            if (looping) {
                clearText();

                no1 = Math.floor(Math.random() * count) + 1;
                no2 = Math.floor(Math.random() * count) + 1;

                setres(0)
                var op = Math.floor(Math.random() * 2) + 1;
                if (op == 1) {
                    setres(no1 * no2);
                } else {
                    setres(no1 + no2);

                }
                addText(no1 + "_?_" + no2 + "=" + res + "", {
                    x: 6,
                    y: 4,
                    color: color`4`
                })

                addText("Score:" + score, {
                    x: 3,
                    y: 2,
                    color: color`3`
                })
                addText("A = Addition", {
                    x: 1,
                    y: 7,
                    color: color`9`
                })

                addText("D = Multiplication", {
                    x: 1,
                    y: 9,
                    color: color`9`
                })

                loop(count + 1);

            }
        }, 1000);

    }
}

onInput("a", () => {
    if (!isOver) {
        var rrr = (no1 + no2)

        if (rrr == res) {
            score++;
        } else {
            gameOver();
        }
    }
})
onInput("d", () => {
    if (!isOver) {
        var rrr = (no1 * no2)
        if (rrr == res) {
            score++;
        } else {
            gameOver();

        }
    }
})
onInput("s", () => {
    reset();

})
loop(2);
