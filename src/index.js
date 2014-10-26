(function(window) {
  'use strict';

  function toTime(sec) {
    sec = parseInt(sec, 10);

    var hours = Math.floor(sec / 3600);
    var minutes = Math.floor((sec - (hours * 3600)) / 60);
    var seconds = sec - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours   = '0' + hours; }
    if (minutes < 10) { minutes = '0' + minutes; }
    if (seconds < 10) { seconds = '0' + seconds; }

    return hours + ':' + minutes;
  }

  function readBattery(battery) {
    console.log(battery);
    console.log(toTime(battery.chargingTime));
    console.log(toTime(battery.dischargingTime));

    var percentage = parseFloat((battery.level * 100).toFixed(2)) + '%';
    document.styleSheets[0].insertRule('.battery:before{width:' + percentage + '}', 0);
  }

  if ('battery' in navigator) {
    readBattery(navigator.battery);
  } else {
    navigator.getBattery().then(readBattery);
  }


}(this));