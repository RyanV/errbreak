module.exports.config = {
  message: {
    type: "text"
  },
  environment: {
    type: "text",
    required: true
  },
  user_agent: {
    type: "text"
  },
  stack_trace: {
    type: "object"
  },
  created_at: {
    type: "date",
    time: true
  },
  resolved: {
    type: "boolean"
  },
  updated_at: {
    type: "date",
    time: true
  }
};

module.exports.load = function(db, cb) {
  db.define("notification", module.exports.config);
  return cb();
};
