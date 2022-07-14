const spritesheetIndex = 0;
const texIndex = 1;
let gl, texLocation, texResLocation, spritesheetLocation;

export function setBitmaps(bitmaps) {
  const sw = 16 * 4;
  const sh = 16 * 4;
  const spritesheet = new ImageData(sw, sh);
  for (let i = 0; i < bitmaps.length; i++) {
    const [_, { imageData: { data: bitmap } }] = bitmaps[i];
    console.log(i, bitmap);
    for (let x = 0; x < 16; x++)
      for (let y = 0; y < 16; y++) {
        const sx = (          (i % 4))*16 + x;
        const sy = (Math.floor(i / 4))*16 + y;
        spritesheet.data[(sy*sw + sx)*4 + 0] = bitmap[(y*16 + x)*4 + 0];
        spritesheet.data[(sy*sw + sx)*4 + 1] = bitmap[(y*16 + x)*4 + 1];
        spritesheet.data[(sy*sw + sx)*4 + 2] = bitmap[(y*16 + x)*4 + 2];
        spritesheet.data[(sy*sw + sx)*4 + 3] = bitmap[(y*16 + x)*4 + 3];
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
uniform vec2 u_texres;
in vec2 texCoord;

out vec4 frag;

vec4 sampleTile(vec2 coord, float index) {
  int spriteIndex = int(index*255.0)-1;
  vec2 fcoord = mod(coord*u_texres, 1.0);
  fcoord += vec2(spriteIndex%4, spriteIndex/4);
  vec4 ret = texture(u_spritesheet, fcoord/4.0);
  ret.a *= min(1.0, index);
  return ret;
}

void main(void) {
  vec2 coord = vec2(texCoord.x, 1.0 - texCoord.y);
  vec4 raw = texture(u_tex, coord);

  frag = vec4(1);
  vec4 sprite;
  sprite = sampleTile(coord, raw.a); if (sprite.a > 0.0) frag = vec4(sprite.xyz, 1);
  sprite = sampleTile(coord, raw.b); if (sprite.a > 0.0) frag = vec4(sprite.xyz, 1);
  sprite = sampleTile(coord, raw.g); if (sprite.a > 0.0) frag = vec4(sprite.xyz, 1);
  sprite = sampleTile(coord, raw.r); if (sprite.a > 0.0) frag = vec4(sprite.xyz, 1);
}
  `,
  'shader-vertex': `#version 300 es

precision highp float;

out vec2 texCoord;

void main(void) {
    float x = float((gl_VertexID & 1) << 2);
    float y = float((gl_VertexID & 2) << 1);
    texCoord.x = x * 0.5;
    texCoord.y = y * 0.5;
    gl_Position = vec4(x - 1.0, y - 1.0, 0, 1);
}
  `,
};

