var oonn = oonn || {};
oonn.index = oonn.index || {};
oonn.index.MetaDataView = Backbone.View.extend({
  
  id: 'meta',
  
  events:{
  'keyup .name' : 'handleName',
  'keyup .tags' : 'handleTags',
  'click .star' : 'handleStar',
  'click .delete' : 'handleDelete'
  },
  
  initialize: function(){
    _.bindAll(this);
  },
  
  setDrawing: function( drawing ){
    this.drawing = drawing;
    if( this.drawing ) this.render( this.drawing );
  },
  
  render: function( d ){
    console.log('meta render');
    var dataHtml;
    var starstyles;
    starstyles = ( d.starred ) ? 'starred': '';
    this.$el.attr('data-id', d._id);
    dataHtml = Template.drawingmeta({
      id:d._id,
      date: ( new Date(d.date) ).toDateString(),
      starred: starstyles,
      name: function(){ return d.name || '' },
      tags: function(){ if( d.tags ){ return d.tags.join(', '); }else{ return ''; } }
    });
    this.$el.append( dataHtml );
    this.delegateEvents( this.events );
  },
  
  handleName: function( e ){
    console.log('handleName');
    var target;
    var id, record;
    target = $(e.currentTarget);
    id = target.closest( '[data-id]' ).attr('data-id');
    record = Drawings.findOne( id );
    if( record ){
      Drawings.update( String(id), { $set:{ name: target.val() } } );
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
  
});