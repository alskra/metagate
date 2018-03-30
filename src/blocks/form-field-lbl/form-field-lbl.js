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

      s.$b.each(function () {
        $(this).toggleClass(bemC(b, '', 'has-value'), !!$(this).find('input').val());
      });
    },
    bindUIActions: function () {
      $(document).on('focus', bemS(b), function () {
        $(this).addClass(bemC(b, '', 'focus'));
      }).on('blur', bemS(b), function (e) {
        $(this).removeClass(bemC(b, '', 'focus'));
      }).on('change', bemS(b), function (e) {
        $(this).toggleClass(bemC(b, '', 'has-value'), !!$(e.target).val());
      });
    }
  }
}();
