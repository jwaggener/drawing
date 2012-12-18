var oonn = oonn || {};
oonn.index = oonn.index || {};
oonn.index.ClearSaveView = Backbone.View.extend({
  
  className: 'left',
  
  events:{
    'click #clear' : 'handleClear',
    'click #save' : 'handleSave'
  },
  
  initialize: function(){
    _.bindAll( this );
    this.model = this.options.model || null;
    this.context = this.options.context || null;
    this.render();
  },
  
  render: function(){
    this.$el.append( Template.clearsave() );
  },
  
  clear: function( e ){
    var bg, bgstr;
    //background and foreground colors
    bg = ( this.model.get('backgroundColor') ) ? this.model.get('backgroundColor').rgb : [255, 255, 255];
    bgstr = 'rgb(' + Math.round( bg[0] * 255 ) + ',' + Math.round( bg[1] * 255 ) + ',' + Math.round( bg[2] * 255 ) + ')';
    this.context.clearRect( 0, 0, this.context.canvas.width, this.context.canvas.height );
    this.context.fillStyle = bgstr;
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.brush = new oonn.graphics.drawing.brushes.pointsandlines( this.context );
    this.model.set({ 'points':[] });
  },
  
  save: function(){
    var drawing = {};
    drawing.date = ( new Date() ).getTime();
    drawing.userId = Meteor.userId() || 'joepublic';
    drawing.points = this.model.get('points');
    drawing.dimensions = { width: this.context.canvas.width, height: this.context.canvas.height };
    
    //background and foreground colors
    if( this.model.get('backgroundColor') ){ drawing.backgroundColor = this.model.get('backgroundColor') };
    if( this.model.get('foregroundColor') ){ drawing.foregroundColor = this.model.get('foregroundColor') };
    
    Drawings.insert( drawing );
  },
  
  handleClear: function(e){
    this.clear();
  },
  
  handleSave: function(e){
    this.save();
  }
  
})