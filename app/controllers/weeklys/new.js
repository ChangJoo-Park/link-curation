import Ember from 'ember';
import _ from 'lodash';

export default Ember.Controller.extend({
  weeklyTitle: '',
  descriptionOfWeek: '',
  draftLinks: Ember.computed('links.@each.isDraft', function() {
    return this.get('links').filterBy('isDraft');
  }),
  hasDraftLink: Ember.computed.gt('draftLinks.length', 0),
  hasWeeklyTitle: Ember.computed.notEmpty('weeklyTitle'),
  isResetable: Ember.computed.not('hasDraftLink'),
  isDraftAndPublishable: Ember.computed.and('hasDraftLink', 'hasWeeklyTitle'),
  actions: {
    addLinkToDraft(link) {
      console.log("Add");
      if(this._isDuplicate(link)) {
        return;
      }
      this._toggleLink(link);
    },
    deleteDraftLink(link) {
      this._toggleLink(link);
    },
    resetDraft() {
      this.get('draftLinks').forEach((link) => {
        this._toggleLink(link);
      }.bind(this));
    }
  },
  // Private Methods
  _toggleLink(link) {
    this.store.findRecord('link', link.get('id')).then((record)=>{
      let isDraft =  record.get('isDraft');
      record.set('isDraft', !isDraft);
      record.save();
    });
  },

  _isDuplicate(link) {
    return _.some(this.draftLinks, link);
  }
});
