import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import DS from 'ember-data';
export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  collection: DS.belongs_to('collection', { async: true }),
  links: DS.hasMany('link', { async: true }),
  isPublished: attr('boolean', { defaultValue: false }),
  publishedAt: attr('date'),
  createdAt: attr('date', {
    defaultValue() {return new Date();}
  }),
});
