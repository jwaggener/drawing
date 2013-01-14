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
  
  setPoints: function( points ){
    this.points = points ||  null;
  },
  
  setStrokeStyle: function( val ){
    this.strokeStyle = val || this.STROKE_STYLE;
  },
  
  setFillStyle: function( val ){
    this.fillStyle = val || this.FILL_STYLE;
  },
  
  setBackgroundColor: function( val ){
    this.backgroundColor = val || null;
  },
  
  setForegroundColor: function( val ){
    this.foregroundColor = val || null;
  },
  
  setScale: function( val ){
    this.scale = val || 1;
  },
  
  draw: function( points ){
    if( points ){ this.setPoints( points ) }
    var i, x, y;
    this.context.fillStyle = '#fff';
    this.context.fillRect(0,0,this.context.canvas.width,this.context.canvas.height);
    this.context.fillStyle = this.fillStyle;
    this.context.beginPath();
    x = this.points[0];
    y = this.points[1];
    for( i=0; i<this.points.length; i=i+2){
      x = this.points[i];
      y = this.points[i+1];
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