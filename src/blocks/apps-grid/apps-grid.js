const AppsGrid = function () {
  const b = 'apps-grid';
  let s;
  return {
    settings: {
      $b: $(bemS(b)),
      muuriOptions: {
        layoutDuration: 400,
        layoutEasing: 'ease',
        dragEnabled: true,
        dragSortInterval: 50,
        //dragContainer: document.querySelector('.apps-carousel'),
        dragReleaseDuration: 400,
        dragReleseEasing: 'ease',
        layout: {rounding: false}//,
        //dragSortPredicate: {action: 'swap'}
      }
    },
    init: function () {
      s = this.settings;

      if (s.$b.length) {
        $(bemS(b, 'inner')).each(function () {
          let grid = new Muuri(this, s.muuriOptions).on('dragStart', function (item, event) {
          }).on('dragMove', function (item, event) {
            //console.log('dragMove');
            //console.log(event);
            //console.log(item);
            $(item._element).on('click.Link', function () {
              return false;
            });
          }).on('dragEnd', function (item, event) {
            //console.log('dragEnd');
            //console.log(event);
            //console.log(item);
            setTimeout(function () {
              $(item._element).off('click.Link');
            }, 50);
          });
        });
      }

      this.bindUIActions();
    },
    bindUIActions: function () {

    }
  }
}();