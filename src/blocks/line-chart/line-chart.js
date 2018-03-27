const LineChart = function () {
  let s;
  return {
    settings: {
      b: 'line-chart',
      // Пример установки значений
      min: 1,
      max: 5,
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
        console.log(lineChartArr);
        return lineChartArr;
      }(),
      from: Date.now() - 24*3600*1000,
      to: Date.now(),
      pointsX: []
    },
    init: function () {
      s = this.settings;

      s.values.forEach(function (item, i, arr) {
        let date = new Date(s.from + i*60000), time;
        if (date.getMinutes() === 0) {
          time = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':00';
          $(bemS(s.b, 'axis-x')).append($('<div class=' + bemC(s.b, 'axis-x-point') + '></div>').text(time).css('left', i/(s.values.length - 1)*100 + '%'));
          s.pointsX.push({position: i/(s.values.length - 1), value: item, time: time});
        }
      });
      console.log(s.pointsX);

      s.peity = $(bemS(s.b, 'peity')).text(s.values.join(',')).peity('line', {min: s.min, max: s.max});
      $(window).on('resize.lineChart', function () {
        s.peity.change();
      });

      this.bindUIActions();
    },
    bindUIActions: function () {
      $(bemS(s.b, 'inner')).on('mousemove', function (e) {
        let width = $(this).width(), minDelta = Math.abs(e.clientX - s.pointsX[0].position*width), point = 0;
        s.pointsX.forEach(function (item, i, arr) {
          if (i > 0 && Math.abs(e.clientX - item.position*width) < minDelta) {
            minDelta = Math.abs(e.clientX - item.position*width);
            point = i;
          }
        });
        $(bemS(s.b, 'label')).text(s.pointsX[point].value).css('left', s.pointsX[point].position*width + 'px');
        console.log('Select point: ' + s.pointsX[point].value + ' - ' + s.pointsX[point].time);
      });
    }
  }
}();
