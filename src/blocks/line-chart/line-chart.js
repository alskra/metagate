const LineChart = function () {
  const b = 'line-chart';
  let s;
  return {
    settings: {
      $b: $(bemS(b)),
      $eLabel: $(bemS(b, 'label')),
      // Пример установки значений
      yMin: 1,
      yMax: 5,
      xMin: Date.now() - 24*3600*1000,
      xMax: Date.now(),
      currency: '$',
      pointsX: [],
      values: function () {
        let lineChartArr = [], value;
        for (let i = 0; i < 24*60 + 1; i++) {
          value = Math.random()*5;
          if (i > 0 && value - lineChartArr[i - 1] > 0.2) {
            value = lineChartArr[i - 1] + Math.random()*0.2;
          } else if (i > 0 && value - lineChartArr[i - 1] < -0.2) {
            value = lineChartArr[i - 1] - Math.random()*0.2;
          }
          if (value < 1) value++;
          lineChartArr.push(Math.round(value*100)/100);
        }
        //console.log(lineChartArr);
        return lineChartArr;
      }()
    },
    init: function () {
      s = this.settings;

      s.values.forEach(function (item, i, arr) {
        let date = new Date(s.xMin + i*60000), time;
        if (date.getMinutes() === 0) {
          time = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':00';
          $(bemS(b, 'axis-x')).append($('<div class=' + bemC(b, 'axis-x-point') + '></div>').text(time).css('left', i/(s.values.length - 1)*100 + '%'));
          s.pointsX.push({position: i/(s.values.length - 1), value: item, time: time});
        }
      });
      //console.log(s.pointsX);

      s.peity = $(bemS(b, 'peity')).text(s.values.join(',')).peity('line', {min: s.yMin, max: s.yMax});
      $(bemS(b, 'ruler', 'min')).attr('data-ruler', s.currency + s.yMin);
      $(bemS(b, 'ruler', 'max')).attr('data-ruler', s.currency + s.yMax);

      this.bindUIActions();
    },
    bindUIActions: function () {
      // Update on resize
      $(window).on('resize.lineChart', function () {
        s.peity.change();
      });

      // Label on pointsX
      $(bemS(b, 'inner'))
        .on('mouseenter', function () {
          s.$eLabel.addClass(bemC(b, 'label', 'visible'));
        })
        .on('mouseleave', function () {
          s.$eLabel.removeClass(bemC(b, 'label', 'visible'));
          $(bemS(b, 'axis-x-point')).removeClass(bemC(b, 'axis-x-point', 'current'));
        })
        .on('mousemove', function (e) {
          let width = $(this).width(),
            height = $(this).height(),
            pointIndex = 0,
            minDelta = Math.abs(e.clientX - s.pointsX[0].position * width);
          s.pointsX.forEach(function (item, i, arr) {
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
          $(bemS(b, 'axis-x-point')).removeClass(bemC(b, 'axis-x-point', 'current')).eq(pointIndex).addClass(bemC(b, 'axis-x-point', 'current'));

          //console.log('Current point: ' + s.pointsX[pointIndex].time + ' - ' + s.pointsX[pointIndex].value);
        });
    }
  }
}();
