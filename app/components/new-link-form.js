import Ember from 'ember';
import isUrl from 'npm:validator/lib/isUrl';

export default Ember.Component.extend({
  newLink: "",
  currentFind: null,
  isSetPreview: false,
  isLinkIsNotEmpty: Ember.computed.gt('newLink.length', 0),
  isValidLink: Ember.computed('newLink', function() {
    const link = this.get('newLink');
    const result = isUrl(link);
    return result;
  }),
  validLinkLoadData:  Ember.observer('isValidLink', function(){
    const validLink = this.get('isValidLink');
    let currentRun = this.get('currentFind');
    if(validLink) {
      if(currentRun != null) {
        Ember.run.cancel(currentRun);
        this.set('currentFind', null);
      }
      var runLoop = Ember.run.later(() => {
        this.set('isSetPreview', true);
      }, 500);
      this.set('currentFind', runLoop);
    } else {
      this.set('isSetPreview', false);
    }
  })
});
