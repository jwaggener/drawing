var oonn = oonn || {};
oonn.variations = oonn.variations || {};
oonn.variations.IndexView = Backbone.View.extend({
  
  initialize: function(){
    _.bindAll( this );
    this.constants = {};
    this.constants.MAX_WIDTH = 300;
    this.constants.MAX_HEIGHT = 300;
    this.drawing = this.options.drawing;//documemt to render
    this.scale = this.options.scale || 1;
    this.maxheight = this.options.maxheight || null;
    if( this.maxheight ){
      if( this.drawing.dimensions.height > this.maxheight ){
        this.scale = this.maxheight/this.drawing.dimensions.height;
      }
    }
    this.initVariations();
    this.render();
  },
  
  render: function(){
     this.$el.html('' );
     this.renderVariations();
  },
  
  renderVariations: function( drawing ){
    _.each( this.variations, function( renderer ){ this.renderDrawing( this.drawing, renderer ) }, this  );
  },
  
  renderDrawing: function( d, r ){
    var canvas, context;
    var bgColor, foreColor, bgColorStr, foreColorStr;
    //canvas and points
    canvas = document.createElement('canvas');
    canvas.width = d.dimensions.width * this.scale;
    canvas.height = d.dimensions.height * this.scale;
    context = canvas.getContext('2d');
    r.setContext( context );
    r.setPoints( d.points );
    //colors
    bgColor = ( d.backgroundColor ) ? d.backgroundColor.rgb: [ 255, 255, 255];
    foreColor = ( d.foregroundColor ) ? d.foregroundColor.rgb: [ 0, 0, 0];
    bgColorStr = 'rgb(' + Math.round( bgColor[0] * 255 ) + ',' + Math.round( bgColor[1] * 255 ) + ',' + Math.round( bgColor[2] * 255 ) + ')';
    foreColorStr = 'rgb(' + Math.round( foreColor[0] * 255 ) + ',' + Math.round( foreColor[1] * 255 ) + ',' + Math.round( foreColor[2] * 255 ) + ')';
    r.setBackgroundColor( bgColorStr );
    r.setForegroundColor( foreColorStr );
    //scale
    r.setScale( this.scale );
    //append
    this.$el.append( canvas );
    //start animation
    if( r.start ){
      r.start();
    }else{
      r.draw();
    }
    
  },
  
  initVariations: function(){
    var animated,
    fill,
    stroke,
    pointsandlines,
    topleft,
    cornerangle;
    
    animated = new oonn.graphics.drawing.animated( null );
    fill = new oonn.graphics.drawing.fill();
    stroke = new oonn.graphics.drawing.stroke();
    pointsandlines = new oonn.graphics.drawing.pointsandlines();
    topleft = new oonn.graphics.drawing.topleft();
    cornerangle = new oonn.graphics.drawing.cornerangle();
    
    this.variations = [ animated, cornerangle, topleft, pointsandlines, fill, stroke ];//, fill, stroke
  }
  
});