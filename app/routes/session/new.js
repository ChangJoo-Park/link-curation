import Ember from 'ember';
var inject = Ember.inject;

export default Ember.Route.extend({
  session: inject.service(),
  beforeModel() {
    console.log("Before Model");
    let session = this.get('session');
    if(session.isLoggedIn()) {
      console.log('session check you are logged in');
      this.transitionTo('application');
    }
  },
  actions: {
    login() {
      let ctrl = this.get('controller');
      ctrl.set('isLoading', true);
      $(".form-submit").blur();
      ctrl.set('errorMessage', null);
      let self = this;
      let session = this.get('session');
      let controller = this.get('controller');
      const email = controller.get('userEmail');
      const password = controller.get('userPassword');
      Ember.run(()=>{
        session.loginWithEmail(email, password, function(error, authData){
          ctrl.set('isLoading', false);
          if(error) {
            ctrl.set('errorMessage', error);
          } else {
            self.transitionTo('application');
          }
        });
      });
    }
  },

  setupController(controller, model){
    this._super(controller);
    controller.set('isLoading', false);
    controller.set('errorMessage', '');
  }
});
