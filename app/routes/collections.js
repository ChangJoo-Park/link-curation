import Ember from 'ember';
export default Ember.Route.extend({
  actions: {
    openCollectionModal() {
      $('#new-collection-modal').addClass('active');
    }
  }
});
