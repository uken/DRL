import createProgram from './createProgram.js';
import mapActiveUniforms from './mapActiveUniforms.js';

class Shader {
  constructor(context) {
    this.context = context;
    this.program = createProgram(this.context);
    this.context.useProgram(this.program); // We always need a shader attached.
    this.uniforms = mapActiveUniforms(this.context, this.program);
  }

  getAttribLocation(name) {
    return this.context.getAttribLocation(this.program, name);
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

export default Shader;