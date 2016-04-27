import Ember from 'ember';

export default Ember.Component.extend({
  isPasswordSame: Ember.computed('userPassword', 'userPasswordConfirmation',function(){
    let pass = this.get('userPassword');
    let passConfirm = this.get('userPasswordConfirmation');
    return pass == passConfirm;
  }),
  isPasswordLongerThanEight: Ember.computed.gte('userPassword.length', 8),
  isPasswordRegistable: Ember.computed.and('isPasswordSame', 'isPasswordLongerThanEight'),
  isEmailNotEmpty: Ember.computed.gt('userEmail.length',0),
  isRegisterable: Ember.computed.and('isEmailNotEmpty', 'isPasswordRegistable'),
  actions: {
    signup() {
      const email = this.get('userEmail');
      const password = this.get('userPassword');
      this.sendAction('requestSignUp', email, password);
    }
  }
});
