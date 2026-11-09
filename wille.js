const startButton = document.getElementById('startShare');
const triggerViolationBtn = document.getElementById('triggerViolation');
const statusText = document.getElementById('status');
const alarmSound = document.getElementById('alarmSound');

let stream = null;

// 1. Funktion för att starta skärmdelning (WebRTC)
async function startScreenShare() {
    try {
        // Detta ber webbläsaren om lov att dela skärmen
        stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: false
        });
        
        statusText.innerText = "Skärmen delas med Fröken";
        startButton.style.display = "none";
        
        // Här sparar vi en signal i LocalStorage så att frökens sida vet att skärmen är redo
        localStorage.setItem('wille_screen_active', 'true');
        
        // Om Wille stoppar delningen manuellt
        stream.getVideoTracks()[0].onended = function () {
            statusText.innerText = "Skärmdelning avbruten!";
            localStorage.setItem('wille_screen_active', 'false');
        };
    } catch (err) {
        console.error("Fel vid skärmdelning: " + err);
        alert("Wille måste godkänna skärmdelningen för att systemet ska fungera.");
    }
}

// 2. Funktion som kallas när Wille går in på "Myinstants"
function triggerMyinstantsBlock() {
    // Ändra status på skärmen
    statusText.innerText = "BANNAD - MYINSTANTS DETEKTERAT";
    statusText.className = "blocked";
    
    // Skicka signal till frökens dator via LocalStorage
    localStorage.setItem('wille_alarm', 'true');

    // Starta det höga pipljudet
    alarmSound.play().catch(err => console.log("Ljudet blockerat av webbläsaren innan interaktion:", err));

    // Visa JS Error Box (Alert) enligt önskemål
    setTimeout(() => {
        alert("Dator bannad på 10 minuter. Fröken kommer nu.");
    }, 100);
}

// Event Listeners
startButton.addEventListener('click', startScreenShare);
triggerViolationBtn.addEventListener('click', triggerMyinstantsBlock);
