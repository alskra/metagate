'use strict';

var bemS = function bemS(b) {
  var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var m = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return '.' + b + (e ? '__' + e : '') + (m ? '--' + m : '');
}; // return BEM class selector


var bemC = function bemC(b) {
  var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var m = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return b + (e ? '__' + e : '') + (m ? '--' + m : '');
}; // return BEM class


var FormFieldLbl = function() {
  var s;
  return {
    settings: {
      b: 'form-field-lbl'
    },
    init: function init() {
      s = this.settings;
      this.bindUIActions();
    },
    bindUIActions: function bindUIActions() {
      $(document).on('focus', bemS(s.b), function() {
        $(this).addClass(bemC(s.b, '', 'focus'));
      }).on('blur', bemS(s.b), function(e) {
        $(this).removeClass(bemC(s.b, '', 'focus')).toggleClass(bemC(s.b, '', 'has-value'), !!$(e.target).val());
      });
    }
  };
}();

var FormSelect = function() {
  var b = 'form-select';
  var s;
  return {
    settings: {
      $b: $(bemS(b))
    },
    init: function init() {
      s = this.settings;
      this.bindUIActions();
      s.$b.on('loaded.bs.select', function() {
        var $filterOption = $(this).nextAll('.dropdown-menu').addClass(bemC(b, 'menu')).end().nextAll('.dropdown-toggle').removeClass('dropdown-toggle btn').addClass(bemC(b, 'toggle')).find('.filter-option').clone(true);
        $(this).nextAll(bemS(b, 'toggle')).empty().append($filterOption).append('<svg class="isvg-angle-d" role="img">\n' + '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#isvg-angle-d"></use>\n' + '</svg>');
      }).selectpicker({
        style: 'form-field'
      });
    },
    bindUIActions: function bindUIActions() {}
  };
}();

var LineChart = function() {
  var b = 'line-chart';
  var s;
  return {
    settings: {
      $b: $(bemS(b)),
      $eLabel: $(bemS(b, 'label')),
      // Пример установки значений
      yMin: 1,
      yMax: 5,
      xMin: Date.now() - 24 * 3600 * 1000,
      xMax: Date.now(),
      currency: '$',
      pointsX: [],
      values: function() {
        var lineChartArr = [],
          value;

        for (var i = 0; i < 24 * 60 + 1; i++) {
          value = Math.random() * 5;

          if (i > 0 && value - lineChartArr[i - 1] > 0.2) {
            value = lineChartArr[i - 1] + Math.random() * 0.2;
          } else if (i > 0 && value - lineChartArr[i - 1] < -0.2) {
            value = lineChartArr[i - 1] - Math.random() * 0.2;
          }

          if (value < 1) value++;
          lineChartArr.push(Math.round(value * 100) / 100);
        } //console.log(lineChartArr);


        return lineChartArr;
      }()
    },
    init: function init() {
      s = this.settings;
      s.values.forEach(function(item, i, arr) {
        var date = new Date(s.xMin + i * 60000),
          time;

        if (date.getMinutes() === 0) {
          time = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':00';
          $(bemS(b, 'axis-x')).append($('<div class=' + bemC(b, 'axis-x-point') + '></div>').text(time).css('left', i / (s.values.length - 1) * 100 + '%'));
          s.pointsX.push({
            position: i / (s.values.length - 1),
            value: item,
            time: time
          });
        }
      }); //console.log(s.pointsX);

      s.peity = $(bemS(b, 'peity')).text(s.values.join(',')).peity('line', {
        min: s.yMin,
        max: s.yMax
      });
      $(bemS(b, 'ruler', 'min')).attr('data-ruler', s.currency + s.yMin);
      $(bemS(b, 'ruler', 'max')).attr('data-ruler', s.currency + s.yMax);
      this.bindUIActions();
    },
    bindUIActions: function bindUIActions() {
      // Update on resize
      $(window).on('resize.lineChart', function() {
        s.peity.change();
      }); // Label on pointsX

      $(bemS(b, 'inner')).on('mouseenter', function() {
        s.$eLabel.addClass(bemC(b, 'label', 'visible'));
      }).on('mouseleave', function() {
        s.$eLabel.removeClass(bemC(b, 'label', 'visible'));
        $(bemS(b, 'axis-x-point')).removeClass(bemC(b, 'axis-x-point', 'current'));
      }).on('mousemove', function(e) {
        var width = $(this).width(),
          height = $(this).height(),
          pointIndex = 0,
          minDelta = Math.abs(e.clientX - s.pointsX[0].position * width);
        s.pointsX.forEach(function(item, i, arr) {
          if (i > 0 && Math.abs(e.clientX - item.position * width) < minDelta) {
            pointIndex = i;
            minDelta = Math.abs(e.clientX - item.position * width);
          }
        });
        s.$eLabel.css({
          left: s.pointsX[pointIndex].position * width,
          height: (s.pointsX[pointIndex].value - s.yMin) / (s.yMax - s.yMin) * height
        });
        $(bemS(b, 'label-num')).text(s.currency + s.pointsX[pointIndex].value);
        $(bemS(b, 'axis-x-point')).removeClass(bemC(b, 'axis-x-point', 'current')).eq(pointIndex).addClass(bemC(b, 'axis-x-point', 'current')); //console.log('Current point: ' + s.pointsX[pointIndex].time + ' - ' + s.pointsX[pointIndex].value);
      });
    }
  };
}();

var SelectSm = function() {
  var b = 'select-sm';
  var s;
  return {
    settings: {
      $b: $(bemS(b))
    },
    init: function init() {
      s = this.settings;
      this.bindUIActions();
      s.$b.on('loaded.bs.select', function() {
        var $filterOption = $(this).nextAll('.dropdown-menu').addClass(bemC(b, 'menu')).end().nextAll('.dropdown-toggle').removeClass('dropdown-toggle btn').addClass(bemC(b, 'toggle')).find('.filter-option').clone(true);
        $(this).nextAll(bemS(b, 'toggle')).empty().append($filterOption).append('<svg class="isvg-angle-d" role="img">\n' + '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#isvg-angle-d"></use>\n' + '</svg>');
      }).selectpicker({
        style: '',
        width: 'fit'
      });
    },
    bindUIActions: function bindUIActions() {}
  };
}();

$(function() {
  FormFieldLbl.init();
  LineChart.init();
  FormSelect.init();
  SelectSm.init();
  $('[data-toggle="popover"]').popover();
});
//# sourceMappingURL=app.js.map
