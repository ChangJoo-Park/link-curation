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
    reorderItems(sortedLinks, draggedModel) {
      this.set('newWeekly.links', sortedLinks);
    },
    addLinkToDraft(link) {
      if(this._isDuplicate(link)) {
        return;
      }
      let weekly = this.get('newWeekly');
      weekly.get('links').addObject(this.store.createRecord('weeklyLink',{
        url: link.get('url'),
        title: link.get('title'),
        description: link.get('description'),
        weekly: weekly
      }));
      this.notifications.success(`Add ${link.get('title')} successfully!`, {
            autoClear: true,
            clearDuration: 1200
      });
    },
    saveWeekly() {
      let weekly = this.get('newWeekly');
      let collection = this.get('collection');
      weekly.get('links').forEach((link)=>{
        link.save();
      });
      weekly.set('collection', collection);
      weekly.save().then(()=>{
        collection.save().then(()=>{
          this.transitionToRoute('collections.show', collection);
          this.notifications.success("New Weekly was created successfully", {
            autoClear: true,
            clearDuration: 1200
          });
        }.bind(this));
      });
    },
    saveDraftDescription(link) {
      // link.save();
    },
    deleteDraftLink(link) {
      let weekly = this.get('newWeekly');
      weekly.get('links').removeObject(link);
      this.notifications.warning(`Remove ${link.get('title')} successfully!`, {
            autoClear: true,
            clearDuration: 1200
      });
    },
    togglePreview() {
      const newMode = !this.isPreviewMode;
      this.set('isPreviewMode', newMode);
    }
  },
  // Private Methods
  _isDuplicate(newLink) {
    let links = this.get('newWeekly').get('links');
    let isDuplicate = false;
    links.forEach((link)=>{
      const url = link.get('url');
      if (newLink.get('url') === url) {
        isDuplicate = true;
        return isDuplicate
      }
    });
    return isDuplicate;
  }
});
