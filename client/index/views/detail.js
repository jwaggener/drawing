var oonn = oonn || {};
oonn.index = oonn.index || {};
oonn.index.DetailView = Backbone.View.extend({
  
  id: 'detail',
  
  className: 'detailView',
  
  events:{
  'keyup .name' : 'handleName',
  'keyup .tags' : 'handleTags',
  'click .star' : 'handleStar',
  'click .delete' : 'handleDelete',
  'click .close' : 'handleClose'
  },
  
  initialize: function(){
    _.bindAll( this );
    this.drawingRenderer = new oonn.graphics.drawing.animated( null );
    this.scale = 1;
    this.setDrawing( this.options.drawing );
    //this.render();
  },
  
  setDrawing: function( drawing ){
    this.drawing = drawing;
    if( this.drawing ) this.render();
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
    this.$el.html( Template.drawingwrapper() );
    this.renderData( this.drawing );
    this.renderDrawing( this.drawing );
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
    var dataHtml;
    var starstyles;
    starstyles = ( d.starred ) ? 'starred': '';
    this.$el.attr('data-id', d._id);
    dataHtml = Template.drawingmeta({
      id:d._id,
      starred: starstyles,
      name: function(){ return d.name || '' },
      tags: function(){ if( d.tags ){ return d.tags.join(', '); }else{ return ''; } }
    });
    this.$el.find('.data').html( dataHtml );
  },
  
  handleName: function( e ){
    var target;
    var id, record;
    target = $(e.currentTarget);
    id = target.closest( '[data-id]' ).attr('data-id');
    record = Drawings.findOne( id );
    if( record ){
      record.name = target.val();
      Drawings.update( String(id), record );
    }
  },
  
  handleTags: function( e ){
    var target;
    var strVal;
    var id, record;
    target = $(e.currentTarget);
    id = target.closest( '[data-id]' ).attr('data-id');
    record = Drawings.findOne( id );
    if( record ){
      strVal = target.val();
      strVal = strVal.replace(/\s/g, "");
      strVal = strVal.toLowerCase();
      record.tags = strVal.split(",");
      Drawings.update( String(id), record );
    }
  },
  
  handleStar: function(e){
    var id, record, starred;
    id = $( e.currentTarget ).closest( '[data-id]' ).attr('data-id');
    record = Drawings.findOne( id );
    if( record.starred == undefined ){
      starred = true;
    }else{
      starred = !record.starred;
    }
    record.starred = starred;
    Drawings.update( String(id), record );
    this.renderData( record );
  },
  
  handleDelete: function(e){
    var id = $( e.currentTarget ).closest( '[data-id]' ).attr('data-id');
    Drawings.remove( String(id) );
    this.render();
  },
  
  handleClose: function(){
    window.location = '#null';
  }
  
});