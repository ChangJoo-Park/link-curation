import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('weekly');
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('weeklies', model);
  }
});
