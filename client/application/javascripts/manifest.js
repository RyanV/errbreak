module.exports = [
  "errbreak.js",
  "events/index.js",
  "lib/singleton.js",
  "lib/datastore.js",
  "lib/Model.js",
  "lib/Collection.js",
  "lib/View.js",
  "lib/Router.js",
  "utils/index.js",
  "utils/history.js",
  "models/notification.js",
  "collections/notifications.js",
  "views/base_view.js",
  "views/AppView.js",
  "views/header.js",
  "views/footer.js",
  "errbreak_router.js",
  "errbreak_router/broadcaster.js",
  "errbreak_router/base_router.js",     // extends Support.SwappingRouter - Top Level
  "errbreak_router/partial_router.js",  // extends ErrBreakRouter.BaseRouter
  "errbreak_router/router.js",          // extends ErrBreakRouter.BaseRouter
  "routers/main.js",
  "routers/header.js",
  "routers/footer.js"
];
