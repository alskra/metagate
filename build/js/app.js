"use strict";

var FormFieldLbl = function() {
  var s,
    blockName = 'form-field-lbl';
  return {
    settings: {
      b: ".".concat(blockName),
      eInput: ".".concat(blockName, "__input")
    },
    init: function init() {
      s = this.settings;
      this.bindUIActions();
    },
    bindUIActions: function bindUIActions() {
      $(document).on('focus', s.eInput, function() {
        $(this).closest(s.b).addClass("".concat(blockName, "--focus"));
      });
      $(document).on('blur', s.eInput, function() {
        $(this).closest(s.b).removeClass("".concat(blockName, "--focus")).toggleClass("".concat(blockName, "--has-value"), !!$(this).val());
      });
    }
  };
}();

$(function() {
  FormFieldLbl.init();
});
//# sourceMappingURL=app.js.map
