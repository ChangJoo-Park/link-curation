import Ember from 'ember';
import Firebase from 'firebase';
import { storageFor } from 'ember-local-storage';

export default Ember.Service.extend({
  sessionStorage: storageFor('session-storage'),
  ref: new Firebase('https://linkweekly.firebaseio.com/'),
  isAuthenticated: Ember.computed.notEmpty('sessionStorage.session'),
  getAuthData() {
    return this.get('sessionStorage.session');
  },
  isLoggedIn() {
    if(this.get('sessionStorage.session') == null) {
      return false;
    }
    return true;
  },
  loginWithEmail(email, password, resolve) {
    let self = this;
    this.ref.authWithPassword({
      email: email,
      password: password
    }, function(error, authData){
      let sessionStorage = self.get('sessionStorage');
      if(error) {
        resolve(error, authData);
        sessionStorage.set('session', null);
      } else {
        console.log(authData);
        sessionStorage.set('session', authData);
        resolve(error, authData);
      }
    });
  },

  createUser(email, password, resolve) {
    this.ref.createUser({
      email: email,
      password: password
    }, function(error, userData) {
      if(error) {
        console.error("Error creating user:", error);
        resolve(error,userData);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        resolve(error,userData);
      }
    });
  },
  logout(resolve) {
    this.ref.unauth();
    let sessionStorage = this.get('sessionStorage');
    sessionStorage.set('session', null);
    resolve();
  }
});
