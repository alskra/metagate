'use strict';

var bemS = function bemS(b) {
  var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var m = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return '.' + b + (e ? '__' + e : '') + (m ? '--' + m : '');
}; // return BEM class selector


var bemC = function bemC(b) {
  var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var m = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return b + (e ? '__' + e : '') + (m ? '--' + m : '');
}; // return BEM class


var FormFieldLbl = function() {
  var s;
  return {
    settings: {
      b: 'form-field-lbl'
    },
    init: function init() {
      s = this.settings;
      this.bindUIActions();
    },
    bindUIActions: function bindUIActions() {
      $(document).on('focus', bemS(s.b), function() {
        $(this).addClass(bemC(s.b, '', 'focus'));
      }).on('blur', bemS(s.b), function(e) {
        $(this).removeClass(bemC(s.b, '', 'focus')).toggleClass(bemC(s.b, '', 'has-value'), !!$(e.target).val());
      });
    }
  };
}();

$(function() {
  FormFieldLbl.init();
});
//# sourceMappingURL=app.js.map
