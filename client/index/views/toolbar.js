var oonn = oonn || {};
oonn.index = oonn.index || {};
oonn.index.ToolbarView = Backbone.View.extend({
  
  className: 'clearfix',
  
  events:{
  },
  
  initialize: function(){
    _.bindAll( this );
    this.render();
  },
  
  render: function(){
    this.$el.html( Template.toolbar() );
  }
  
});