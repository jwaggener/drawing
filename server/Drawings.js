Meteor.publish( "alldrawings", function(){
  return Drawings.find( );
});