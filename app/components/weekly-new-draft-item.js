import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  isEditDescription: false,
  tempDescription: '',
  actions: {
    saveDescriptionAction() {
      // this.sendAction('saveDescriptionAction', this.get('link'));
      this.set('isEditDescription', false);
    },
    cancelDescriptionAction() {
      let link = this.get('link');
      let temp = this.get('tempDescription');
      console.log(temp)
      link.set('description', temp);
      this.set('isEditDescription', false);
    },
    editDescriptionAction() {
      let link = this.get('link');
      let temp = this.get('tempDescription');
      temp = link.get('description');
      this.set('isEditDescription', true);
    },
    deleteAction() {
      this.sendAction('deleteAction', this.get('link'));
    }
  }
});
