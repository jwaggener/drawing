/*takes 2 colors
takes a number like .6
chooses the first color proportional to that number, .6 for example 
chooses the second proportional to its remainder - .4 for example
draws vertical lines of a specified thickness across the canvas
*/
var oonn = oonn || {};
oonn.graphics = oonn.graphics || {};
oonn.graphics.drawing = oonn.graphics.drawing || {};

oonn.graphics.drawing.verticalstripes = function( context ){
  
  this.initialize.apply(this, arguments);
  
}

_.extend( oonn.graphics.drawing.verticalstripes.prototype, {
  
  initialize: function( context ){
    this.context = context ||  null;
    this.color1, this.color2;
    this.lineWidth;
    this.proportion;
  },
  
  setClippingPaths: function( clippingPaths ){
    this.clippingPaths = clippingPaths ||  null;
  },
  
  setContext: function( context ){
    this.context = context ||  null;
  },
  
  setLineWidth: function( lineWidth ){
    this.lineWidth = lineWidth || 1;
  },
  
  setScale: function( val ){
    this.scale = val || 1;
  },
  
  setColors: function( color1, color2 ){
    this.color1 = color1;
    this.color2 = color2;
  },
  
  /*determines the propportion of the 2 colors set*/
  setProportion: function( num ){
    console.log('num', num);
    this.proportion = num || Math.random();
  },
  
  regenerateProportion: function(){
    this.setProportion( Math.random() );
  },
  
  draw: function(){
    var x, y, paths;
    this.verticalStripes();
    this.context.save();
    this.context.fillStyle = '#000000';
    for( var i = 0; i < this.clippingPaths.length; i++ ){
      paths = this.clippingPaths[i];
      console.log('paths', paths );
      this.context.beginPath();
      this.context.moveTo( paths[0], paths[1] );
      for( var j=2; j<paths.length-1; j+=2 ){
        x = paths[j];
        y = paths[j + 1];
        this.context.lineTo( x, y );
      }
      this.context.lineTo( x, this.context.canvas.height );
      this.context.lineTo( paths[0], this.context.canvas.height );
      this.context.closePath();
      this.context.clip();
      this.verticalStripes();
      this.context.restore();
      this.context.save();
    }
  },
  
  verticalStripes: function(){
    var x = 0;
    var c;
    this.regenerateProportion();
    while( x<=this.context.canvas.width ){
      c = ( Math.random() <= this.proportion ) ? this.color1: this.color2;
      this.context.fillStyle = c;
      this.context.fillRect( x, 0, this.lineWidth, this.context.canvas.height );
      x += this.lineWidth;
    }
  }
  
});