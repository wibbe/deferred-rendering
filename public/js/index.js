
require([
  "util/domReady!",
  "util/gl-util",
  "util/stats"
], function(doc, glUtil) {
  "use strict";
  var canvas = document.getElementById("game-canvas");
  var frame = document.getElementById("game-frame");

  var gl = glUtil.getContext(canvas);
  if (!gl) {
    glUtil.showGLFailed(frame);
    return;
  }

  // Create and add the stats object
  var stats = new Stats();
  stats.setMode(1);

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.body.appendChild(stats.domElement);

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  glUtil.start(function() {
    stats.begin();
    // Drawing code goes here!
    stats.end();
  });
});