import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['column'],
  isValidCounter: Ember.computed.gt('counter',0),
  isDisabled: Ember.computed.not('isValidCounter'),
  actions: {
    generateAction() {
      this.sendAction('generateAction');
    },
    deleteAction() {
      this.sendAction('deleteAction');
    }
  }
});
