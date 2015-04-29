import getContext from './getContext.js';
import createProgram from './createProgram.js';
import mapActiveUniforms from './mapActiveUniforms.js';
import createOrthoMatrix from './createOrthoMatrix.js';
import setTransformation from './setTransformation.js';
import {glMatrix, mat4} from 'gl-matrix';

class WebGL {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = getContext(this.canvas);
    this.program = createProgram(this.context);
    this.uniforms = mapActiveUniforms(this.context, this.program);

    var width = this.canvas.width;
    var height = this.canvas.height;

    this.context.useProgram(this.program);
    this.context.viewport(0, 0, width, height);

    this.context.disable(this.context.CULL_FACE);
    this.context.disable(this.context.DEPTH_TEST);
    this.context.enable(this.context.BLEND);
    this.context.blendFuncSeparate(
      this.context.SRC_ALPHA,
      this.context.ONE_MINUS_SRC_ALPHA,
      this.context.ONE,
      this.context.ONE_MINUS_SRC_ALPHA);

    glMatrix.setMatrixArrayType(Float32Array);
    this.transformMatrices = [mat4.create()];
    this.projectionMatrices = [mat4.create()];
    this.transformProjectionMatrix = mat4.create();
    this.projectionMatrices.push(createOrthoMatrix(0, width, height, 0));

    this.sendFloat("drl_ScreenSize", new Float32Array([width, height, 0, 0]));
    this.sendFloat("drl_PointSize", new Float32Array([1]));

    this.positionLocation = this.context.getAttribLocation(this.program, "VertexPosition");
    this.texCoordLocation = this.context.getAttribLocation(this.program, "VertexTexCoord");
    this.colorLocation = this.context.getAttribLocation(this.program, "VertexColor");

    this.context.clearColor(0, 0, 0, 1);
    this.context.vertexAttrib4f(this.colorLocation, 1, 1, 1, 1);

    this.texCoordBuffer = this.context.createBuffer();
    this.positionBuffer = this.context.createBuffer();
  }

  clear() {
    this.context.clear(this.context.COLOR_BUFFER_BIT);
  }

  drawImage(imageData, x, y, angle, sx, sy, ox, oy, kx, ky) {
    var imageTransformMatrix = setTransformation(new Float32Array(16), x, y, angle, sx, sy, ox, oy, kx, ky);

    var transformMatrix = mat4.mul(new Float32Array(16), this.transformMatrices[this.transformMatrices.length - 1], imageTransformMatrix);
    var projectionMatrix = this.projectionMatrices[this.projectionMatrices.length - 1];
    var transformProjectionMatrix = mat4.mul(this.transformProjectionMatrix, projectionMatrix, transformMatrix);

    this.sendMatrix("TransformMatrix", transformMatrix);
    this.sendMatrix("ProjectionMatrix", projectionMatrix);
    this.sendMatrix("TransformProjectionMatrix", transformProjectionMatrix);

    this.bindTexture(imageData.texture);

    var gl = this.context;
    gl.enableVertexAttribArray(this.positionLocation);
    gl.enableVertexAttribArray(this.texCoordLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, imageData.uvs, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(this.texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, imageData.coords, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    gl.disableVertexAttribArray(this.positionLocation);
    gl.disableVertexAttribArray(this.texCoordLocation);
  }

  bindTexture(texture) {
    if (texture !== this.activeTexture) {
      this.context.bindTexture(this.context.TEXTURE_2D, texture);
      this.activeTexture = texture;
    }
  }

  transform(x, y, angle, sx, sy, ox, oy, kx, ky) {
    var currentTransform = this.transformMatrices[this.transformMatrices.length - 1];
    setTransformation(currentTransform, x, y, angle, sx, sy, ox, oy, kx, ky)
  }

  push() {
    this.transformMatrices.push(mat4.copy(new Float32Array(16), this.transformMatrices[this.transformMatrices.length - 1]));
  }

  pop() {
    this.transformMatrices.pop();
  }

  sendMatrix(name, matrix) {
    var uniform = this.uniforms[name];
    if (!uniform) { return; }

    switch (Math.sqrt(matrix.length)) {
      case 2:
        this.context.uniformMatrix2fv(uniform.location, false, matrix);
        break;
      case 3:
        this.context.uniformMatrix3fv(uniform.location, false, matrix);
        break;
      case 4:
        this.context.uniformMatrix4fv(uniform.location, false, matrix);
        break;
    }
  }

  sendFloat(name, floats) {
    var uniform = this.uniforms[name];
    if (!uniform) { return; }

    switch (floats.length) {
      case 1:
        this.context.uniform1fv(uniform.location, floats);
        break;
      case 2:
        this.context.uniform2fv(uniform.location, floats);
        break;
      case 3:
        this.context.uniform3fv(uniform.location, floats);
        break;
      case 4:
        this.context.uniform4fv(uniform.location, floats);
        break;
    }
  }
}

export default WebGL;