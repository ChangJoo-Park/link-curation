import Ember from 'ember';
import computedFilterByQuery from 'ember-cli-filter-by-query';

export default Ember.Controller.extend({
  sortProperties: ['createdAt:desc'],
  sortedLinks: Ember.computed.sort('links', 'sortProperties'),
  queryParams: ['searchTerm'],
  queryResults: computedFilterByQuery('sortedLinks', 'title', 'searchTerm').readOnly(),
  filterByFavorite: false,
  filteredLinks: function(){
    if(this.get('filterByFavorite')) {
      return this.get('queryResults').filterBy('isFavorited', true);
    } else {
      return this.get('queryResults');
    }
  }.property('queryResults', 'filterByFavorite'),
  actions: {
    showNotification(type, message) {
      switch(type) {
        case "success":
          this.notifications.success(message, {
            autoClear: true,
            clearDuration: 1200
          });
        break;
        case "warning":
          this.notifications.warning(message, {
            autoClear: true,
            clearDuration: 1200
          });
        break;
        default:
          this.notifications.info(message, {
            autoClear: true,
            clearDuration: 1200
          });
        break;
      }
    }
  }
});
