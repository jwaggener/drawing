var Router = Backbone.Router.extend({
  
  initialize: function(){
    _.bindAll( this );
    this.initialLoad = true;
    pageToExecute = null;
    this.args = null;
    //pages
    this.indexView, this.detailView, this.drawingView;
    //are we subscribed to the set
    this.subscribed;
  },

  routes:{
    '': 'index',
    'detail/:id': 'detail',
    'drawing': 'drawing',
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