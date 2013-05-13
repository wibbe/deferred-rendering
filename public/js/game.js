
define([
  'util/gl-util',
  'util/gl-matrix'
], function(glUtil, glMath) {
  "use strict";

  var mat4 = glMath.mat4;

  var Renderer = function(gl, canvas) {
    this.projectionMatrix = mat4.create();

    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
  };

  Renderer.prototype.resize = function(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
    mat4.perspective(this.projectionMatrix, 60.0, canvas.width / canvas.height, 0.5, 1000.0);
  };

  Renderer.prototype.render = function(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  };

  return {
    Renderer: Renderer
  };
});