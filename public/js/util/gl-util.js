define(function() {
  "use strict";

  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
  // MIT license
  (function() {
      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
          window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
          window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                     || window[vendors[x]+'CancelRequestAnimationFrame'];
      }
   
      if (!window.requestAnimationFrame)
          window.requestAnimationFrame = function(callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
                timeToCall);
              lastTime = currTime + timeToCall;
              return id;
          };
   
      if (!window.cancelAnimationFrame)
          window.cancelAnimationFrame = function(id) {
              clearTimeout(id);
          };
  }());

  return {
    getContext: function(canvas) {
      var context;

      if (canvas.getContext) {
        try {
          context = canvas.getContext("webgl");
          if (context)
            return context;
        } catch(exception) {
        }

        try {
          context = canvas.getContext("experimental-webgl");
          if (context)
            return context;
        } catch(exception) {
        }
      }

      return null;
    },

    showGLFailed: function(element) {
      var errorElement = document.createElement("div");
      var errorHTML = "<h3>Sorry, but a WebGL context could not be created</h3>";
      errorHTML += "Either your browser does not support WebGL, or it may be disabled.<br/>";
      errorHTML += "Please visit <a href=\"http://get.webgl.org\">http://get.webgl.org</a> for ";
      errorHTML += "details on how to get a WebGL enabled browser.";
      errorElement.innerHTML = errorHTML;
      errorElement.id = "gl-error";
      element.parentNode.replaceChild(errorElement, element);
    },

    loadTexture: function(gl, src, callback) {
      var texture = gl.createTexture();
      var image = new Image();
      image.addEventListener("load", function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texImageParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImageParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);  
        gl.generateMipmap(gl.TEXTURE_2D);
        
        if (callback) { callback(texture); }
      });
      image.src = src;
      return texture;
    },

    start: function(callback) {
      function processFrame() {
        window.requestAnimationFrame(processFrame);
        callback();
      }

      window.requestAnimationFrame(processFrame);
    }
  };
});