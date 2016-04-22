import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  actions: {
    deleteAction(link) {
      this.sendAction('deleteAction', link);
    }
  }
});
