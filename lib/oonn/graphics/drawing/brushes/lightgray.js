var oonn = oonn || {};
oonn.graphics = oonn.graphics || {};
oonn.graphics.drawing = oonn.graphics.drawing || {};
oonn.graphics.drawing.brushes = oonn.graphics.drawing.brushes || {};

oonn.graphics.drawing.brushes.lightgray = function( context ){
  
  this.initialize.apply(this, arguments);
  
}

_.extend( oonn.graphics.drawing.brushes.lightgray.prototype, {
  
  initialize: function( context ){
    this.context = context;
    this.LINE_WIDTH = 1;
    this.STROKE_STYLE = 'lightgray';// '#000';
    this.FILL_STYLE = '#ea8825';
    this.RADIUS = 3;
    this.prevX = null;
		this.prevY = null;
  },
  
  strokeStart: function( mouseX, mouseY ){
		this.prevX = mouseX;
		this.prevY = mouseY;
	},
	
	stroke: function( mouseX, mouseY ){
	  
	  if( mouseX && mouseY && this.prevX && this.prevY ){

	    //lines
  	  this.context.lineWidth = this.LINE_WIDTH;
  		this.context.strokeStyle = this.STROKE_STYLE;
      this.context.beginPath();
  		this.context.moveTo( this.prevX, this.prevY);
  		this.context.lineTo(mouseX, mouseY);
  		this.context.stroke();
  		this.context.closePath();
		}
		this.prevX = mouseX;
		this.prevY = mouseY;
		
	}
  
});