import Ember from 'ember';
// faker for Seeder, please see the docs. https://github.com/marak/Faker.js/
import faker from 'npm:faker';

export default Ember.Controller.extend({
  linkCounter: 0,
  links: [],
  actions: {
    generateLinks() {
      const counter = parseInt(this.get('linkCounter'));
      for (let i = 0 ; i < counter ; i++ ) {
        const randomUrl = faker.internet.url();
        const randomTitle = faker.internet.domainWord();
        const randomDescription = faker.lorem.sentences();
        var link = this.store.createRecord('link', {
          title: randomTitle,
          url: randomUrl,
          description: randomDescription,
        });
        link.save();
        // reset generator
        if ( i === counter - 1 ) {
          this.set('linkCounter', 0);
          this.set('linkDone', true);
        }
      }
    },
    deleteLinks() {
      this._destroyAll(this.get('links'));
      this.set('linkDelDone', true);
    },
  },
  // Private Methods
  _destroyAll(records) {
    records.forEach((item)=>{
      item.destroyRecord();
    });
  }

});
