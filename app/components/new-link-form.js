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
    const link = this.get('newLink');
    if(validLink) {
      if(currentRun != null) {
        Ember.run.cancel(currentRun);
        this.set('currentFind', null);
      }
      var runLoop = Ember.run.later(() => {
        $.ajax({
          url: link,
          type: 'GET',
          success: function(res) {
              console.log(res);
          }
        });

        this.set('isSetPreview', true);
      }, 500);
      this.set('currentFind', runLoop);
    } else {
      this.set('isSetPreview', false);
    }
  })
});
