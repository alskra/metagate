const FieldFile = function () {
  const b = 'field-file';
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
      $(document).on('change', bemS(b), function (e) {
        let hasValue = !!e.target.files.length;
        $(this).find(bemS(b, 'fake'))
          .text(hasValue ? e.target.files[0].name : $(this).data('placeholder'))
          .toggleClass('form-field-sm--has-value', hasValue);
      });
    }
  }
}();
