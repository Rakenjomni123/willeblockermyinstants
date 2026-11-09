const alarmBanner = document.getElementById('alarmBanner');
const videoStatus = document.getElementById('videoStatus');
const resetBtn = document.getElementById('resetAlarm');

// Lyssna på förändringar i LocalStorage (kommunikation mellan flikarna)
window.addEventListener('storage', (event) => {
    
    // 1. Kolla om Wille startat skärmdelningen
    if (event.key === 'wille_screen_active') {
        if (event.newValue === 'true') {
            videoStatus.innerText = "[SKÄRM DELAS] Visar Willes skrivbord...";
            videoStatus.style.color = "#28a745";
        } else {
            videoStatus.innerText = "Väntar på att Wille ska starta skärmdelning...";
            videoStatus.style.color = "white";
        }
    }

    // 2. Kolla om Wille gick in på Myinstants
    if (event.key === 'wille_alarm' && event.newValue === 'true') {
        alarmBanner.classList.remove('hidden');
        document.body.style.backgroundColor = "#4a0000"; // Gör hela frökens skärm mörkröd
    }
});

// Återställningsknapp för fröken
resetBtn.addEventListener('click', () => {
    localStorage.setItem('wille_alarm', 'false');
    alarmBanner.classList.add('hidden');
    document.body.style.backgroundColor = "#222";
    alert("Larmet återställt. Gå och prata med Wille!");
});
