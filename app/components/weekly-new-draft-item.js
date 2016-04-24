import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  isEditDescription: false,
  actions: {
    saveDescriptionAction() {
      this.sendAction('saveDescriptionAction', this.get('link'));
      this.set('isEditDescription', false);
    },
    cancelDescriptionAction() {
      this.get('link').rollbackAttributes();
      this.set('isEditDescription', false);
    },
    editDescriptionAction() {
      this.set('isEditDescription', true);
    },
    deleteAction() {
      this.sendAction('deleteAction', this.get('link'));
    }
  }
});
