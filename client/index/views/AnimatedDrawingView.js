var oonn = oonn || {};
oonn.index = oonn.index || {};
oonn.index.AnimatedDrawingView = Backbone.View.extend({
  
  className: 'drawing left padding0 shadow margin625',
  
  events:{
    'click': 'handleClickDrawing'
  },
  
  initialize: function(){
    _.bindAll( this );
    this.drawing = this.options.drawing;//documemt to render
    this.scale = this.options.scale || 1;
    this.maxheight = this.options.maxheight || null;
    if( this.maxheight ){
      if( this.drawing.dimensions.height > this.maxheight ){
        this.scale = this.maxheight/this.drawing.dimensions.height;
      }
    }
    this.drawingRenderer = new oonn.graphics.drawing.animated( null );
    this.render();
  },
  
  render: function(){
    this.$el.html('' );
    this.$el.data( 'id', this.drawing['_id'] );
    this.$el.data( 'foo', 52 );
    this.renderDrawing( this.drawing );
    this.$el.height( this.drawing.dimensions.height * this.scale );
  },
  
  renderDrawing: function( d ){
    var canvas, context;
    var bgColor, foreColor, bgColorStr, foreColorStr;
    //canvas and points
    canvas = document.createElement('canvas');
    canvas.width = d.dimensions.width * this.scale;
    canvas.height = d.dimensions.height * this.scale;
    context = canvas.getContext('2d');
    this.drawingRenderer.setContext( context );
    this.drawingRenderer.setPoints( d.points );
    //colors
    bgColor = ( d.backgroundColor ) ? d.backgroundColor.rgb: [ 255, 255, 255];
    foreColor = ( d.foregroundColor ) ? d.foregroundColor.rgb: [ 0, 0, 0];
    bgColorStr = 'rgb(' + Math.round( bgColor[0] * 255 ) + ',' + Math.round( bgColor[1] * 255 ) + ',' + Math.round( bgColor[2] * 255 ) + ')';
    foreColorStr = 'rgb(' + Math.round( foreColor[0] * 255 ) + ',' + Math.round( foreColor[1] * 255 ) + ',' + Math.round( foreColor[2] * 255 ) + ')';
    this.drawingRenderer.setBackgroundColor( bgColorStr );
    this.drawingRenderer.setForegroundColor( foreColorStr );
    //scale
    this.drawingRenderer.setScale( this.scale );
    //append
    this.$el.append( canvas );
    //start animation
    this.drawingRenderer.start();
  },
  
  handleClickDrawing: function( e ){
    this.$el.trigger( { type: 'drawingClicked', drawing: this.drawing } );
  }
  
});