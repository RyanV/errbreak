var ErrBreak = {
  Views: {},
  Models: {},
  Collections: {},
  init: function() {

  }
};

(function() {
  ErrBreak.Model = Backbone.Model.extend({

  });
}());

(function(){
  ErrBreak.Collection = Backbone.Collection.extend({

  });
}());

(function() {
  ErrBreak.View = Backbone.View.extend({

  });
}());

ErrBreak.singleton = function(klass) {
  klass.getInstance = function() {
    if (!klass._instance) {
      klass._instance = new klass();
    }
    return klass._instance;
  };
};

(function(){
  ErrBreak.AppView = ErrBreak.View.extend({

  });
}());

(function(){
  ErrBreak.Models.Notification = ErrBreak.Model.extend({

  });
}());

(function(){
  ErrBreak.Collections.Notifications = ErrBreak.Collection.extend({

  });
  ErrBreak.singleton(ErrBreak.Collections.Notifications);
}());
