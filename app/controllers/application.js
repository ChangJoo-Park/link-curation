import Ember from 'ember';
var inject = Ember.inject;

export default Ember.Controller.extend({
  session: inject.service(),
  actions: {
    logout() {
      let self = this;
      let session = this.get('session');
      session.logout(function(){
        alert("!!");
        self.transitionToRoute('home');
      });
    },
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
