describe("ErrBreak.Models.Notification", function() {
  var notification, now;

  beforeEach(function() {
    now = new Date("Mon Apr 29 2013 10:48:49 GMT-0700 (PDT)").getTime();
    notification = new ErrBreak.Models.Notification({
      user_agent: "USER_AGENT",
      created_at: now,
      message: "MESSAGE"
    });
  });

  describe("#presenter", function() {
    var presentedNotification;
    beforeEach(function() {
      presentedNotification = notification.presenter();
    });

    it("should return the json data formatted for use", function(){
      expect(presentedNotification).toEqual({
        "created_at": '16 hours ago',
        "user_agent": "",
        "url": "url"
      });
    });
  });
});
