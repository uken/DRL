import getContext from './getContext.js';
import createProgram from './createProgram.js';

class WebGL {
  constructor: (canvas) {
    this.canvas = canvas;
    this.context = getContext(this.canvas);
    this.program = createProgram(this.context);
  }
}

export default WebGL;