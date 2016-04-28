import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      collections: this.store.findAll('collection'),
      weeklies: this.store.findAll('weekly'),
      links: this.store.findAll('link')
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('links', model.links);
    controller.set('weeklies', model.weeklies);
    controller.set('collections', model.collection);
  },
});
