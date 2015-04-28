var getContext = function(canvas) {
  var context;
  var names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];

  for (var name of names) {
    try {
      context = canvas.getContext(name);
    } catch (e) {}

    if (context) {
      break;
    }
  }

  return context;
}

export default getContext;