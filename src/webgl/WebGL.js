import getContext from './getContext.js';
import createProgram from './createProgram.js';
import mapActiveUniforms from './mapActiveUniforms.js'

class WebGL {
  constructor: (canvas) {
    this.canvas = canvas;
    this.context = getContext(this.canvas);
    this.program = createProgram(this.context);
    this.uniforms = mapActiveUniforms(this.context, this.program);
  }
}

export default WebGL;