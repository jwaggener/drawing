var oonn = oonn || {};
oonn.canvases = oonn.canvases || {};
oonn.canvases.IndexView = Backbone.View.extend({
  
  events:{
    'click canvas': 'handleClickCanvas'
  },
  
  initialize: function(){
    _.bindAll( this );
    this.canvas, this.context;
    this.drawing = this.options.drawing;
    console.log( 'this.drawing', this.drawing )
    this.scale;
    this.render();
  },
  
  render: function(){
    this.renderCanvas();
  },
  
  renderCanvas: function(){
    var texture;
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1700;//2000
    this.canvas.height = 2200;//2400
    this.scale = ( this.canvas.height/this.drawing.dimensions.width ) * .8;
    console.log( 'this.scale', this.scale );
    texture = new oonn.graphics.drawing.verticalstripes( this.canvas.getContext('2d') );
    texture.setScale( this.scale ); 
    texture.setClippingPaths( this.createClippingPaths() );
    texture.setColors( '#ffffff', '#eeeeee' );
    texture.setProportion( Math.random() );
    texture.setLineWidth( 2 );
    texture.draw();
    this.$el.append( this.canvas );
  },
  
  createClippingPaths:function(){
    var clippingPaths = [];
    var arr = [];
    var l = this.drawing.points.length-1;
    console.log( 'this.drawing.points', this.drawing.points );
    for( var i = 0; i<l; i+=2 ){
      if( this.drawing.points[i] != null ){
        arr.push( this.drawing.points[i] * this.scale );
        arr.push( this.drawing.points[i + 1] * this.scale );
      }else{
        if( arr.length ) clippingPaths.push( arr );
        arr = [];
      }
    }
    return clippingPaths;
  },
  
  handleClickCanvas: function(){
    console.log('click canvas');
    var img = new Image();
    img.src = this.canvas.toDataURL( 'image/jpeg', 1 );
    this.$el.append( img );
  }
  
});