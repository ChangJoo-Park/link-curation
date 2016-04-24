import Ember from 'ember';
import isUrl from 'npm:validator/lib/isUrl';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['modal'],
  store: Ember.inject.service(),
  newLink: '',
  newTitle: '',
  newDescription: '',
  isLinkIsNotEmpty: Ember.computed.gt('newLink.length', 0),
  isValidLink: Ember.computed('newLink', function() {
    const link = this.get('newLink');
    const result = isUrl(link);
    return result;
  }),
  isNotEmptyTitle: Ember.computed.notEmpty('newTitle'),
  isSaveAvailable: Ember.computed.and('isValidLink','isNotEmptyTitle'),
  actions: {
    saveLink() {
      const url = this.newLink;
      const title = this.newTitle;
      const description = this.newDescription;
      let store = this.get('store');
      let link = store.createRecord('link', {
        url: url,
        title: title,
        description: description
      });
      link.save();
      this._clearFormAndCloseModal();
    },
    closeLinkModal() {
      var confirmation = true;
      if(!Ember.isBlank(this.newLink) ||
         !Ember.isBlank(this.newTitle) ||
         !Ember.isBlank(this.newDescription)) {
        confirmation = confirm("Are you sure?");
      }
      if(confirmation) {
        this._clearFormAndCloseModal();
      }
    }
  },

  // Private Methods
  _clearFormAndCloseModal() {
    this.set('newLink', '');
    this.set('newTitle', '');
    this.set('newDescription', '');
    $("#new-link-modal").removeClass('active');
  }
});