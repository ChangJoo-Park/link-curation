import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      collections: this.store.findAll('collection'),
    });
  },

  setupController(controller, model) {
    this._super(controller);
    controller.set('collections', model.collections);
  }
});
