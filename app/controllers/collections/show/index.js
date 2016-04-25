import Ember from 'ember';

export default Ember.Controller.extend({
  isEditState: false,
  actions: {
    editCollection() {
      this.changeEditState(true);
    },
    saveCollection() {
      let collection = this.get('model');
      collection.save();
      this.changeEditState(false);
    },
    cancelEdit() {
      let collection = this.get('model');
      collection.rollbackAttributes();
      this.changeEditState(false);
    }
  },
  // Private Methods
  changeEditState(isEdit) {
    this.set('isEditState', isEdit);
  }

});
