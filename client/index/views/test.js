var oonn = oonn || {};
oonn.index = oonn.index || {};
oonn.index.Test = Backbone.View.extend({
  
  initialize: function(){
    this.canvas = document.createElement( 'canvas' );
    this.canvas.width = 1000;
    this.canvas.height = 500;
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = '#fff';
    this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
    this.context.strokeStyle = 'orange';
    this.context.beginPath();
    this.context.moveTo( 900, 0 );
    this.context.lineTo( 900, 500 );
    this.context.lineTo( 900, 500 );
    this.context.stroke();
    this.render();
  },
  
  render: function(){
    this.drawRects();
    this.$el.append( this.canvas );
  },
  
  drawRects: function(){
    var WIDTH = 900;
    var TARGET_HEIGHT = 250;
    var targetHeight = TARGET_HEIGHT;
    var averageDiffInHeight;
    console.log('drawrects');
    var val1, val2, val3;
    var totalWofItems;
    var percentageDiff;
    val1 = { w: 496, h: 600 };
    val2 = { w: 250, h: 500 };
    val3 = { w: 350, h: 303 };
    totalWofItems = val1.w + val2.w + val3.w;
    percentageDiff = WIDTH/totalWofItems;
    console.log( 'percentageDiff', percentageDiff );
    console.log( 'val1', val1 );
    val1.w2 = val1.w * percentageDiff;
    val1.h2 = val1.h * percentageDiff;
    val2.w2 = val2.w * percentageDiff;
    val2.h2 = val2.h * percentageDiff;
    val3.w2 = val3.w * percentageDiff;
    val3.h2 = val3.h * percentageDiff;
    
    console.log( 'val1', val1 );
    this.context.strokeStyle = 'red';
    this.context.strokeRect( 0, 0, val1.w2, val1.h2 );
    
    this.context.strokeStyle = 'purple';
    this.context.strokeRect( val1.w2, 0, val2.w2, val2.h2 );
    
    this.context.strokeStyle = 'blue';
    this.context.strokeRect( val1.w2 + val2.w2, 0, val3.w2, val3.h2 );
    
    var diff1, diff2, diff3;
    averageDiffInHeight = ( ( targetHeight - val1.h2 ) + ( targetHeight - val2.h2 ) + ( targetHeight - val3.h2 ) )/3;
    averageDiffInHeight = Math.abs( averageDiffInHeight );
    //averageDiffInHeight = averageDiffInHeight/3;
    console.log( 'averageDiffInHeight', averageDiffInHeight );
    
    targetHeight += averageDiffInHeight;
    targetHeight = 363
    
    console.log( 'targetHeight', targetHeight  );
    
    val1.h3 = targetHeight;
    val1.w3 = val1.w * (val1.h3/val1.h);
    console.log( val1.w3 );
    
    val2.h3 = targetHeight;
    val2.w3 = val2.w * (val2.h3/val2.h);
    console.log( val2.w3 );
    
    val3.h3 = targetHeight;
    val3.w3 = val3.w * (val3.h3/val3.h);
    console.log( val3.w3 );
    
    this.context.strokeStyle = 'black';
    this.context.strokeRect( 0, 0, val1.w3, val1.h3 );
    
    this.context.strokeStyle = 'black';
    this.context.strokeRect( val1.w3, 0, val2.w3, val2.h3 );
    
    this.context.strokeStyle = 'black';
    this.context.strokeRect( val1.w3 + val2.w3, 0, val3.w3, val3.h3 );
    
  }
  
})