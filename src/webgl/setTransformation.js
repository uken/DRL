// matrix multiplication carried out on paper:
// |1     x| |c -s    | |sx       | | 1 ky    | |1     -ox|
// |  1   y| |s  c    | |   sy    | |kx  1    | |  1   -oy|
// |    1  | |     1  | |      1  | |      1  | |    1    |
// |      1| |       1| |        1| |        1| |       1 |
//   move      rotate      scale       skew       origin

var setTransformation = function(out, x, y, angle, sx, sy, ox, oy, kx, ky) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);

  out[10] = out[15] = 1;
  out[0]  = c * sx - ky * s * sy;
  out[1]  = s * sx + ky * c * sy;
  out[4]  = kx * c * sx - s * sy;
  out[5]  = kx * s * sx + c * sy;
  out[12] = x - ox * out[0] - oy * out[4];
  out[13] = y - ox * out[1] - oy * out[5];

  return out;
}

export default setTransformation;