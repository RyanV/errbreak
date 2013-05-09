(function(){
  ErrBreak.Collections.Notifications = ErrBreak.Collection.extend({
    model: function(attrs, opts) {
      return new ErrBreak.Models.Notification(attrs, opts);
    }
  });
  ErrBreak.singleton(ErrBreak.Collections.Notifications);
}());
