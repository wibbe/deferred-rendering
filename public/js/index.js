
require([
  'util/domReady!',
  'util/gl-util',
  'game',
  'js/util/stats.js',
], function(doc, glUtil, game) {
  "use strict";
  var canvas = document.getElementById("game-canvas");
  var frame = document.getElementById("game-frame");

  var gl = glUtil.getContext(canvas);
  if (!gl) {
    glUtil.showGLFailed(frame);
    return;
  }

  if (gl.getExtension("OES_texture_float") == null) {
    throw "Missing float texture support!";
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

  // Create renderer
  var game = new game.Game(gl, canvas);
  game.resize(gl, canvas);


  glUtil.start(function() {
    stats.begin();

    game.render(gl, canvas);

    stats.end();
  });
});