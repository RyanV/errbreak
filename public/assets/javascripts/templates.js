(function() {
  var template = Handlebars.template, templates = ErrBreak.templates = ErrBreak.templates || {};
templates['client/application/templates/app.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n                <td class=\"span8\">";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n                <td class=\"span2\"></td>\n                <td class=\"span2\">";
  if (stack1 = helpers.created_at) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.created_at; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n              </tr>\n              ";
  return buffer;
  }

  buffer += "<div class=\"span2\" style=\"background: #f0f8ff;\">\n  <!--Sidebar content-->\n</div>\n<div class=\"span10\">\n  <div class=\"box\">\n    <div class=\"box-header\">\n      <div class=\"title\">Acceptance</div>\n    </div>\n\n    <div class=\"box-content padded\">\n      <div class=\"row-fluid\">\n        <div class=\"span12\">\n          <table class=\"table table-striped\">\n            <thead>\n            <tr>\n              <th class=\"span8\">Message & Location</th>\n              <th class=\"span2\">Deploy</th>\n              <th class=\"span2\">Created</th>\n            </tr>\n            </thead>\n            <tbody>\n              ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.notifications) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.notifications; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.notifications) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";
  return buffer;
  });
})();