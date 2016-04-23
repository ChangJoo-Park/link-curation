import DS from 'ember-data';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';


export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  footer: attr('string'),
  weeklys: DS.hasMany('weekly')
});
