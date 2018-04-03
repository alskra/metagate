'use strict';

//=require parts/helpers.js
//=require ../blocks/**/*.js

$(function () {
  FormFieldLbl.init();
  LineChart.init();
  FormSelect.init();
  SelectSm.init();
  Wallet.init();
  FormFieldSm.init();
  FieldFile.init();
  AppsGrid.init();
  AppsCarousel.init();

  $('[data-toggle="popover"]').popover();
});