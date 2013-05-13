
require([
  "util/domReady!",
  "util/gl-util"
], function(doc, glUtil) {
  "use strict";
  var canvas = document.getElementById("game-canvas");
  var frame = document.getElementById("game-frame");

  var gl = glUtil.getContext(canvas);
  if (!gl) {
    glUtil.showGLFailed(frame);
    return;
  }

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  glUtil.start(function() {
    // Drawing code goes here!
  });
});