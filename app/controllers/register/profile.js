import Ember from 'ember';
var inject = Ember.inject;

export default Ember.Controller.extend({
  isNameNotEmpty: Ember.computed.notEmpty('newName'),
  isNameLongerThanThree: Ember.computed.gte('newName.length', 3),
  isSaveAvailable: Ember.computed.and('isNameNotEmpty', 'isNameLongerThanThree'),
  session: inject.service(),
  actions: {
    addProfile() {
      let session = this.get('session');
      const auth = session.getAuthData();
      let newUserProfile = this.store.createRecord('user', {
        name: this.get('newName'),
        uid: auth.uid
      });
      newUserProfile.save().then(()=>{
        this.transitionToRoute('home');
      }.bind(this));
    }
  }
});
