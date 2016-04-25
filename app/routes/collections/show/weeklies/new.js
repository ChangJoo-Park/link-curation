import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const collection_id = this.paramsFor('collections.show').collection_id;
    return Ember.RSVP.hash({
      collection: this.store.findRecord('collection', collection_id),
      newWeekly: this.store.createRecord('weekly'),
      links: this.store.findAll('link'),
    });
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('links', model.links);
    controller.set('newWeekly', model.newWeekly);
    controller.set('collection', model.collection);
    const number = model.collection.get('weeklies.length') + 1;
    const title = `${model.collection.get('title')} #${number}`;
    controller.set('newWeekly.title', title);
  },
  actions: {
    willTransition(transition) {
      let weekly = this.controller.get('newWeekly');
      if(weekly.get('hasDirtyAttributes')) {
        // TODO : 무조건 나오는거 고쳐야됨
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
