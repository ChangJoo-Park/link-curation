import Ember from 'ember';
import Firebase from 'firebase';
import { storageFor } from 'ember-local-storage';

export default Ember.Service.extend({
  sessionStorage: storageFor('session-storage'),
  ref: new Firebase('https://linkweekly.firebaseio.com/'),
  isAuthenticated: Ember.computed('sessionStorage.isAuthenticated', function(){
    console.log("Changed");
    return this.get('sessionStorage.isAuthenticated');
  }),
  isLoggedIn() {
    return this.get('isAuthenticated');
  },
  loginWithEmail(email, password, resolve) {
    console.log('loginWithEmail');
    let self = this;
    this.ref.authWithPassword({
      email: email,
      password: password
    }, function(error, authData){
      let sessionStorage = self.get('sessionStorage');
      if(error) {
        console.log("Failed", error);
        resolve(error, authData);
      } else {
        sessionStorage.set('isAuthenticated', true);
        resolve(error, authData);
      }
    });
  },

  createUser(email, password) {
    console.log(email, password);
    this.ref.createUser({
      email: email,
      password: password
    }, function(error, userData) {
      if(error) {
        console.error("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  },
  logout(resolve) {
    this.ref.unauth();
    let sessionStorage = this.get('sessionStorage');
    sessionStorage.set('isAuthenticated', false);
    resolve()
  }
});
