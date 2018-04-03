const AppsGrid = function () {
  const b = 'apps-grid';
  let s;
  return {
    settings: {
      $b: $(bemS(b)),
      muuriOptions: {dragEnabled: true, fillGaps: true, dragSortPredicate: {action: 'move'}}
    },
    init: function () {
      s = this.settings;
      if (s.$b.length) {
        $(bemS(b, 'inner')).each(function () {
          new Muuri(this, s.muuriOptions).on('dragMove', function (item, event) {
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