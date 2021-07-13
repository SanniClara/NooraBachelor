$(document).ready(function () {
  var ValueLicht;
  var pushNotificationCounter = 0;
  const details = document.getElementById("details");
  // Feature detection
  if (window.AmbientLightSensor) {
    try {
      const sensor = new AmbientLightSensor();
      // Detect changes in the light
      sensor.onreading = () => {
        details.innerHTML = sensor.illuminance;
        ValueLicht = sensor.illuminance;

        // Read the light levels in lux 
        // < 50 is dark room
        if (sensor.illuminance < 50) {
          document.body.className = 'darkLight';
        } else {
          document.body.className = 'brightLight';
        }
      }

      // Has an error occured?
      sensor.onerror = event => document.getElementById("details").innerHTML = event.error.message;
      sensor.start();
    } catch (err) {
      details.innerHTML = err.message;
    }
  } else {
    details.innerHTML = 'It looks like your browser doesnt support this feature';
  }
  //Chat Visualisierungs Teil. Hier wird die Library Canvas.js eingebunden und 

  window.onload = function () {

    var dps = []; // dataPoints
    //console.log(dps)
    var chart = new CanvasJS.Chart("chartContainer", {

      title: {
        text: ""
      },
      data: [{
        type: "line",
        dataPoints: dps
      }]
    });

    var xVal = 0;
    var yVal = 100;
    var updateInterval = 1000;
    var dataLength = 3600; // number of dataPoints visible at any point

    var updateChart = function (count) {

      count = count || 1;

      for (var j = 0; j < count; j++) {
        yVal = ValueLicht;
        dps.push({
          x: xVal,
          y: yVal
        });
        xVal++;

      }

      if (dps.length > dataLength) {
        dps.shift();
      }

      chart.render();

      var url = "/LichtValueEndpoint";
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.responseText === "Ok") {
          alert("Du hast den WErt auf über 10000 gebracht. Sas gibt + 10 Punkte! Schau mal bei deinem Punktekonto vorbei");
        }
      };
      var data = {
        "id": ValueLicht
      };
      //console.log(data.id);
      //console.log(dps);

      //console.log(typeof data.id)
      xhr.send(data.id);
    };

    updateChart(dataLength);
    var check = setInterval(function () {
      // var storePointRequest = document.getElementById("storePointRequest").innerHTML
      // if (storePointRequest === "req") {
      // } else {

      // }
      updateChart()
    }, updateInterval);

  }
  // Notification Funtion // 
  console.log(Notification.permission);
  if (Notification.permission === "granted") {
    showNotification();
    if (window.location.href === "http://localhost:8000/luxValue") {
    }
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        //console.log(permission);                
      }

    });
  }
  
  function showNotification() {
    const notification = new Notification("Sonne, Sonne, Sonne!", {
      body: "Es wird mal wieder Zeit nach draußen zu gehen!",
      icon: "img/Noora_square.png"
    });
  }
})
