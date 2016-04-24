import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    openLinkModal() {
      $("#new-link-modal").addClass('active');
    },
  }
});
