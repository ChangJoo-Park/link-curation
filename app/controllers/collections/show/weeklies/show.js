import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deleteWeekly() {
      let self = this;
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Weekly!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel please!",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function(isConfirm){
        if(isConfirm) {
          let weekly = self.get('weekly');
          weekly.get('links').forEach((link)=>{
            link.destroyRecord();
          });
          weekly.destroyRecord();
          let collection = this.get('collection');
          self.transitionToRoute('collections.show.index', collection);
          swal("Deleted!", "Your Weekly has been deleted.", "success");
        } else {
          swal("Cancelled", "Your Weekly is safe :)", "error");
        }
      });
    }
  }
});
