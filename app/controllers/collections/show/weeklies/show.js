import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deleteWeekly() {
      let weekly = this.get('weekly');
      weekly.get('links').forEach((link)=>{
        link.destroyRecord();
      });
      weekly.destroyRecord();
      this.transitionToRoute('collections.show.index', this.get('collection'));
    }
  }
});
