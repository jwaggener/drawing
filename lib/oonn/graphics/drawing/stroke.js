var oonn = oonn || {};
oonn.graphics = oonn.graphics || {};
oonn.graphics.drawing = oonn.graphics.drawing || {};

oonn.graphics.drawing.stroke = function( context ){
  
  this.initialize.apply(this, arguments);
  
}

_.extend( oonn.graphics.drawing.stroke.prototype, {
  
  initialize: function( context ){
    this.context = context ||  null;
    this.BACKGROUND_COLOR = '#fff';
    this.FOREGROUND_COLOR = '#000';
    this.setBackgroundColor( this.BACKGROUND_COLOR );
    this.setForegroundColor( this.FOREGROUND_COLOR );
    
    this.STROKE_STYLE = '#000';
    this.strokeStyle = this.STROKE_STYLE;
  },
  
  setContext: function( context ){
    this.context = context ||  null;
  },
  
  setBackgroundColor: function( val ){
    this.backgroundColor = val || this.BACKGROUND_COLOR;
  },
  
  setForegroundColor: function( val ){
    this.foregroundColor = val || this.FOREGROUND_COLOR;
  },

  setFillStyle: function( val ){
    this.strokeStyle = val || this.STROKE_STYLE;
  },
  
  draw: function( points ){
    var i, x, y;
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0,0,this.context.canvas.width,this.context.canvas.height);
    this.context.strokeStyle = this.foregroundColor;
    this.context.lineWidth = 2;
    this.context.beginPath();
    x = points[0];
    y = points[1];
    for( i=0; i<points.length; i=i+2){
      x = points[i];
      y = points[i+1];
      if(x){this.context.lineTo( x, y )}else{ this.lineClose(); i=i+2};
    }
    this.context.stroke();
    this.context.closePath();
  },
  
  lineClose: function(){
    this.context.stroke();
    this.context.closePath();
    this.context.beginPath();
  }
  
});