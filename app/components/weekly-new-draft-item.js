import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  actions: {
    saveDescriptionAction() {
      this.sendAction('saveDescriptionAction', this.get('link'));
    },
    deleteAction() {
      this.sendAction('deleteAction', this.get('link'));
    }
  }
});
