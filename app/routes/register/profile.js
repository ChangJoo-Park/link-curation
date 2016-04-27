import Ember from 'ember';
var inject = Ember.inject;

export default Ember.Route.extend({
  session: inject.service(),
  beforeModel() {
    let session = this.get('session');
    if(session.isLoggedIn()) {
      const auth = session.getAuthData();
      const uid = auth.uid;
      let user = this.store.query('user', { filter: { uid: uid }});
      if(user.get('length') != 0) {
        this.transitionTo('application');
      }
    } else {
      this.transitionTo('application');
    }
  },
});
