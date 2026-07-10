const game = document.getElementsByClassName('game')[0];
const gameText = document.getElementsByClassName('game-text')[0];
const gameFeedback = document.getElementsByClassName('game-feedback')[0];
const ui = document.getElementsByClassName('ui')[0];
const inventory = document.getElementsByClassName('inventory')[0];
const gameImage = document.getElementById('game-image');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const imageBasePath = "/under_construction/game/images/";

let playerInventory = [];

const scenes = {
    intro:{
        text: "Welcome to the game! Get ready for an exciting adventure.",
        image: imageBasePath + "the-visitor.webp",
        options: [
            {text: "Start Game", action: () => loadScene('startGame')},
        ]
    },
    startGame:{
        text: "You have started the game! Good luck!",
        image: imageBasePath + "the-visitor2.png",
        options: [
            {text: "Go Back", action: () => loadScene('intro')},
            {text: "Pickup Item", action: (button) => pickupItem('Key', button)},
            {text: "Go to Locked Door", action: () => loadScene('lockedDoor')},
        ]
    },
    lockedDoor:{
        text: "You encounter a locked door. You need a key to proceed.",
        image: null,
        options: [
            {text: "Go Back", action: () => loadScene('startGame')},
            {text: "Use Key", action: () => {
                if(playerInventory.includes('Key')){
                    loadScene('nextRoom');
                } else {
                    typeText(gameFeedback, "\n\nYou need a key to open this door.");
                }
            }}
        ]
    }
};

async function typeText(context, text, delay = 50) {
    for (let i = 0; i < text.length; i++) {
        context.textContent += text[i];
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

const pickupItem  = (item, button) => {
    playerInventory.push(item);
    updateInventory();
    playPickupSound();
    if (button) {
        button.disabled = true;
        button.style.color = "gray";
    }
}

const updateInventory = () => {
    inventory.textContent = "Inventory: " + playerInventory.join(", ");
}

function playPickupSound() {
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.15, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    osc.frequency.value = 880 + Math.random() * 440; // Random frequency between 880Hz and 1320Hz
    osc.detune.value = Math.random() * 30 - 15;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
}

function spawnButtons(){
    const button1 = document.createElement('button');
    button1.textContent = "Start Game";
    button1.addEventListener('click', () => loadScene('startGame'));
    ui.appendChild(button1);
}

function clearText(){
    gameText.textContent = "";
    gameFeedback.textContent = "";
}

function clearButtons(){
    while (ui.firstChild) {
        ui.removeChild(ui.firstChild);
    }
}

function loadScene(sceneName) {
    clearText();
    clearButtons();
    const scene = scenes[sceneName];
    
    //change the image source and apply fade-in effect
    gameImage.src = scene.image || "";
    gameImage.classList.remove('fade-in');
    void gameImage.offsetWidth; // Trigger reflow to restart the animation
    gameImage.classList.toggle('fade-in', scene.image);
    
    typeText(gameText, scene.text).then(() => {
        scene.options.forEach(option => {
            const btn = document.createElement('button');
            btn.textContent = option.text;
            btn.addEventListener('click', () => {
                option.action(btn); 
            });
            ui.appendChild(btn);
        });
    });
}

window.addEventListener('load', () => {
    loadScene('intro');
});