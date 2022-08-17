import { bitmapTextToImageData } from "./bitmap.js";

const spritesheetIndex = 0;
const texIndex = 1;
let gl,              texLocation,
                  texResLocation,
             spritesheetLocation,
    spritesheetTileCountLocation;

const SPRITESHEET_TILE_COUNT = (1 << 10) / 16;

export function setBitmaps(bitmaps) {
  const sw = 16 * SPRITESHEET_TILE_COUNT;
  const sh = 16 * SPRITESHEET_TILE_COUNT;
  const spritesheet = new ImageData(sw, sh);
  for (let i = 0; i < bitmaps.length; i++) {
    const { data } = bitmapTextToImageData(bitmaps[i][1]);
    for (let x = 0; x < 16; x++)
      for (let y = 0; y < 16; y++) {
        const sx = (          (i % SPRITESHEET_TILE_COUNT))*16 + x;
        const sy = (Math.floor(i / SPRITESHEET_TILE_COUNT))*16 + y;
        spritesheet.data[(sy*sw + sx)*4 + 0] = data[(y*16 + x)*4 + 0];
        spritesheet.data[(sy*sw + sx)*4 + 1] = data[(y*16 + x)*4 + 1];
        spritesheet.data[(sy*sw + sx)*4 + 2] = data[(y*16 + x)*4 + 2];
        spritesheet.data[(sy*sw + sx)*4 + 3] = data[(y*16 + x)*4 + 3];
      }
  }
  uploadImage(spritesheet, spritesheetIndex);
}

export function init(canvas) {
  gl = canvas.getContext('webgl2');//, { alpha: false });

  const program = createProgram(glsl['shader-vertex'], glsl['shader-fragment']);
  gl.useProgram(program);

  texLocation = gl.getUniformLocation(program, "u_tex");
  texResLocation = gl.getUniformLocation(program, "u_texres");
  spritesheetLocation = gl.getUniformLocation(program, "u_spritesheet");
  spritesheetTileCountLocation = gl.getUniformLocation(program, "u_spritesheet_tile_count");
  resize(canvas);

  function createShader(source, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  }

  function createProgram(vertex, fragment) {
    var program = gl.createProgram();
    gl.attachShader(program, createShader(vertex, gl.VERTEX_SHADER));
    gl.attachShader(program, createShader(fragment, gl.FRAGMENT_SHADER));
    gl.linkProgram(program);
    
    program.createUniform = function (type, name) {
      var location = gl.getUniformLocation(program, name);
      return function (v1, v2, v3, v4) {
        gl['uniform' + type](location, v1, v2, v3, v4);
      }
    };

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
      0, 0,
      4, 0,
      0, 4,
      4, 4
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);

    const size = 2;          // 2 components per iteration
    const type = gl.FLOAT;   // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset)

    return program;
  }
}

export function resize(canvas) {
  gl.viewport(0, 0, canvas.width, canvas.height);
}

export function render(canvas) {
  uploadImage(canvas, texIndex, gl.NEAREST);

  gl.uniform1i(spritesheetLocation, spritesheetIndex);
  gl.uniform1i(texLocation, texIndex);
  gl.uniform2f(texResLocation, canvas.width, canvas.height);
  gl.uniform1i(spritesheetTileCountLocation, SPRITESHEET_TILE_COUNT);

  gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
}

function uploadImage(image, i, sample=gl.NEAREST) {
  // Create a texture.
  var texture = gl.createTexture();
 
  // make unit 0 the active texture unit
  // (i.e, the unit all other texture commands will affect.)
  gl.activeTexture(gl.TEXTURE0 + i);
 
  // Bind texture to 'texture unit '0' 2D bind point
  gl.bindTexture(gl.TEXTURE_2D, texture);
 
  // Set the parameters so we don't need mips and so we're not filtering
  // and we don't repeat
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, sample);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, sample);
 
  // Upload the image into the texture.
  var mipLevel = 0;               // the largest mip
  var internalFormat = gl.RGBA;   // format we want in the texture
  var srcFormat = gl.RGBA;        // format of data we are supplying
  var srcType = gl.UNSIGNED_BYTE  // type of data we are supplying
  gl.texImage2D(gl.TEXTURE_2D,
                mipLevel,
                internalFormat,
                srcFormat,
                srcType,
                image);
}

const glsl = {
  'shader-fragment': `#version 300 es
precision highp float;

uniform sampler2D u_tex;
uniform sampler2D u_spritesheet;
uniform int u_spritesheet_tile_count;
uniform vec2 u_texres;
in vec2 texCoord;

out vec4 frag;

vec4 sampleTile(vec2 coord, float index) {
  index = index + 0.0001; // why?
  int spriteIndex = int(index*255.0)-1;
  vec2 fcoord = mod(coord*u_texres, 1.0);
  fcoord += vec2(spriteIndex % u_spritesheet_tile_count,
                 spriteIndex / u_spritesheet_tile_count);
  vec4 ret = texture(u_spritesheet, fcoord/float(u_spritesheet_tile_count));
  ret.a *= min(1.0, index);
  return ret;
}

void main(void) {
  vec2 coord = vec2(texCoord.x, 1.0 - texCoord.y);
  vec4 raw = texture(u_tex, coord);

  frag = vec4(1);
  vec4 sprite;
  sprite = sampleTile(coord, raw.a); 
  if (sprite.a > 0.0) frag = vec4(sprite.xyz, 1);
  sprite = sampleTile(coord, raw.b); 
  if (sprite.a > 0.0) frag = vec4(sprite.xyz, 1);
  sprite = sampleTile(coord, raw.g); 
  if (sprite.a > 0.0) frag = vec4(sprite.xyz, 1);
  sprite = sampleTile(coord, raw.r); 
  if (sprite.a > 0.0) frag = vec4(sprite.xyz, 1);

}
  `,
  'shader-vertex': `#version 300 es

precision highp float;
in vec2 a_position;
out vec2 texCoord;

void main(void) {
    // float x = float((gl_VertexID & 1) << 2);
    // float y = float((gl_VertexID & 2) << 1);

    float x = a_position.x;
    float y = a_position.y;
    texCoord.x = x * 0.5;
    texCoord.y = y * 0.5;
    gl_Position = vec4(x - 1.0, y - 1.0, 0, 1);
}
  `,
};

