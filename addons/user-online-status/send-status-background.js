export default async function ({ addon, global, console, setTimeout, setInterval, clearTimeout, clearInterval }) {
    // global.sendIntervalSeconds = 10;
    global.updateIntervalSeconds = 1;
    
    let lastRecieved = {online:{},offline:{},idle:{}}
    let lastStatus = {status:"",time:{}}
    
    global.syncStatus = (status)=>{
        lastStatus = {"status":status,time:new Date()};
        lastRecieved[status] = new Date()
    }
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getStatus() {
        if((Date.now() - lastRecieved.online.getTime()) < (global.updateIntervalSeconds*1000 + 1000)) {
            return "online";
        } else if((Date.now() - lastRecieved.idle.getTime()) < (global.updateIntervalSeconds*1000 + 1000)) {
            return "idle"
        } else {
            return "offline"
        }
    }

    function sendToServer(sendStatus) {
        
    }
    
    // console.log("Hello, " + addon.auth.username);
    await sleep(1000)
    let lastStatus = "offline"
    while(true) {
        let currentStatus = getStatus();
        if(currentStatus != lastStatus) {
            lastStatus = currentStatus;
            sendToServer(currentStatus);
        }
        await sleep(10000)
    }
}