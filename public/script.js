const { Sleeping } = require("matter")

setInterval(setClock, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock() {
  const currentDate = new Date()
  const secondsRatio = currentDate.getSeconds() / 60
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
  setRotation(secondHand, secondsRatio)
  setRotation(minuteHand, minutesRatio)
  setRotation(hourHand, hoursRatio)
}


function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock()


// Notification Funtion // 

            console.log(Notification.permission);

            if(Notification.permission === "granted"){
            
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    if(permission === "granted"){
                        console.log(permission);                
                    }
            

                
            });
            }

            function showNotification() {
            const notification = new Notification("Hall das ist eine Nachricht", {

                    body: "Hey, mate how are you? ", 
                    icon: "img/Noora_square.png"

            } );
            }


            document.addEventListener('DOMContentLoaded', function() {
              var Calendar = FullCalendar.Calendar;
              var Draggable = FullCalendarInteraction.Draggable;
            
              var containerEl = document.getElementById('external-events');
              var calendarEl = document.getElementById('calendar');
              var checkbox = document.getElementById('drop-remove');
            
              // initialize the external events
              // -----------------------------------------------------------------
            
              new Draggable(containerEl, {
                itemSelector: '.fc-event',
                eventData: function(eventEl) {
                  return {
                    title: eventEl.innerText
                  };
                }
              });
            
              // initialize the calendar
              // -----------------------------------------------------------------
            
              var calendar = new Calendar(calendarEl, {
                plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
                header: {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                editable: true,
                droppable: true, // this allows things to be dropped onto the calendar
                drop: function(info) {
                  // is the "remove after drop" checkbox checked?
                  if (checkbox.checked) {
                    // if so, remove the element from the "Draggable Events" list
                    info.draggedEl.parentNode.removeChild(info.draggedEl);
                  }
                }
              });
            
              calendar.render();
            });


            //----------------------------------------- Funktionen für den Counter auf der Focus Seite -------------------------------------

