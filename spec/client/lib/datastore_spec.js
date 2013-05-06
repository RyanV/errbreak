describe("ErrBreak.Datastore", function() {
  describe("#find", function() {

  });

  describe("#save", function() {
    it("should throw an error if save is called with an invalid or empty data type", function(){
      expect(function() { ErrBreak.Datastore.save() }).toThrow("type must be a non-empty string");
      expect(function() { ErrBreak.Datastore.save(1) }).toThrow("type must be a non-empty string");
    });
  });
});
