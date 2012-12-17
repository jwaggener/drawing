var oonn = oonn || {};
oonn.index = oonn.index || {};
oonn.index.ColorPicker = Backbone.View.extend({
  
  className: 'colorpicker',
  
  events:{
    /*'touchstart': 'onTouchStart',
    'touchmove': 'onTouchMove'*/
  },
  
  initialize: function(){
    _.bindAll(this);
  },
  
  render: function(){
    
    this.$el.CanvasColorPicker({
       flat:true,
       showColor: false,
       showRGB: false,
       showHSB: false,
       showButtons: false,
       showPreview: false,
       onColorChange: this.onColorChange
    });
  },
  
  onColorChange:function( RGB, HSB ){
    console.log( 'RGB', RGB );
    console.log( 'HSB', HSB );
    this.$el.trigger( 'colorChange', { rgb: RGB, hsb: HSB } );
  },
  
  /*these are not working yet*/
  onTouchStart: function( e ){
    e.preventDefault();
  },
  
  onTouchMove: function( e ){
    e.preventDefault();
  }
  
});