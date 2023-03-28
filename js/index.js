const mainCharacter = document.getElementById("mainCharacter");
const gameWindow = document.getElementById("gameWindow");
const characterAudio = document.getElementById("characterAudio");
const mcBubble = document.getElementById("mcBubble");
let dungeonState = 1;
let ended = false;
let inCutScene = false;
let canMove = false;
let hasPick = false;
let rocked = false;
let inCave = false;
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
                if (!inCutScene) {
                    inCutScene = true;
                    document.getElementById("startText").innerText = "The time has stoped.\nIt is summer forever";
                    await delay(4000);
                    document.getElementById("startText").innerText = "You are the last hope of this world";
                    await delay(4000);
                    document.getElementById("startText").innerText = "You, the last time wizzard\nneed to find the currupted time crystal\nAND BREAK IT";
                    await delay(6000);
                    document.getElementById("playButton").remove();
                    canMove = true;
                }
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
                console.log("cave");
                await delay(2500);
                showSpeech();
                if (hasPick && !rocked) {
                    characterAudio.play();
                    document.getElementById("ground").src = "Img/TileMap3.png";
                    showSpeech("There's a switch\nI hear a contraption activating");
                    rocked = true;
                }
                else if (!rocked) {
                    characterAudio.play();
                    showSpeech("U see something peaking out underneath the stone\nIf only u have a tool to break it open with");
                }
                else {
                    characterAudio.play();
                    showSpeech("A useless pile of rocks");
                }
                break;
            case ("cave"):
                await delay(2500);
                if (rocked) {
                    characterAudio.play();
                    showSpeech("There's a cave here");
                    await delay(1000);
                    document.getElementById("mainCharacter").style.transition = 'none';
                    mainCharacter.style.left = 375 + "px";
                    mainCharacter.style.top = 510 + "px";
                    document.getElementById("ground").src = "Img/DungeonTile" + dungeonState + ".png";
                    document.getElementById("foregroundImg").src = "Img/Empty.png";
                    characterAudio.src = "Audio/TalkingInside.mp3"
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
                characterAudio.play();
                showSpeech("An old book, it reads: \nThe key to the clean steel lies at the shrine on the north wall");
                break;
            case ("bed"):
                await delay(2500);
                characterAudio.play();
                showSpeech("No time to rest!\nThe world needs to be saved!");
                break;
            case ("boxes"):
                await delay(2500);
                characterAudio.play();
                showSpeech("Just a bunch of broken old boxes\nThere is nothing of value here");
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
                if (hasKey && !hasAcid) {
                    characterAudio.play();
                    showSpeech("U unlock the chest and open it\nThere is a bottle of acid inside");
                    hasAcid = true;
                    document.getElementById("ground").src = "Img/DungeonTile2.png";
                    dungeonState++;
                }
                else if (!hasAcid) {
                    characterAudio.play();
                    showSpeech("A chest\nU try to open it but it seems like its locked");
                }
                else {
                    characterAudio.play();
                    showSpeech("An empty chest");
                }
                break;
            case ("lever"):
                await delay(2500);
                if (hasAcid && !unrusted) {
                    characterAudio.play();
                    showSpeech("U let the acid desolve the rust on the lever\nu switch the lever");
                    unrusted = true;
                    document.getElementById("ground").src = "Img/DungeonTile3.png";
                    dungeonState++;
                }
                else if (!unrusted) {
                    characterAudio.play();
                    showSpeech("A rusted over lever");
                }
                else {
                    characterAudio.play();
                    showSpeech("A fliped lever");
                }
                break;
            case ("crystal"):
                await delay(2500);
                if (unrusted && !brokeCrystal) {
                    characterAudio.play();
                    showSpeech("The corrupted time crystal...\nU smash it to pieces and u feel like the time has started again");
                    document.getElementById("ground").src = "Img/DungeonTile4.png";
                    dungeonState++;
                    brokeCrystal = true;
                }
                else if (!brokeCrystal) {
                    characterAudio.play();
                    showSpeech("The currupted time crystal\nits behind some bars and u cant reach it");
                }
                else {
                    characterAudio.play();
                    showSpeech("A pile of glowing dust is on the floor\nIts too weak to cause damage");
                }
                break;
            case ("caveExit"):
                await delay(2500);
                showSpeech("U head out of the cave");
                await delay(2000);
                document.getElementById("foregroundImg").src = "Img/TileMapTrans.png";
                document.getElementById("mainCharacter").style.transition = 'none';
                canMove = false;
                mainCharacter.style.left = 225 + "px";
                mainCharacter.style.top = 310 + "px";
                await delay(1000);
                document.getElementById("mainCharacter").style.transition = 'all 3s ease-in-out';
                canMove = true;
                characterAudio.src = "Audio/talkingOutside.mp3"
                if (brokeCrystal) {
                    document.getElementById("foregroundImg").src = "Img/TileMapForeGround2.png";
                    document.getElementById("ground").src = "Img/TileMap4.png";
                    if (!ended) {
                        showSpeech("Its Fall!\nThe world is saved!");
                    }
                }
                else {
                    document.getElementById("foregroundImg").src = "Img/TileMapForeGround1.png";
                    document.getElementById("ground").src = "Img/TileMap3.png";
                }
                inCave = false;
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