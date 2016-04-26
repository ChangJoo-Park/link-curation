import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    openLinkModal() {
      $("#new-link-modal").addClass('active');
    },
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
