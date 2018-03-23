const FormFieldLbl = function () {
  let s, blockName = 'form-field-lbl';

  return {
    settings: {
      b: `.${blockName}`,
      eInput: `.${blockName}__input`
    },
    init: function () {
      s = this.settings;
      this.bindUIActions();
    },
    bindUIActions: function () {
      $(document).on('focus', s.eInput, function () {
        $(this).closest(s.b).addClass(`${blockName}--focus`);
      });
      $(document).on('blur', s.eInput, function () {
        $(this).closest(s.b).removeClass(`${blockName}--focus`)
          .toggleClass(`${blockName}--has-value`, !!$(this).val());
      });
    }
  }
}();
