import Ember from 'ember';

export default Ember.Controller.extend({
  isEditState: false,
  actions: {
    editCollection() {
      this.changeEditState(true);
    },
    saveCollection() {
      let collection = this.get('collection');
      collection.save();
      this.changeEditState(false);
      this.notifications.success("Collection was saved successfully", {
        autoClear: true,
        clearDuration: 1200
      });
    },
    deleteCollection() {
      let self = this;
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Collection!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel please!",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function(isConfirm){
        if(isConfirm) {
          let collection = self.get('collection');
          collection.destroyRecord();
          self.changeEditState(false);
          self.transitionToRoute('collections.index');
          swal("Deleted!", "Your collection has been deleted.", "success");
        } else {
          swal("Cancelled", "Your collection is safe :)", "error");
        }
      });
    },
    cancelEdit() {
      let collection = this.get('collection');
      collection.rollbackAttributes();
      this.changeEditState(false);
    }
  },
  // Private Methods
  changeEditState(isEdit) {
    this.set('isEditState', isEdit);
  }

});
