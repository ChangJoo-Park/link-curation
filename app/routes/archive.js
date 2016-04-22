import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      links: this.store.findAll('link'),
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('links', model.links);
  }
});
