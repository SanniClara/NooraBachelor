


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





            //----------------------------------------- Funktionen für den Counter auf der Focus Seite -------------------------------------

