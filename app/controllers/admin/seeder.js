import Ember from 'ember';
// faker for Seeder, please see the docs. https://github.com/marak/Faker.js/
import faker from 'npm:faker';
import _ from 'lodash';

export default Ember.Controller.extend({
  linkCounter: 0,
  weeklyCounter: 0,
  collectionCounter: 0,
  actions: {
    generateLinks() {
      const counter = parseInt(this.get('linkCounter'));
      for (let i = 0 ; i < counter ; i++ ) {
        const randomUrl = faker.internet.url();
        const randomTitle = faker.internet.domainWord();
        const randomDescription = faker.lorem.sentences();
        const randomFavorite = _.sample([true, false]);
        var link = this.store.createRecord('link', {
          title: randomTitle,
          url: randomUrl,
          description: randomDescription,
          isFavorited: randomFavorite,
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
    generateWeeklys() {
      const weeklyCounter = parseInt(this.get('weeklyCounter'));
      const linkCounter = parseInt(this.get('linkCounter'));
      for (var i = 0 ; i < weeklyCounter ; i++ ){
        const randomTitle = `${faker.internet.domainWord()} weekly`;
        const randomDescription = `${faker.lorem.sentence()}`;
        var weekly = this.store.createRecord('weekly', {
          title: randomTitle,
          description: randomDescription
        });
        for (var j = 0 ; j < linkCounter ; j++ ){
          const randomUrl = faker.internet.url();
          const randomTitle = faker.internet.domainWord();
          const randomDescription = faker.lorem.sentences();
          const published = _.sample([true, false]);
          var link = this.store.createRecord('link', {
            title: randomTitle,
            url: randomUrl,
            description: randomDescription,
            isPublished: published,
            weekly: weekly
          });
          if(link.get('isPublished')) {
            link.set('publishedAt', new Date());
            link.save();
          }
          link.save();
          weekly.get('links').addObject(link);
          if ( i === linkCounter - 1 ) {
            this.set('linkCounter', 0);
            this.set('linkDone', true);
          }
        }
        // TODO Weekly save
        weekly.save();
        if ( i === weeklyCounter - 1 ) {
          this.set('weeklyCounter', 0);
          this.set('weeklyDone', true);
        }
      }
    },
    deleteWeeklys() {
      this._destroyAll(this.get('weeklies'));
      this.set('linkDelDone', true);
    },
    generateCollections() {
      console.log("generateCollections");
      const collectionCounter = parseInt(this.get('collectionCounter'));
      const weeklyCounter = parseInt(this.get('weeklyCounter'));
      const linkCounter = parseInt(this.get('linkCounter'));
      _.times(collectionCounter, ()=>{
        console.log("New Collection");
        const title = faker.internet.domainWord();
        const description = faker.lorem.sentence();
        var collection = this.store.createRecord('collection', {
          title: title,
          description: description
        });
        _.times(weeklyCounter, ()=>{
          console.log("New Weekly");
          const title = faker.internet.domainWord();
          const description = faker.lorem.sentence();
          var weekly = this.store.createRecord('weekly', {
            title: title,
            description: description,
            collections: collection
          });
          _.times(linkCounter, ()=>{
            console.log("New Link");
            const randomUrl = faker.internet.url();
            const randomTitle = faker.internet.domainWord();
            const randomDescription = faker.lorem.sentences();
            const published = _.sample([true, false]);
            var link = this.store.createRecord('link', {
              url: randomUrl,
              title: randomTitle,
              description: randomDescription,
              weekly: weekly
            });
            link.save();
            weekly.get('links').addObject(link);
          });
          weekly.save();
          collection.get('weeklies').addObject(weekly);
        });
        collection.save();
      });
    },
    deleteCollections() {
      console.log("deleteCollections");
    }
  },
  // Private Methods
  _destroyAll(records) {
    records.forEach((item)=>{
      item.destroyRecord();
    });
  }

});
