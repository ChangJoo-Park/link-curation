import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  uid: attr('string'),
  links: hasMany('link', { async: true }),
  collections: hasMany('collection', { async: true }),
});
