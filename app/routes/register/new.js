import Ember from 'ember';
var inject = Ember.inject;

export default Ember.Route.extend({
  session: inject.service(),
  beforeModel() {
    let session = this.get('session');
    if(session.isLoggedIn()) {
      this.transitionTo('application');
    }
  },
  actions: {
    signup(email, password) {
      let self = this;
      var session = this.get('session');
      // TODO: Need to check confirmation
      session.createUser(email, password, function(error, authData){
        if(error) {
          self.notifications.warning(error, {
            autoClear: true,
            clearDuration: 3000
          });
        } else { // Successful
          self.notifications.success("Successfully Registered", {
            autoClear: true,
            clearDuration: 3000
          });
          session.loginWithEmail(email, password, function(error, authData){
            if(error) {

            } else {
              self.transitionTo('home');
            }
          })
        }
      });
    }
  }
});
