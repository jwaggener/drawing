var oonn = oonn || {};
oonn.graphics = oonn.graphics || {};
oonn.graphics.drawing = oonn.graphics.drawing || {};

oonn.graphics.drawing.animated = function( context ){
  
  this.initialize.apply(this, arguments);

}

_.extend( oonn.graphics.drawing.animated.prototype, {
  
  initialize: function( context ){
    _.bindAll(this);
    this.context = context ||  null;
    this.backgroundColor, this.foregroundColor;
    this.STROKE_STYLE = '#000';
    this.FILL_STYLE = '#000';
    this.strokeStyle = this.STROKE_STYLE;
    this.scale = 1;
    this.index = 0;
    this.x, this.y;
    this.prevx, this.prevy;
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
  
  start: function(){
    this.context.fillStyle = this.backgroundColor || '#ffffff';
    this.context.fillRect( 0, 0, this.context.canvas.width, this.context.canvas.height );
    this.context.beginPath();
    this.index = 0;
    this.draw();
  },
  
  stop: function(){
    this.timeoutID = null;
  },
  
  draw: function(){
    this.timeoutID = setTimeout( this.renderLine, 1000/100 );
  },
  
  renderLine: function(){
    if( this.index >= this.points.length - 2 ) return;
    requestAnimationFrame(this.draw);

    this.x = this.points[this.index];
    this.y = this.points[this.index+1];
    
    if ( this.x != null ){
      this.context.lineTo( this.x * this.scale , this.y * this.scale );
      this.context.strokeStyle = this.foregroundColor || this.STROKE_STYLE;
      this.context.stroke();
    }else{
      this.context.closePath();
      this.context.beginPath();
    }
    this.index += 2;
  }
  
});