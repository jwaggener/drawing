var oonn = oonn || {};
oonn.index = oonn.index || {};
oonn.index.ForeBackColorView = Backbone.View.extend({
  
  className: 'left',
  
  events:{
    'change .foreground'  : 'handleChangeFore',
    'change .background'  : 'handleChangeBack'
  },
  
  initialize: function(){
    _.bindAll( this );
    this.model = this.options.model || null;
    this.render();
  },
  
  render: function(){
    this.$el.append( Template.forebackground() );
  },
  
  handleChangeFore: function( event ){
    var jscolorobj = event.target.color;
    //hsv 0-360, 0-100, 0-100
    var colorobj = {
      'hsv' : jscolorobj.hsv,
      'rgb' : jscolorobj.rgb
    }
    this.model.set( { 'foregroundColor' : colorobj });
  },
  
  handleChangeBack: function( event ){
    var jscolorobj = event.target.color;
    //hsv 0-360, 0-100, 0-100
    var colorobj = {
      'hsv' : jscolorobj.hsv,
      'rgb' : jscolorobj.rgb
    }
    this.model.set( { 'backgroundColor' : colorobj });
  }
  
});