var path = require("path"),
  Notification = require(path.join(__dirname, "../models/notification"));

module.exports = {
  create: function(req, res) {
    var body = req.body;
    var data = {};
    data.message = body.message || null;
    data.environment = body.environment || null;
    data.user_agent = body.user_agent || null;
    data.stack_trace = body.stack_trace;
    if (data.stack_trace) {
      try {
        data.stack_trace = JSON.stringify(body.stack_trace);
      } catch (e) {
        data.stack_trace = null;
      }
    } else {
      data.stack_trace = null;
    }
//    data.created_at = new Date().toString();
//    data.updated_at = new Date().toString();

    console.info(data);
    Notification.create(data, function(err, result) {
      if (err) {
        console.info(err);
        res.json({status: 500, error: err});
      } else {
        console.info("result: ", result);
        res.json({status: 200});
      }
    });

//    client.query("INSERT INTO notifications" +
//      "(message, environment, user_agent, stack_trace, created_at, updated_at) " +
//      "VALUES($1, $2, $3, $4, now(), now())",
//      [message, environment, user_agent, stack_trace],
//      function(err) {
//        res.status(200);
//        if (err) {
//          res.json({status: 500});
//        } else {
//          res.json({status: 200});
//        }
//        res.end();
//      });
  }
};
