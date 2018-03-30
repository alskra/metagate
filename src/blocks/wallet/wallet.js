const Wallet = function () {
  const b = 'wallet';
  let s;
  return {
    settings: {
      $b: $(bemS(b))
    },
    init: function () {
      s = this.settings;
      this.bindUIActions();
    },
    bindUIActions: function () {
      $(document).on('click', bemS(b, 'head'), function (e) {
        $(this).closest(bemS(b)).toggleClass(bemC(b, '', 'open'));
      });
    }
  }
}();
