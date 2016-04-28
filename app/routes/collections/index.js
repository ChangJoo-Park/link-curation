import Ember from 'ember';
var inject = Ember.inject;

export default Ember.Route.extend({
  session: inject.service(),
  model() {
    return this.store.findAll('collection');
  },
});
