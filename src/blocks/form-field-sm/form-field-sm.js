const FormFieldSm = function () {
  const b = 'form-field-sm';
  let s;
  return {
    settings: {
      $b: $(bemS(b))
    },
    init: function () {
      s = this.settings;
      this.bindUIActions();

      s.$b.trigger('change');
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
