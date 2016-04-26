import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: [],
  store: Ember.inject.service(),
  isEditState: false,
  actions: {
    editLink() {
      this._setEditState(true);
    },
    saveLink() {
      let store = this.get('store');
      let link = this.get('link');
      link.save();
      this._setEditState(false);
      let message = "Successfully saved !";
      this.sendAction('showNotification', "success", message);
    },
    cancelLink() {
      this.get('link').rollbackAttributes();
      this._setEditState(false);
    },
    deleteLink(link) {
      link.destroyRecord();
      let message = "Successfully deleted !";
      this.sendAction('showNotification', "warning", message);
    },
    toggleFavorite() {
      let favorite = this.get('link.isFavorited');
      let link = this.get('link');
      link.set('isFavorited', !favorite);
      link.save();
      let message = !favorite ? `${link.get('title')} is Favorited !!!` : `${link.get('title')} is not Favorited !!!`;
      let type = !favorite ? 'success': '';
      this.sendAction('showNotification', type, message);
    },
  },
  // Private Methods
  _setEditState(state) {
    this.set('isEditState', state);
  }
});
