import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  actions: {
    saveDescriptionAction(link) {
      this.sendAction('saveDescriptionAction', this.get('link'));
    },
    deleteAction(link) {
      this.sendAction('deleteAction', link);
    }
  }
});
