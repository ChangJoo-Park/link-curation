import Ember from 'ember';
var inject = Ember.inject;

export default Ember.Controller.extend({
  session: inject.service(),
  actions: {
    logout() {
      let self = this;
      let session = this.get('session');
      swal({
        title: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, want out!",
        cancelButtonText: "No, cancel please!",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function(isConfirm){
        if(isConfirm) {
          session.logout(function(){
            self.transitionToRoute('home');
            swal("See you!", "I'll miss you :)", "success");
          });
        } else {
          swal("Cancelled", "Thank you:)", "error");
        }
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
