import DS from 'ember-data';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  url: attr('string'),
  title: attr('string'),
  createdAt: attr('date', {
    defaultValue() { return new Date(); }
  }),
  updatedAt: attr('date', {
    defaultValue() { return new Date(); }
  }),
  isDraft: attr('boolean', {
    defaultValue() { return false; }
  }),
  description: attr('string'),
  weekly: DS.belongsTo('weekly', { async: true, inverse: 'weekly' }),
});
