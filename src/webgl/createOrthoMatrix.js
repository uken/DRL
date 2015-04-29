import {mat4} from 'gl-matrix';

var createOrthoMatrix = function(left, right, bottom, top) {
  var m = mat4.create();
  m[0] = 2 / (right - left);
  m[5] = 2 / (top - bottom);
  m[10] = -1.0;
  m[12] = -(right + left) / (right - left);
  m[13] = -(top + bottom) / (top - bottom);
  return m;
}

export default createOrthoMatrix;