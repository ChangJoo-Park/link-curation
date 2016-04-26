import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('autocompletion-list', 'Integration | Component | autocompletion list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{autocompletion-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#autocompletion-list}}
      template block text
    {{/autocompletion-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
