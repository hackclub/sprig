setLegend(
  [ "b", bitmap`
..LLLLLLLLLLLL..
.L111111111111L.
L12222222222221L
L12222222222221L
L12222222222221L
L12222222222221L
L12222222222221L
L12222222222221L
L12222222222221L
L12222222222221L
L12222222222221L
L12222222222221L
L12222222222221L
L12222222222221L
.L111111111111L.
..LLLLLLLLLLLL..`
])
setMap(map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`)

var ballx = 0;
var bally = 0;
var ballxspeed = 1;
var ballyspeed = 2;

function willer() {
  var dblx = ballx * 9;
  var dbly = bally * 9;
  if ((dblx > 160) || (dblx < 0) || (dbly > 128) || (dbly < 0)) {
    return false
  } else {
    return true
  }
}

function update() {
  clearTile(ballx, bally)
  ballx = ballx + ballxspeed;
  bally = bally + ballyspeed;
  if ((ballx > (160 / 9)) || (ballx < 0)) {
    ballxspeed = 0 - ballxspeed;
  }
  if ((bally > (128 / 9)) || (bally < 0)) {
    ballyspeed = 0 - ballyspeed;
  }

  // Draw the ball
  if (willer()) {
    addSprite(ballx, bally, "b");
  }
}

setInterval(update, 1000 / 30);