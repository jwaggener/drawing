var oonn = oonn || {};
oonn.graphics = oonn.graphics || {};
oonn.graphics.drawing = oonn.graphics.drawing || {};

oonn.graphics.drawing.topleft = function( context ){
  
  this.initialize.apply(this, arguments);
  
}

_.extend( oonn.graphics.drawing.topleft.prototype, {
  
  initialize: function( context ){
    this.context = context ||  null;
    this.BACKGROUND_COLOR = '#fff';
    this.FOREGROUND_COLOR = '#000';
    this.setBackgroundColor( this.BACKGROUND_COLOR );
    this.setForegroundColor( this.FOREGROUND_COLOR );
    
    this.STROKE_STYLE = '#000';
    this.strokeStyle = this.STROKE_STYLE;
    this.FILL_STYLE = '#ea8825';
    this.RADIUS = 3;
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
    this.context.fillStyle = this.backgroundColor || '#ffffff';
    this.context.fillRect( 0, 0, this.context.canvas.width, this.context.canvas.height );
    this.context.lineWidth = .5;
    this.context.beginPath();
    for( i=0; i<this.points.length; i=i+2){
      this.renderLine( this.points[i], this.points[i+1] );
    }
     this.context.closePath();
  },
  
  renderLine: function( x, y ){
    if ( x != null ){
      this.context.moveTo( x * this.scale, 0 );
      this.context.lineTo( x * this.scale , y * this.scale );
      this.context.strokeStyle = this.foregroundColor || this.FILL_STYLE;
      this.context.stroke();
    }
    if ( y != null ){
      this.context.moveTo( 0, y * this.scale );
      this.context.lineTo( x * this.scale , y * this.scale );
      this.context.strokeStyle = this.foregroundColor || this.FILL_STYLE;
      this.context.stroke();
    }
    
  }
  
});