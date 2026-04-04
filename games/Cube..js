/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Cube.
@author: Lebrondagoat
@tags: [endless, simulation]
@addedOn: 2026-01-30
*/

//MATH FUNCTIONS WE NEED TO WRITE MANUALLY:
//multiply - done
//subtract - done
//cross - done
//divide - done
//norm - done
//inv - done
//add - done
//dot - done

let HEIGHT = 128
let WIDTH = 160

var curObj
var objfilelist = []

var colors = ["r", "o", "y", "l", "g", "b", "p", "v","k", "w"]

var zoom = 4

var projection = "orthographic"

const FPS = 1;

var math = {

  //returns a vector
  add:function (vector1, vector2){
    let result = [];
    for (let i = 0; i<vector1.length; i++){
      result.push(vector1[i]+vector2[i]);
    }
    return result;
  },

  //returns a vector
  subtract:function (vector1, vector2){
    let result = [];
    for (let i = 0; i<vector1.length; i++){
      result.push(vector1[i]-vector2[i]);
    }
    return result;
  },

  //returns a vector divided by a number
  divide:function (vector1, num){
    let result = [];
    for (let i = 0; i<vector1.length; i++){
      result.push(vector1[i]/num);
    }
    return result;
  },

  //returns the length of a vector
  norm:function (vector1){
    let result = 0;
    for (let i = 0; i<vector1.length; i++){
      result += vector1[i]*vector1[i];
    }
    return Math.sqrt(result);
  },

  //returns a dot product
  dot:function (vector1, vector2){
    let result = 0;
    for (let i = 0; i<vector1.length; i++){
      result += vector1[i]*vector2[i];
    }
    return result;
  },

  //returns a cross product
  cross:function (vector1, vector2){
    let result = [0, 0, 0];
    result[0] = vector1[1]*vector2[2] - vector1[2]*vector2[1];
    result[1] = vector1[2]*vector2[0] - vector1[0]*vector2[2];
    result[2] = vector1[0]*vector2[1] - vector1[1]*vector2[0];
    return result;
  },

  //multiplies matrices console.log(math.multiply(1, [255, 0, 0]))
  multiply:function (thing1, thing2){
    let result = [];
    if (thing2[0].constructor === Array){
      for (let i = 0; i<thing1.length; i++){
        result.push([]);
        for (let j = 0; j<thing1[i].length; j++){
          let dot = 0;
          for (let k = 0; k<thing1[i].length; k++){
              dot += thing1[i][k] * thing2[k][j];
          }
          result[i].push(dot);
        }
      }
    }else{
      for (let i = 0; i<thing1.length; i++){
        let dot = 0;
        for (let k = 0; k<thing1[i].length; k++){     
            dot += thing1[i][k] * thing2[k];
        }
        result.push(dot);
      }
    }
    return result;
  },

  //Matrix inversion
  inv:function (m){
    let result = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    //row 1
    result[0][0] = m[1][1]*m[2][2]-m[1][2]*m[2][1];
    result[0][1] = m[0][2]*m[2][1]-m[0][1]*m[2][2];
    result[0][2] = m[0][1]*m[1][2]-m[0][2]*m[1][1];
    //row 2
    result[1][0] = m[1][2]*m[2][0]-m[1][0]*m[2][2];
    result[1][1] = m[0][0]*m[2][2]-m[0][2]*m[2][0];
    result[1][2] = m[0][2]*m[1][0]-m[0][0]*m[1][2];
    //row 3
    result[2][0] = m[1][0]*m[2][1]-m[1][1]*m[2][0];
    result[2][1] = m[0][1]*m[2][0]-m[0][0]*m[2][1];
    result[2][2] = m[0][0]*m[1][1]-m[0][1]*m[1][0];

    det = m[0][0]*m[1][1]*m[2][2] - m[0][0]*m[1][2]*m[2][1]- m[0][1]*m[1][0]*m[2][2] + m[0][1]*m[1][2]*m[2][0] + m[0][2]*m[1][0]*m[2][1] - m[0][2]*m[1][1]*m[2][0]

    for (let i = 0; i<result[0].length; i++){
      for (let j = 0; j<result[i].length; j++){
        result[i][j] = (result[i][j]/det)
      }
    }

    return result
  }
    
}

