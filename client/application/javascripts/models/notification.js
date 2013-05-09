(function(){
  ErrBreak.Models.Notification = ErrBreak.Model.extend({
    toJSON: function() {
      var json = _.clone(this.attributes);
      return _.extend(json, {
        created_at: moment(json.created_at).fromNow()
      });
    }
  });
}());
