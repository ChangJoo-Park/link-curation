import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['notification notification-fade'],
  classNameBindings: ['isShowing:notification-show', 'isCreate:is-primary','isDelete:is-danger'],
  isShowing: false,
  isCreate: false,
  isDelete: false,
  actions: {
    closeNotification() {
      this.set('isShowing', false);
    }
  }
});
