import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['createdAt:desc'],
  sortedIssues: Ember.computed.sort('model', 'sortProperties'),
});
