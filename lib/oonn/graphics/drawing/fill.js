var oonn = oonn || {};
oonn.graphics = oonn.graphics || {};
oonn.graphics.drawing = oonn.graphics.drawing || {};

oonn.graphics.drawing.fill = function( context ){
  
  this.initialize.apply(this, arguments);
  
}

_.extend( oonn.graphics.drawing.fill.prototype, {
  
  initialize: function( context ){
    this.context = context ||  null;
    this.FILL_STYLE = '#000';
    this.fillStyle = this.FILL_STYLE;
  },
  
  setContext: function( context ){
    this.context = context ||  null;
  },
  
  setFillStyle: function( val ){
    this.fillStyle = val || this.FILL_STYLE;
  },
  
  draw: function( points ){
    var i, x, y;
    this.context.fillStyle = '#fff';
    this.context.fillRect(0,0,this.context.canvas.width,this.context.canvas.height);
    this.context.fillStyle = this.fillStyle;
    this.context.beginPath();
    x = points[0];
    y = points[1];
    for( i=0; i<points.length; i=i+2){
      x = points[i];
      y = points[i+1];
      if(x){this.context.lineTo( x, y )}else{ this.fillClose(); i=i+2};
    }
    this.context.fill();
    this.context.closePath();
  },
  
  fillClose: function(){
    this.context.fill();
    this.context.closePath();
    this.context.beginPath();
  }
  
});