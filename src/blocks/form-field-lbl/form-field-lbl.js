const FormFieldLbl = function () {
  let s;
  return {
    settings: {
      b: 'form-field-lbl'
    },
    init: function () {
      s = this.settings;
      this.bindUIActions();
    },
    bindUIActions: function () {
      $(document).on('focus', bemS(s.b), function () {
        $(this).addClass(bemC(s.b, '', 'focus'));
      }).on('blur', bemS(s.b), function (e) {
        $(this).removeClass(bemC(s.b, '', 'focus'))
          .toggleClass(bemC(s.b, '', 'has-value'), !!$(e.target).val());
      });
    }
  }
}();
