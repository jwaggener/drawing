/* takes 2 colors and draws vertical stripes across a canvas */
var oonn = oonn || {};
oonn.graphics = oonn.graphics || {};
oonn.graphics.texture = oonn.graphics.texture || {};

oonn.graphics.texture.verticalstripes = function( context ){
  
  this.initialize.apply(this, arguments);
  
}

_.extend( oonn.graphics.texture.verticalstripes.prototype, {
  
  initialize: function( context ){
    this.context = context ||  null;
    this.color1, this.color2;
    this.lineWidth;
    this.proportion;
  }
  
});