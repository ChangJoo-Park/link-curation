import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const collection_id = this.paramsFor('collections.show').collection_id;
    return Ember.RSVP.hash({
      collections: this.store.findAll('collection'),
      collection: this.store.findRecord('collection', collection_id)
    });
  },

  setupController(controller, model) {
    this._super(controller);
    controller.set('collections', model.collections);
    controller.set('collection', model.collection);
  }
});
