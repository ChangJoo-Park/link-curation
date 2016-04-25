import Ember from 'ember';
import _ from 'lodash';
import moment from 'npm:moment';

export default Ember.Controller.extend({
  newDate: new Date(),
  isPreviewMode: false,
  hasDraftLink: Ember.computed.gt('newWeekly.links.length', 0),
  hasWeeklyTitle: Ember.computed.notEmpty('newWeekly.title'),
  isResetable: Ember.computed.not('hasDraftLink'),
  isDraftAndPublishable: Ember.computed.and('hasDraftLink', 'hasWeeklyTitle'),
  actions: {
    addLinkToDraft(link) {
      if(this._isDuplicate(link)) {
        return;
      }
      let weekly = this.get('newWeekly');
      weekly.get('links').addObject(link);
    },
    saveWeekly() {
      let weekly = this.get('newWeekly');
      let collection = this.get('collection');
      weekly.set('collection', collection);
      weekly.save().then(()=>{
        collection.save().then(()=>{
          this.transitionToRoute('collections.show', collection);
        });
      });
    },
    saveDraftDescription(link) {
      link.save();
    },
    deleteDraftLink(link) {
      let weekly = this.get('newWeekly');
      weekly.get('links').removeObject(link);
    },
    resetDraft() {
      let weekly = this.get('newWeekly');
      this.set('newWeekly.title', '');
      this.set('newWeekly.description', '');
      weekly.get('links').clear();
      weekly.rollbackAttributes();
    },
    togglePreview() {
      const newMode = !this.isPreviewMode;
      this.set('isPreviewMode', newMode);
    }
  },
  // Private Methods
  _toggleDraftLink(link) {
    this.store.findRecord('link', link.get('id')).then((record)=>{
      let isDraft =  record.get('isDraft');
      record.set('isDraft', !isDraft);
      // record.save();
    });
  },

  _isDuplicate(link) {
    let links = this.get('newWeekly.links');
    return _.some(links, link);
  }
});
