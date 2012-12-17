var oonn = oonn || {};
oonn.index = oonn.index || {};
oonn.index.DetailView = Backbone.View.extend({
  
  id: 'detail',
  
  className: 'detailView',
  
  events:{
  'click .close' : 'handleClose'
  },
  
  initialize: function(){
    _.bindAll( this );
    this.meta;
    this.drawingRenderer = new oonn.graphics.drawing.animated( null );
    this.scale = 1;
    this.setDrawing( this.options.drawing );
    this.render();
  },
  
  setDrawing: function( drawing ){
    this.drawing = drawing;
    if( this.drawing ){
      this.renderDrawing( this.drawing );
      this.renderData( this.drawing );
    }
  },
  
  getCanvas: function( w, h ){
    if ( this.canvas ) return this.canvas;
    this.canvas = document.createElement('canvas');
    this.canvas.width = w * this.scale;
    this.canvas.height = h * this.scale;
    return this.canvas;
  },
  
  getContext: function( w, h ){
    if ( this.context ) return this.context;
    this.canvas = this.getCanvas( w, h );
    this.context = this.canvas.getContext('2d');
    return this.context;
  },
  
  render: function(){
    console.log( 'detail render' );
    this.$el.html( Template.drawingwrapper() );
  },
  
  renderDrawing: function( d ){
    this.drawingRenderer.stop();
    this.canvas = null; this.context = null;
    var bgColor, foreColor, bgColorStr, foreColorStr;
    //canvas and points
    this.drawingRenderer.setContext( this.getContext( d.dimensions.width, d.dimensions.height ) );
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
    //append canvas
    this.$el.find('.canvas').html( this.canvas );
    //start animation
    this.drawingRenderer.start();
  },
  
  renderData: function( d ){
    
    console.log( 'detail renderData' );
    
    this.$el.find('#meta').detach();
    if( this.meta ) this.meta = null;
    
    this.meta = new oonn.index.MetaDataView();
    this.meta.setDrawing( this.drawing );
    this.$el.find('.data').append( this.meta.el );
  },
  
  handleClose: function(){
    console.log( 'handleClose' );
    window.location = '#null';
  }
  
});