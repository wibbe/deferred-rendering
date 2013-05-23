
define([
  'util/gl-util',
  'util/gl-matrix',
  'util/class'
], function(glUtil, glMath, Class) {
  "use strict";

  var mat4 = glMath.mat4;

  var GBuffer = Class.extend({
    init: function(gl, width, height) {
      this.width = width;
      this.height = height;

      this.fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);

      // Color attachment 0

      // Depth attachment

      glUtil.checkFramebuffer(gl, this.fbo);
    },

    bind: function(gl) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    }
  })

  var Game = Class.extend({
    init: function(gl, canvas) {
      this.projectionMatrix = mat4.create();
      this.gbuffer = new GBuffer(gl, canvas.width, canvas.height);

      gl.clearColor(0.2, 0.2, 0.2, 1.0);
      gl.clearDepth(1.0);
      gl.enable(gl.DEPTH_TEST);
    },

    resize: function(gl, canvas) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      mat4.perspective(this.projectionMatrix, 60.0, canvas.width / canvas.height, 0.5, 1000.0);
    },

    render: function(gl) {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
  });

  return {
    Game: Game
  };
});