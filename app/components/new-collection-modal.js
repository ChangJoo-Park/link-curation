import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['modal'],
  store: Ember.inject.service(),
  newTitle: '',
  newDescription: '',
  isNotEmptyTitle: Ember.computed.gt('newTitle.length', 0),
  actions: {
    saveCollection() {
      const title = this.newTitle;
      const description = this.newDescription;
      let store = this.get('store');
      let collection = store.createRecord('collection', {
        title: title,
        description: description
      });
      collection.save();
      let message =`${title} is successfully saved.`;
      this.sendAction('showNotification', "success", message);
      this._clearFormAndCloseModal();
    },
    closeCollectionModal() {
      this._clearFormAndCloseModal();
    }
  },
  _clearFormAndCloseModal() {
    this.set('newTitle', '');
    this.set('newDescription', '');
    $("#new-collection-modal").removeClass('active');
  }

});
