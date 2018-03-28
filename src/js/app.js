'use strict';

//=require parts/helpers.js
//=require ../blocks/**/*.js

$(function () {
  FormFieldLbl.init();
  LineChart.init();
  FormSelect.init();
  SelectSm.init();

  $('[data-toggle="popover"]').popover();
});