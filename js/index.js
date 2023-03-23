const mainCharacter = document.getElementById("mainCharacter");
const gameWindow = document.getElementById("gameWindow");
const characterAudio = document.getElementById("characterAudio");
const mcBubble = document.getElementById("mcBubble");
let hasPick = false;
let rocked = false;

document.getElementById('ground').setAttribute('draggable', false);
document.getElementById('foregroundImg').setAttribute('draggable', false);

gameWindow.onclick = async function (e) {

    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left - 16;
    var y = e.clientY - rect.top - 16;
    mainCharacter.style.left = x + "px";
    mainCharacter.style.top = y + "px";

    switch (e.target.id) {
        case ("tool"):
            await delay(2500);
            showSpeech();
            if (!hasPick) {
                characterAudio.play();
                document.getElementById("ground").src = "Img/TileMap2.png";
                hasPick = true;
                showSpeech("Nice! A pickaxe");
            }
            else {
                showSpeech("Nothing else in here");
            }
            break;
        case ("rock"):
            await delay(2500);
            showSpeech();
            if (hasPick) {
                characterAudio.play();
                document.getElementById("ground").src = "Img/TileMap3.png";
                showSpeech("There's a cool switch\nI hear a contraption activating");
                rocked = true;
                break;
            }
            else if (!hasPick) {
                showSpeech("U see something peaking out underneath the stone\nIf only u have a tool to break it open with");
            }
            else {
                showSpeech("A pile of small rocks with a flicked switch underneath");
            }
        case ("cave"):
            await delay(2500);
            if (rocked) {
                document.getElementById("foregroundImg").src = "Img/TileMapTrans.png";
                await delay(2000);
                document.getElementById("foregroundImg").src = "Img/TileMapForeGround2.png";
                document.getElementById("ground").src = "Img/TileMap4.png";
            }
            break;
        default:
            hideSpeech();
            break;
    }
}


function showSpeech(dialogue) {
    mcBubble.style.opacity = 1;
    mcBubble.innerText = dialogue;
}

function hideSpeech() {
    mcBubble.style.opacity = 0;
    mcBubble.innerText = "...";
}

function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}