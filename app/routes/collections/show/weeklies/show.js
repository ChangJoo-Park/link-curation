import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model){
    this._super(controller);
    const collectionId = this.paramsFor('collections.show').collection_id;
    let collection = this.store.findRecord('collection', collectionId);
    controller.set('collection', collection);
    controller.set('weekly', model);
  }
});
