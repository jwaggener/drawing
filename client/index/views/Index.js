var oonn = oonn || {};
oonn.index = oonn.index || {};
oonn.index.IndexView = Backbone.View.extend({
  
  className: 'clearfix',
  
  events:{
    'click #overlay' : 'handleOverlay'
  },
  
  initialize: function(){
    _.bindAll( this );
    this.constants = {};
    this.constants.MAX_WIDTH = 300;
    this.constants.MAX_HEIGHT = 300;
    this.drawingRenderer = new oonn.graphics.drawing.fill( null );
    this.drawingRenderer = new oonn.graphics.drawing.stroke( null );
    this.toolbarview = new oonn.index.ToolbarView();
    this.cursor;//current set of drawings
    this.pages;//container for pages
    this.page;//current page
    this.lastId;
    $(window).on('scroll', this.handleScroll );
    $( '#overlay' ).live( 'click', this.handleOverlay );
    $( '#overlay .detail' ).live( 'click', this.handleDetail );
    this.render();
  },
  
  render: function(){
    this.$el.html('' );
    this.$el.append( Template.pages() );
    //this.$el.append( this.toolbarview.el );
    this.pages = this.$el.find('.pages');
    //Drawings.remove({});
    this.renderDrawings();
  },
  
  renderDrawings: function(){
    var cursor;
    var range = ( this.lastId ) ? { _id: { $gt: this.lastId } } : {};
    var args = { limit: 10, sort: { _id:1} };
    cursor = Drawings.find( range, args ).fetch();
    this.renderPage();
    this.lastId = cursor[ cursor.length - 1 ]['_id'];
    cursor.forEach( this.renderDrawing );
    this.setScrolledToBottom( false );
  },
  
  renderPage: function(){
    this.page = this.pages.append( Template.page() ).find('.page').last();
  },
  
  renderDrawing: function( drawing ){
    var d;
    if( drawing.points && drawing.dimensions ){
      d = new oonn.index.AnimatedDrawingView( { drawing:drawing, maxheight: 250 } );
      d.$el.on( 'drawingClicked', this.showDetail );
      this.page.append( d.el );
    }
  },
  
  showDetail: function( e ){
    window.location = '#detail/'+ e.drawing._id;
  },
  
  handleOverlay: function( e ){
    e.preventDefault();
    window.location = '#null';
  },
  
  handleDetail: function( e ){
    e.preventDefault();
    e.stopPropagation();
  },
  
  setScrolledToBottom: function( val ){
    this.scrolledToBottom = val;
    if( this.scrolledToBottom ){
      $(window).off('scroll', this.handleScroll );
      this.renderDrawings();
    }else{
      $(window).on('scroll', this.handleScroll );
    }
  },
  
  handleScroll: function( e ){
    if( this.$el.find('.reachedBottom').offset().top - $(window).scrollTop() < window.innerHeight ){
      this.setScrolledToBottom(true);
    }
  }
  
});