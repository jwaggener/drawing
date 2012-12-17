//Backbone model describing a document.
if (Meteor.isClient) {
  
  var oonn = oonn || {};
  oonn.index = oonn.index || {};
  oonn.index.drawingModel = Backbone.Model.extend({
    
    initialize: function(){
      //points arr
      //velocity arr
      this.set({ 'points': [] });
      this.set({ 'velocity': [] });
    }
    
  });
  
}