import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deleteAction(link) {
      this.sendAction('deleteAction', link);
    }
  }
});
