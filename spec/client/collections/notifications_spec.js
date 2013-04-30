describe("ErrBreak.Collections.Notifications", function() {
  var notifications;

  beforeEach(function() {
    ErrBreak.Collections.Notifications._instance = undefined;
    notifications = ErrBreak.Collections.Notifications.getInstance();
  });

  afterEach(function() {
    ErrBreak.Collections.Notifications._instance = undefined;
  });

  it("#getInstance", function() {
    expect(notifications instanceof ErrBreak.Collections.Notifications).toEqual(true);
  });

  it("#model", function() {
    expect(notifications.model() instanceof ErrBreak.Models.Notification).toEqual(true);
  })
});
