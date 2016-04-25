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
  description: attr('string'),
});
