import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  url: attr('string'),
  title: attr('string'),
  description: attr('string'),
  weekly: belongsTo('weekly')
});
