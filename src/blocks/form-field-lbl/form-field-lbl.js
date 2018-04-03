const FormFieldLbl = function () {
  const b = 'form-field-lbl';
  let s;
  return {
    settings: {
      $b: $(bemS(b))
    },
    init: function () {
      s = this.settings;
      this.bindUIActions();

      $(bemS(b, 'input')).trigger('change');
    },
    bindUIActions: function () {
      $(document).on('focus', bemS(b), function () {
        $(this).addClass(bemC(b, '', 'focus'));
      }).on('blur', bemS(b), function () {
        $(this).removeClass(bemC(b, '', 'focus'));
      }).on('change', bemS(b), function (e) {
        $(this).toggleClass(bemC(b, '', 'has-value'), !!$(e.target).val() || $(e.target).is(':-webkit-autofill'));
      });
    }
  }
}();
