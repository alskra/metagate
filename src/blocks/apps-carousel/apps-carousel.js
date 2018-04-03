const AppsCarousel = function () {
  const b = 'apps-carousel';
  let s;
  return {
    settings: {
      $b: $(bemS(b)),
      slickOptions: {arrows: false, dots: true, infinite: false, touchMove: false, draggable: false}
    },
    init: function () {
      s = this.settings;

      s.$b.slick(s.slickOptions);

      this.bindUIActions();
    },
    bindUIActions: function () {

    }
  }
}();