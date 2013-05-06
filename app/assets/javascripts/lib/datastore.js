/**
 *
 * {
 *    _tables: {
 *      "CONTENT": {
 *        classConstructor: ErrBreak.Content,
 *        data: {
 *          123: {
 *            last_updated: 4412314123,
 *            data: {
 *              id: 123,
 *              name: "contentName"
 *            }
 *          },
 *          15332: {
 *            last_updated: 5433134614,
 *            data: {
 *              id: 15332,
 *              anotherKey: "value"
 *            }
 *          }
 *        }
 *      },
 *      "PRODUCT": {
 *        classConstructor: ErrBreak.Product,
 *        data: {
 *        }
 *      }
 *    }
 * }
 */

ErrBreak.Datastore = {
  _tables: {},
  _reset: function() {
    ErrBreak.Datastore._tables = {};
  },
  find: function(dataType, options) {

  },
  save: function(dataType, data) {
//    if (!_.isEmpty(dataType) || !_.isString(dataType)) {
//      throw new Error("data-type must be a non-empty string");
//    }
  },
  registerType: function(dataType, options) {

  }
};
