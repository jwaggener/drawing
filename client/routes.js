var Router = Backbone.Router.extend({
  
  initialize: function(){
    _.bindAll( this );
    this.initialLoad = true;
    pageToExecute = null;
    this.args = null;
    //pages
    this.indexView, this.detailView, this.variationsView, this.drawingView;
    //are we subscribed to the set
    this.subscribed;
  },

  routes:{
    '': 'index',
    'detail/:id': 'detail',
    'variations/:id': 'variations',
    'drawing': 'drawing',
    'verticalstripes/:id': 'verticalStripes',
    'colorpicker': 'colorpicker',
    'null': 'null'
  },
  
  null: function(){
    $( '.overlay' ).addClass( 'hide' );
  },
  
  index: function(){
    if(this.subscribed){
      if( !$('#scaffold').length ) $('body').append( Template.scaffold() );
      if( !this.indexView ){
        this.indexView = new oonn.index.IndexView();
      }
      $('#scaffold').html( this.indexView.el );
    }else{
      this.pageToExecute = 'index';
      this.args = arguments;
      this.subscribeToColleciton();
    }
  },
  
  detail: function( id ){
    var cursor, drawing;
    if(this.subscribed){
      if( !(Boolean( $('#overlay').length )) ) $('#scaffold').append( Template.overlay() );
      if( !(Boolean( $('#detail').length )) )  $('body').append( Template.detail() );
      
      this.detailView = new oonn.index.DetailView();
      
      //retrieve drawing
      cursor = Drawings.find( { _id: id }, { limit: 1 } ).fetch();
      drawing = cursor[0];
      
      this.detailView.setDrawing( drawing );
      
      $('.overlay').removeClass('hide');
      $( '.detail .content' ).empty();
      $( '.detail .content' ).append( this.detailView.$el );
      
    }else{
      this.pageToExecute = 'detail';
      this.args = arguments;
      this.subscribeToColleciton();
    }
  },
  
  //http://localhost:3000/#variations/bffc072d-1f40-43bf-83ed-f2b918a9c515
  variations: function( id ){
    if(this.subscribed){
      if( !$('#scaffold').length ) $('body').append( Template.scaffold() );
      //retrieve drawing
      cursor = Drawings.find( { _id: id }, { limit: 1 } ).fetch();
      drawing = cursor[0];
      if( !this.variationsView ){
        this.variationsView = new oonn.variations.IndexView( { drawing: drawing } );
      }
      $('#scaffold').html( this.variationsView.el );
    }else{
      this.pageToExecute = 'variations';
      this.args = arguments;
      this.subscribeToColleciton();
    }
      
  },
  
  drawing: function(){
    var model;
    var drawingView;
    var clearsaveView, forebackview;
    
    $('body').html('');
    $('body').html( Template.scaffold() );
    
    model = new oonn.index.drawingModel();
    drawingView = new oonn.index.DrawingView( { model: model } );
    clearsaveView = new oonn.index.ClearSaveView({ model: model, context: drawingView.context });
    forebackview = new oonn.index.ForeBackColorView({ model: model });
    
    $('#scaffold').html( drawingView.el );
    $('#scaffold').append( clearsaveView.el );
    $('#scaffold').append( forebackview.el );
  },
  
  verticalStripes: function( id ){
    if(this.subscribed){
      if( !$('#scaffold').length ) $('body').append( Template.scaffold() );
      cursor = Drawings.find( { _id: id }, { limit: 1 } ).fetch();
      drawing = cursor[0];
      this.verticalStripes = new oonn.canvases.IndexView( { drawing: drawing });
      $('#scaffold').html( this.verticalStripes.el );
    }else{
      this.pageToExecute = 'verticalStripes';
      this.args = arguments;
      this.subscribeToColleciton();
    }
    
  },
  
  colorpicker: function(){
    var cp = new oonn.index.ColorPicker();
    $('body').html('');
    $('body').html( Template.scaffold() );
    $('#scaffold').html( cp.el );
    cp.render();
  },
  
  /* subscribe to drawings */
  subscribeToColleciton: function(){
    Meteor.subscribe("alldrawings", this.subscriptionComplete);
  },
  
  subscriptionComplete: function( e ){
    this.subscribed = true;
    this[ this.pageToExecute ].apply( this, this.args );
  }
  
});
new Router();
$(
  function(){ Backbone.history.start(); }
)