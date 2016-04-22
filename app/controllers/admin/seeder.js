import Ember from 'ember';

export default Ember.Controller.extend({
  linkCounter: 0,
  links: [],
  actions: {
    generateLinks() {
      const counter = parseInt(this.get('linkCounter'));
      for (let i = 0 ; i < counter ; i++ ) {
        console.log(i);
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
