import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      newWeekly: this.store.createRecord('weekly'),
      links: this.store.findAll('link'),
    });
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('links', model.links);
    controller.set('newWeekly', model.newWeekly);
  },
  actions: {
    willTransition(transition) {
      let weekly = this.controller.get('newWeekly');
      if(weekly.get('hasDirtyAttributes')) {
        let confirmation = confirm("Are you sure to abandon progress?");
        if (confirmation) {
          weekly.rollbackAttributes();
        } else {
          transition.abort();
        }
      }
    },
  }
});
