describe("ErrBreak.Routers.Main", function() {
  var appRouter;

  beforeEach(function() {
    appRouter = new ErrBreak.Routers.Main();
  });

  it("should be an instance of ErrBreak.Router", function() {
    expect(appRouter instanceof ErrBreak.Router).toEqual(true);
  });
});
