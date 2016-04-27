import Ember from 'ember';
var inject = Ember.inject;

export default Ember.Route.extend({
  session: inject.service(),
  actions: {
    signup() {
      var session = this.get('session');
      let controller = this.get('controller');
      const email = controller.get('userEmail');
      const password = controller.get('userPassword');
      // TODO: Need to check confirmation
      session.createUser(email, password);
    }
  }
});
