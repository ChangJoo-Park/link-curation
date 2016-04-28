import DS from 'ember-data';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  weeklies: DS.hasMany('weekly', { async: true }),
  user: belongsTo('user')
});
