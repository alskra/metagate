(function () {
  "use strict";
  var request = new XMLHttpRequest();
  request.open("GET", 'img/svg-symbols.svg', true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      document.body.insertAdjacentHTML("afterbegin", request.responseText);
    }
  };
  request.send();
})();