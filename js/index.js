const mainCharacter = document.getElementById("mainCharacter");
const gameWindow = document.getElementById("gameWindow");
const characterAudio = document.getElementById("characterAudio");
const mcBubble = document.getElementById("mcBubble");
let hasPick = false;
let rocked = false;
let inCave = false;
let canMove = false;
let hasKey = false;
let hasAcid = false;
let unrusted = false;
let brokeCrystal = false;

document.getElementById('ground').setAttribute('draggable', false);
document.getElementById('foregroundImg').setAttribute('draggable', false);

gameWindow.onclick = async function (e) {

    if (canMove) {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left - 16;
        var y = e.clientY - rect.top - 16;
        mainCharacter.style.left = x + "px";
        mainCharacter.style.top = y + "px";
    }

    if (!inCave) {
        switch (e.target.id) {
            case ("playButton"): case ("startText"): // into cinamatic
                document.getElementById("startText").innerText = "The time has stoped.\nIt is summer forever";
                await delay(4000);
                document.getElementById("startText").innerText = "You are the last hope of this world";
                await delay(4000);
                document.getElementById("startText").innerText = "You, the last time wizzard\nneed to find the currupted time crystal\nAND BREAK IT";
                await delay(6000);
                document.getElementById("playButton").remove();
                canMove = true;
                break;

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
                    characterAudio.play();
                    showSpeech("Nothing else in here");
                }
                break;
            case ("rock"):
                await delay(2500);
                showSpeech();
                if (hasPick) {
                    characterAudio.play();
                    document.getElementById("ground").src = "Img/TileMap3.png";
                    showSpeech("There's a switch\nI hear a contraption activating");
                    rocked = true;
                    break;
                }
                else if (!hasPick) {
                    characterAudio.play();
                    showSpeech("U see something peaking out underneath the stone\nIf only u have a tool to break it open with");
                }
            case ("cave"):
                await delay(2500);
                if (rocked) {
                    characterAudio.play();
                    showSpeech("There's a cave here");
                    await delay(1000);
                    document.getElementById("mainCharacter").style.transition = 'none';
                    mainCharacter.style.left = 375 + "px";
                    mainCharacter.style.top = 510 + "px";
                    document.getElementById("ground").src = "Img/DungeonTile1.png";
                    document.getElementById("foregroundImg").src = "Img/Empty.png";
                    canMove = false;
                    await delay(1000);
                    document.getElementById("mainCharacter").style.transition = 'all 3s ease-in-out';
                    canMove = true;
                    inCave = true;
                }
                else {
                    characterAudio.play();
                    showSpeech("There seems to be a crack here");
                }
                break;
            default:
                hideSpeech();
                break;
        }
    }
    else {
        switch (e.target.id) {
            case ("book"):
                await delay(2500);
                showSpeech("An old book, it reads: \nThe key to the clean steel lies at the shrine on the north wall");
                break;
            case ("shrine"):
                await delay(2500);
                if (!hasKey) {
                    characterAudio.play();
                    showSpeech("A key is poking out\nU take it");
                    hasKey = true;
                }
                else {
                    characterAudio.play();
                    showSpeech("An empty shrine");
                }
                break;
            case ("chest"):
                await delay(2500);
                if (hasKey) {
                    characterAudio.play();
                    showSpeech("U unlock the chest and open it\nThere is a bottle of acid inside");
                    hasAcid = true;
                    document.getElementById("ground").src = "Img/DungeonTile2.png";
                }
                else {
                    characterAudio.play();
                    showSpeech("A chest\nU try to open it but it seems like its locked");
                }
                break;
            case ("lever"):
                await delay(2500);
                if (hasAcid) {
                    characterAudio.play();
                    showSpeech("U let the acid desolve the rust on the lever\nu switch the lever");
                    unrusted = true;
                    document.getElementById("ground").src = "Img/DungeonTile3.png";
                }
                else {
                    characterAudio.play();
                    showSpeech("A rusted over lever");
                }
                break;
            case ("crystal"):
                await delay(2500);
                if (unrusted) {
                    characterAudio.play();
                    showSpeech("The corrupted time crystal\nU smash it to pieces and u feel like the time has started again\nU head out of the cave");
                    document.getElementById("ground").src = "Img/DungeonTile4.png";
                    await delay(4000);
                    document.getElementById("foregroundImg").src = "Img/TileMapTrans.png";
                    document.getElementById("mainCharacter").style.transition = 'none';
                    canMove = false;
                    mainCharacter.style.left = 225 + "px";
                    mainCharacter.style.top = 310 + "px";

                    await delay(1000);
                    document.getElementById("mainCharacter").style.transition = 'all 3s ease-in-out';
                    canMove = true;
                    document.getElementById("foregroundImg").src = "Img/TileMapForeGround2.png";
                    document.getElementById("ground").src = "Img/TileMap4.png";
                    inCave = false;
                }
                else {
                    characterAudio.play();
                    showSpeech("The currupted time crystal\nits behind some bars and u cant reach it");
                }
                break;
            default:
                hideSpeech();
                break;
        }
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