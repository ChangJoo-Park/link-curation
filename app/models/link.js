import DS from 'ember-data';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import isUrl from 'npm:validator/lib/isUrl';

export default Model.extend({
  url: attr('string'),
  title: attr('string'),
  createdAt: attr('date', {
    defaultValue() { return new Date(); }
  }),
  updatedAt: attr('date', {
    defaultValue() { return new Date(); }
  }),
  description: attr('string'),
  isFavorited: attr('boolean', {
    defaultValue() { return false; }
  }),
  // Validation Computed
  isNotEmptyTitle: Ember.computed.notEmpty('title'),
  isLinkIsNotEmpty: Ember.computed.gt('url.length', 0),
  isValidLink: Ember.computed('url', function() {
    const link = this.get('url');
    const result = isUrl(link);
    return result;
  }),
  isSaveAvailable: Ember.computed.and('isValidLink','isNotEmptyTitle'),
});
