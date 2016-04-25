import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import DS from 'ember-data';
export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  collection: DS.belongsTo('collection', { async: true }),
  links: DS.hasMany('weeklyLink', { async: true }),
  isPublished: attr('boolean', { defaultValue: false }),
  publishedAt: attr('date', {
    defaultValue() {return new Date();}
  }),
  createdAt: attr('date', {
    defaultValue() {return new Date();}
  }),
});
