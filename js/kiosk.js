var kiosk_switch = document.getElementById('kiosk-switch');

if(kiosk_switch.checked == true) {
    console.log('Kiosk mode activated');
    // Activate idle timer
    function IdleTimer() {
        console.log('Idle timer set up.')
        var time;
        window.onload = resetTimer;
        // DOM Events
        document.onmousemove = resetTimer;
        document.onkeypress = resetTimer;
        document.onmousedown = resetTimer;
        document.ontouchstart = resetTimer;
        document.onclick = resetTimer;
        document.addEventListener('scroll', resetTimer, true);
    
        function ActivateScreenSaver() {
            console.log('Reached idle time in Kiosk mode. Activating screen saver.');
        }
    
        function resetTimer() {
            clearTimeout(time);
            time = setTimeout(ActivateScreenSaver, 120000); // Two minutes
            // 1000 milliseconds = 1 second
        }
    };
} else {
    console.log('Kiosk mode is disabled.');
}