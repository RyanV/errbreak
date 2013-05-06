describe("ErrBreak.Models.Notification", function() {
  var notification, now;

  beforeEach(function() {
    now = moment().subtract(1, "day").toDate().getTime();
    notification = new ErrBreak.Models.Notification({
      user_agent: "USER_AGENT",
      created_at: now,
      message: "MESSAGE",
      url: "fake.com/products"
    });
  });

  describe("#toJSON", function() {
    it("should return the json data formatted for use", function(){
      expect(notification.toJSON()).toEqual({
        "created_at": 'a day ago',
        "user_agent": "USER_AGENT",
        "message": "MESSAGE",
        "url": "fake.com/products"
      });
    });
  });
});
