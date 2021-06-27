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
