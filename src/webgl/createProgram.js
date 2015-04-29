var vertexCode = `
precision mediump float;

attribute vec4 VertexPosition;
attribute vec4 VertexTexCoord;
attribute vec4 VertexColor;

varying vec4 VaryingTexCoord;
varying vec4 VaryingColor;

uniform mat4 TransformMatrix;
uniform mat4 ProjectionMatrix;
uniform mat4 TransformProjectionMatrix;

uniform sampler2D _tex0_;
uniform mediump vec4 drl_ScreenSize;
uniform mediump float drl_PointSize;

vec4 position(mat4 transform_proj, vec4 vertpos) {
  return transform_proj * vertpos;
}

void main() {
  VaryingTexCoord = VertexTexCoord;
  VaryingColor = VertexColor;
  gl_PointSize = drl_PointSize;
  gl_Position = position(TransformProjectionMatrix, VertexPosition);
}
`

var fragmentCode = `
precision mediump float;

varying mediump vec4 VaryingTexCoord;
varying lowp vec4 VaryingColor;

uniform mat4 TransformMatrix;
uniform mat4 ProjectionMatrix;
uniform mat4 TransformProjectionMatrix;

uniform sampler2D _tex0_;
uniform mediump vec4 drl_ScreenSize;
uniform mediump float drl_PointSize;

vec4 effect(lowp vec4 vcolor, sampler2D texture, vec2 texcoord, vec2 pixcoord) {
  return texture2D(texture, texcoord) * vcolor;
}

void main() {
  vec2 pixelcoord = vec2(gl_FragCoord.x, (gl_FragCoord.y * drl_ScreenSize.z) + drl_ScreenSize.w);

  gl_FragColor = effect(VaryingColor, _tex0_, VaryingTexCoord.st, pixelcoord);
}
`

var createProgram = function(context) {
  var vertexShader = compileCode(context, 'vertex', vertexCode);
  var fragmentShader = compileCode(context, 'fragment', fragmentCode);
  var program = loadVolatile(context, vertexShader, fragmentShader);
  return program;
}

var compileCode = function(context, type, source) {
  var shader;
  switch (type) {
    case "fragment":
      shader = context.createShader(context.FRAGMENT_SHADER);
      break;
    case "vertex":
      shader = context.createShader(context.VERTEX_SHADER);
      break;
    default:
      return null;
  }
  context.shaderSource(shader, source);
  context.compileShader(shader);
  if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
    throw new Error("An error occurred compiling the shaders: " + context.getShaderInfoLog(shader));
  } else {
    return shader;
  }
}

var loadVolatile = function(context, vertexShader, fragmentShader) {
    var program = context.createProgram();
    context.attachShader(program, vertexShader);
    context.attachShader(program, fragmentShader);
    context.bindAttribLocation(program, 0, "VertexPosition");
    context.bindAttribLocation(program, 1, "VertexTexCoord");
    context.bindAttribLocation(program, 2, "VertexColor");
    context.linkProgram(program);
    var linked = context.getProgramParameter(program, context.LINK_STATUS);
    if (!linked) {
      var lastError = context.getProgramInfoLog(program);
      context.deleteProgram(program);
      throw new Error("Error in program linking:" + lastError);
    }
    return program;
  }

export default createProgram;