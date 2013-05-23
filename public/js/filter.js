define([
  'util/gl-util',
  'util/class'
], function(glUtil, Class) {
  var vertexShader = [
    "attribute vec2 inVertexPos;",
    "void main() {",
      "gl_Position = vec4(inVertexPos, 0, 0);",
    "}"
  ];

  var fragmentShaderHeader = [
    "vec3 get(x, y) {",
      "return vec3(0.0, 0.0);",
    "}",

    "void main() {",
  ];

  var fragmentShaderFooter = [
    "}"
  ];

  var Filter = obj.Class.extend({
    init: function(gl, size, code) {
      this.fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
      this.fbo.width = size;
      this.fbo.height = size;

      this.target = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.target);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.target, 0);

      gl.bindTexture2D(gl.TEXTURE_2D, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    },

    run: function(gl, source) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, source);
    }
  });

  return {
    Filter: Filter
  };
});