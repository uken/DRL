// Taken from the WebGl spec:
// http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
const UNIFORM_TYPES = {
  0x8B50: 'FLOAT_VEC2',
  0x8B51: 'FLOAT_VEC3',
  0x8B52: 'FLOAT_VEC4',
  0x8B53: 'INT_VEC2',
  0x8B54: 'INT_VEC3',
  0x8B55: 'INT_VEC4',
  0x8B56: 'BOOL',
  0x8B57: 'BOOL_VEC2',
  0x8B58: 'BOOL_VEC3',
  0x8B59: 'BOOL_VEC4',
  0x8B5A: 'FLOAT_MAT2',
  0x8B5B: 'FLOAT_MAT3',
  0x8B5C: 'FLOAT_MAT4',
  0x8B5E: 'SAMPLER_2D',
  0x8B60: 'SAMPLER_CUBE',
  0x1400: 'BYTE',
  0x1401: 'UNSIGNED_BYTE',
  0x1402: 'SHORT',
  0x1403: 'UNSIGNED_SHORT',
  0x1404: 'INT',
  0x1405: 'UNSIGNED_INT',
  0x1406: 'FLOAT'
};

var mapActiveUniforms = function(context, program) {
  var activeUniformCount = context.getProgramParameter(this.program, context.ACTIVE_UNIFORMS);
  var uniforms = {};

  for (var i = 0; i < activeUniformCount; i++) {
    var uniform = context.getActiveUniform(this.program, i);
    uniform.typeName = UNIFORM_TYPES[uniform.type];
    uniform.location = context.getUniformLocation(this.program, uniform.name);
    uniforms[uniform.name] = uniform;
  }

  return uniforms;
}

export default mapActiveUniforms;