setLegend(
  ["r", bitmap`
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
3333333333333333`],
  ["o", bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  ["y", bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  ["l", bitmap`
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
4444444444444444`],
  ["g", bitmap`
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
DDDDDDDDDDDDDDDD`],
  ["b", bitmap`
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
5555555555555555`],
  ["p", bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
  ["v", bitmap`
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
  ["k", bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  ["w", bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
)

rgbStrings = {
  "r":[234, 44, 70],
  "w":[255, 255, 255],
  "o":[244, 113, 23],
  "y":[254, 230, 16],
  "l":[45, 226, 63],
  "g":[28, 148, 15],
  "b":[19, 22, 225],
  "p":[246, 109, 187],
  "v":[170, 57, 197],
  "k":[0, 0, 0],
}


let screen = '';

for (let i = 0; i<HEIGHT; i++){
  for (let j = 0; j<WIDTH; j++){
    screen += "w";
  }
  screen += "\n";
}

setMap(screen)

function drawScanLine(x1, x2, y, color){
  if (x1 > x2){
    for (let i = x2; i<x1; i++){
      if (i < WIDTH && i > 0 && y < HEIGHT && y > 0){
        addSprite(i, y, color)
      }
    }
  }else{
    for (let i = x1; i<x2; i++){
      if (i < WIDTH && i > 0 && y < HEIGHT && y > 0){
        addSprite(i, y, color)
      }
    }
  }
}

function fillBottomFlatTriangle(v1, v2, v3, color){
  let invslope1 = (v2[0] - v1[0]) / (v2[1] - v1[1]);
  let invslope2 = (v3[0] - v1[0]) / (v3[1] - v1[1]);

  let curx1 = v1[0];
  let curx2 = v1[0];

  for (let i = v1[1]; i <= v2[1]; i++){
    //drawLine((int)curx1, scanlineY, (int)curx2, scanlineY);
    drawScanLine(Math.round(curx1), Math.round(curx2), i, color)
    curx1 += invslope1;
    curx2 += invslope2;
  }
}

function fillTopFlatTriangle(v1, v2, v3, color){
  let invslope1 = (v3[0] - v1[0]) / (v3[1] - v1[1]);
  let invslope2 = (v3[0] - v2[0]) / (v3[1] - v2[1]);

  let curx1 = v3[0];
  let curx2 = v3[0];

  for (let i = v3[1]; i > v1[1]; i--){
    drawScanLine(Math.round(curx1), Math.round(curx2), i, color)
    curx1 -= invslope1;
    curx2 -= invslope2;
  }
}

function sort_vert_y(points){
  if (points[1][1]<points[0][1]){
    let temppoint = points[0]
    points[0] = points[1]
    points[1] = temppoint
  }
  if (points[2][1]<points[0][1]){
    let temppoint = points[0]
    points[0] = points[2]
    points[2] = temppoint
  }
  if (points[2][1]<points[1][1]){
    let temppoint = points[1]
    points[1] = points[2]
    points[2] = temppoint
  }
  return points
}

function drawTriangle(points, color){
  sorted_points = sort_vert_y(points);
  v1 = sorted_points[0];
  v2 = sorted_points[1];
  v3 = sorted_points[2];

  if (v1[1] == v2[1]){
    fillTopFlatTriangle(v1, v2, v3, color)
  }if (v2[1] == v3[1]){
    fillBottomFlatTriangle(v1, v2, v3, color)
  }else{
    m = ((v3[0] - v1[0]) / (v3[1] - v1[1]))
    v4 = [v1[0] + m*(v2[1]-v1[1]), v2[1]];
    fillBottomFlatTriangle(v1, v2, v4, color);
    fillTopFlatTriangle(v2, v4, v3, color);
  }
}

function drawPolygon(points, color){
    for (let i = 1; i<points.length-1; i++){
      drawTriangle([points[0], points[i], points[i+1]], color)
    }
}

///CHANGE THE VERTICIES HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

shapeFaces = {
    vertices:{
        0:[15,10,10],
        1:[15,-10,10],
        2:[-10,10,10],
        3:[-10,-10,10],
        4:[10,10,-10],
        5:[10,-10,-10],
        6:[-10,10,-10],
        7:[-10,-10,-10],
    },

    faces:[
        {
            indices:[0, 1, 5, 4],
            color:[255, 0, 0],
        },
        {
            indices:[2, 3, 1, 0],
            color:[255, 0, 0],
        },
        {
            indices:[2, 0, 4, 6],
            color:[255, 0, 0],
        },
        {
            indices:[3, 2, 6, 7],
            color:[255, 0, 0]
        },
        {
            indices:[1, 3, 7, 5],
            color:[255, 0, 0],
        },
        {
            indices:[4, 5, 7, 6],
            color:[255, 0, 255],
        }
    ],

    position:[0,0,0],
    rotation:[0,0,0],
}

curObj = shapeFaces

var camera = {
    thetax: 0,
    thetay: 0,
    thetaz: 0,
    pos: [100, 100, 100]
}

var light = {
    pos: [100, -50, 100],
    ambient: 0.9
}

//console.log(camera.thetax)

function getrotation(tx, ty, tz){
    return math.multiply(getrotationz(tz), math.multiply(getrotationy(ty), getrotationx(tx)))
}

function getrotationx(theta){
    return [
        [1, 0, 0],
        [0, Math.cos(theta), -Math.sin(theta)],
        [0, Math.sin(theta), Math.cos(theta)]
    ]
}

function getrotationy(theta){
    return [
        [Math.cos(theta), 0, Math.sin(theta)],
        [0, 1, 0],
        [-Math.sin(theta), 0, Math.cos(theta)]
    ]
}

function getrotationz(theta){
    return [
        [Math.cos(theta), -Math.sin(theta), 0],
        [Math.sin(theta), Math.cos(theta), 0],
        [0, 0, 1]
    ]
}

function getNormal(face, vertices){
    vector1 = math.subtract(vertices[face.indices[1]], vertices[face.indices[0]])
    vector2 = math.subtract(vertices[face.indices[2]], vertices[face.indices[1]])
    crossvector = math.cross(vector1, vector2)
    return math.divide(crossvector, math.norm(crossvector))
}

function getCamVector(camera){
    return math.multiply(math.inv(getrotation(camera.thetax, camera.thetay, camera.thetaz)), [0, 0, 1])
}

function getLightVector(light, point){
    return math.divide(math.subtract(point, light.pos), math.norm(math.subtract(point, light.pos)))
}

function get2DPoint(point, camera){
    if (projection == "orthographic"){
        return math.multiply(getrotation(camera.thetax, camera.thetay, camera.thetaz), point)
    }else{
        var result = math.multiply(getrotation(camera.thetax, camera.thetay, camera.thetaz), math.subtract(point, camera.pos))
        return math.divide(result, result[2])
    }
}
function getTransformedPoint(object){
    result = {}
    for (let vertex in object.vertices){
        result[vertex] = math.add(object.position, math.multiply(getrotation(object.rotation[0], object.rotation[1], object.rotation[2]), object.vertices[vertex]))
    }
    return result
}

function getScreenPoint(point){
    return [Math.floor(zoom*point[0]+(WIDTH/2)), Math.floor(-zoom*point[1]+(HEIGHT/2))]
}

function getShapeCenter(face, vertices){
    result = [0, 0, 0]
    for (let i of face.indices){
        result[0] += vertices[i][0]
        result[1] += vertices[i][1]
        result[2] += vertices[i][2]
    }
    result[0] = result[0]/face.indices.length
    result[1] = result[1]/face.indices.length
    result[2] = result[2]/face.indices.length
    return result
}

function createComparator(vertices, camera){
    return function(a, b){
        distanceA = get2DPoint(getShapeCenter(a, vertices), camera)[2]
        distanceB = get2DPoint(getShapeCenter(b, vertices), camera)[2]
        return distanceA-distanceB
    }
}

function renderObject(object, camera, light){
    comparefunc = createComparator(object.vertices, camera)
    object.faces.sort(comparefunc)

    for (let face of object.faces){
        renderFace(face, camera, getTransformedPoint(object), light)
    }
}

function getColorDistance(color1, color2){
  return ((color1[0] - color2[0])*(color1[0] - color2[0]) + (color1[1] - color2[1])*(color1[1] - color2[1]) + (color1[2] - color2[2])*(color1[2] - color2[2]))
}

function rgbToColor(rgb){
    lowest = 200000
    lowest_color = "b"
    for (let key in rgbStrings){
      if (lowest > getColorDistance(rgb, rgbStrings[key])){
        lowest = getColorDistance(rgb, rgbStrings[key])
        lowest_color = key
    }
  }
  return lowest_color
}

function renderFace(face, camera, vertices, light){
    normal = getNormal(face, vertices)
    transformedNormal = math.multiply(getrotation(camera.thetax, camera.thetay, camera.thetaz), normal)
    cameravector = [0, 0, 1]

    if (math.dot(transformedNormal, cameravector) > 0){
        lightvector = getLightVector(light, vertices[face.indices[0]])
        brightness = math.dot(normal, lightvector)
        brightness = (brightness+light.ambient)/2
        rendercolor = [0, 0, 0]

        //// THIS ESTIMATES THE COLOR AND THEN SETS IT////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // for (let i = 0; i<face.color.length; i++){
        //   rendercolor[i] = Math.round(face.color[i]*brightness)
        // }
    
        // rendercolor = [0, 0, 0]
        // for (let i = 0; i < 3; i++){
        //   rendercolor[i] = Math.floor(face.color[i]*brightness)
        // }
        // rendercolor = rgbToColor(rendercolor)

        //Switch it out with this line if you want to change the mode.
        rendercolor = colors[Math.floor(brightness*colors.length)]

        screencoords = []
        for (let i of face.indices){
            let point = getScreenPoint(get2DPoint(vertices[i], camera))
            screencoords.push(point)
        }

        drawPolygon(screencoords, rendercolor)
    }
}

function Draw(){
    setMap(screen)
    //drawScanLine(10, 50, 10, "r")
    renderObject(curObj, camera, light)
    camera.thetaz += 0.1
    camera.thetax += 0.1
    camera.thetay += 0.1
    setTimeout(() => Draw(), 1000/FPS)
}

Draw()




