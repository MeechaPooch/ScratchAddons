export default async function ({ addon, global, console }) {
        //CODE USED FROM: https://hackthestuff.com/article/how-to-check-if-user-is-active-or-inactive-in-webpage-using-javascript-or-jquery
        let STATUS = "active"

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        async function inactivityTime() {
            var time;
            
            // events
            window.onload = resetTime;
            window.onclick = resetTime;
            window.onkeypress = resetTime;
            window.ontouchstart = resetTime;
            window.onmousemove = resetTime;
            window.onmousedown = resetTime;
            window.addEventListener('scroll', resetTime, true);
    
            async function logInactive() {
                // do your task here
                // alert("User is inactive.");
                console.log('Scratch-Addons:USER-ONLINE-STATUS | You are idle on this page')
                STATUS = "idle"
                sendStatusToBackground()
            }

            async function logActive() {
                STATUS = "online"
                sendStatusToBackground()
            }

            async function sendStatusToBackground() {
                global.syncStatus(STATUS)
            }
    
            function resetTime() {
                clearTimeout(time);
                time = setTimeout(logInactive, 1000 * 10);
                logActive();
            }
    
        };
        async function sendLoop() {
            while(true) {
                sendStatusToBackground();
                await sleep(global.updateIntervalSeconds * 1000);
            }
        }
        inactivityTime(); 
        sendLoop();

        // console.log('PEEEPEEEPOOOOOPOOO')
    
}