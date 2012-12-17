if (Meteor.isClient) {
  
  var oonn = oonn || {};
  oonn.index = oonn.index || {};
  oonn.index.DrawingView = Backbone.View.extend({
    
    initialize: function(){
      _.bindAll( this );
      this.drawingModel = this.options.model || new Backbone.Model();
      this.drawingModel.on( 'change:foregroundColor', this.renderDrawing );
      this.drawingModel.on( 'change:backgroundColor', this.renderDrawing );
      this.canvas = this.options.canvas || this.createCanvas();
      this.context = this.canvas.getContext('2d');
      this.context.fillStyle = '#fff';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.brush = new oonn.graphics.drawing.brushes.pointsandlines( this.context );
      this.lightgraybrush = new oonn.graphics.drawing.brushes.lightgray( this.context );
      this.fillbrush = new oonn.graphics.drawing.brushes.fill( this.context );
      this.drawingRenderer = new oonn.graphics.drawing.fill( this.context );
      this.drawingRenderer = new oonn.graphics.drawing.stroke( this.context );
      
      this.canvas.addEventListener('mousedown', this.onCanvasMouseDown, false);
      this.canvas.addEventListener('touchstart', this.onCanvasTouchStart, false);
      $(document).on( 'touchmove', this.onDocumentTouchMove );
      this.render();
    },
    
    render: function(){
      this.$el.html('' );
      this.$el.append( this.canvas );
    },
    
    renderDrawing: function( points ){
      var bg, fg;
      var bgstr, fgstr;
      var points;
      
      //background and foreground colors
      bg = ( this.model.get('backgroundColor') ) ? this.model.get('backgroundColor').rgb : [255, 255, 255];
      bgstr = 'rgb(' + Math.round( bg[0] * 255 ) + ',' + Math.round( bg[1] * 255 ) + ',' + Math.round( bg[2] * 255 ) + ')';
      this.drawingRenderer.setBackgroundColor( bgstr );
      

      fg = ( this.model.get('foregroundColor') ) ? this.model.get('foregroundColor').rgb : [0, 0, 0];
      fgstr = 'rgb(' + Math.round( fg[0] * 255 ) + ',' + Math.round( fg[1] * 255 ) + ',' + Math.round( fg[2] * 255 ) + ')';
      this.drawingRenderer.setForegroundColor( fgstr );
      
      points = this.model.get('points');
      this.drawingRenderer.draw( points );
    },
    
    onCanvasMouseDown: function( event ){
      this.drawingModel.get('points').push( event.clientX );
      this.drawingModel.get('points').push( event.clientY );
      this.lightgraybrush.strokeStart( event.clientX, event.clientY );
      window.addEventListener('mousemove', this.onCanvasMouseMove, false);
    	window.addEventListener('mouseup', this.onCanvasMouseUp, false);
    },
    
    onCanvasTouchStart: function( event ){
      if(event.touches.length == 1){
    		event.preventDefault();
    		this.drawingModel.get('points').push( event.clientX );
        this.drawingModel.get('points').push( event.clientY );
    		this.lightgraybrush.strokeStart( event.touches[0].pageX, event.touches[0].pageY );
    		window.addEventListener('touchmove', this.onCanvasTouchMove, false);
    		window.addEventListener('touchend', this.onCanvasTouchEnd, false);
    	}
    },
    
    onCanvasMouseMove: function( event ){
      this.drawingModel.get('points').push( event.clientX );
      this.drawingModel.get('points').push( event.clientY );
      this.lightgraybrush.stroke( event.clientX, event.clientY );
    },
    
    onCanvasMouseUp: function( event ){
      this.drawingModel.get('points').push( null );
      this.drawingModel.get('points').push( null );
      this.renderDrawing();
      window.removeEventListener('mousemove', this.onCanvasMouseMove, false);
    	window.removeEventListener('mouseup', this.onCanvasMouseUp, false);
    },
    
    onDocumentTouchMove: function( event ){
      event.preventDefault();
    },
    
    onCanvasTouchMove: function( event ){
      //canvas
      event.preventDefault();
    	if(event.touches.length == 1){ 
    		this.drawingModel.get('points').push( event.touches[0].pageX );
        this.drawingModel.get('points').push( event.touches[0].pageY );
        this.lightgraybrush.stroke( event.touches[0].pageX, event.touches[0].pageY );
    	}
    },

    onCanvasTouchEnd: function( event ){
    	if(event.touches.length == 0){
    		event.preventDefault();
    		this.drawingModel.get('points').push( null );
    		this.drawingModel.get('points').push( null );
    		this.renderDrawing();
    		window.removeEventListener('touchmove', this.onCanvasTouchMove, false);
    		window.removeEventListener('touchend', this.onCanvasTouchEnd, false);
    	}
    },
    
    clear: function( e ){
      var bg, bgstr;
      //background and foreground colors
      bg = ( this.model.get('backgroundColor') ) ? this.model.get('backgroundColor').rgb : [255, 255, 255];
      bgstr = 'rgb(' + Math.round( bg[0] * 255 ) + ',' + Math.round( bg[1] * 255 ) + ',' + Math.round( bg[2] * 255 ) + ')';
      
      this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
      this.context.fillStyle = bgstr;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.brush = new oonn.graphics.drawing.brushes.pointsandlines( this.context );
      this.model.set({ 'points':[] });
    },
    
    createCanvas: function(){
      var canvas;
      canvas = document.createElement( 'canvas' );
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 40;//mobile safari is 346
      return canvas;
    }
    
  });
};