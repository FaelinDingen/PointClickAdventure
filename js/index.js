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
                    await delay(2000);
                    document.getElementById("playButton").style.backgroundColor = 'rgba(0, 0, 0, 0)';
                    document.getElementById("startText").style.color = 'rgba(0, 0, 0, 0)';
                    await delay(3000);
                    document.getElementById("playButton").classList.toggle("foreground3");
                    document.getElementById("playButton").classList.toggle("disabled");
                    document.getElementById("startText").classList.toggle("disabled");
                    canMove = true;
                }
                break;
            case ("tool"):
                await delay(2500);
                showSpeech();
                if (!hasPick) {

                    document.getElementById("ground").src = "Img/TileMap2.png";
                    hasPick = true;
                    showSpeech("Nice! A pickaxe");
                    document.getElementById("toolItem").classList.toggle("disabled");
                }
                else {
                    showSpeech("Nothing else in here");
                }
                break;
            case ("rock"):
                console.log("cave");
                await delay(2500);
                showSpeech();
                if (hasPick && !rocked) {
                    document.getElementById("ground").src = "Img/TileMap3.png";
                    showSpeech("There's a switch\nI hear a contraption activating\nHowever the pick broke");
                    document.getElementById("toolItem").classList.toggle("disabled");
                    rocked = true;
                }
                else if (!rocked) {
                    showSpeech("U see something peaking out underneath the stone\nIf only u have a tool to break it open with");
                }
                else {
                    showSpeech("A useless pile of rocks");
                }
                break;
            case ("cave"):
                await delay(2500);
                if (rocked) {
                    showSpeech("There's a cave here");
                    await delay(1000);
                    document.getElementById("mainCharacter").style.transition = 'none';
                    mainCharacter.style.left = 375 + "px";
                    mainCharacter.style.top = 510 + "px";
                    document.getElementById("ground").src = "Img/DungeonTile" + dungeonState + ".png";
                    document.body.style.backgroundImage = 'url(Img/Background2.png)';
                    document.getElementById("foregroundImg").src = "Img/Empty.png";
                    characterAudio.src = "Audio/TalkingInside.mp3";
                    canMove = false;
                    await delay(1000);
                    document.getElementById("mainCharacter").style.transition = 'all 3s ease-in-out';
                    canMove = true;
                    inCave = true;
                }
                else {
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
            case ("bed"):
                await delay(3000);
                if (ended) {
                    document.getElementById("playButton").classList.toggle("foreground3");
                    document.getElementById("playButton").classList.toggle("disabled");
                    document.getElementById("startText").classList.toggle("disabled");
                    document.getElementById("playButton").style.backgroundColor = 'rgba(0, 0, 0, 1)';
                    document.getElementById("startText").style.color = 'rgba(255, 255, 255, 1)';
                    document.getElementById("startText").innerText = 'You, The Hero have completed your mission\nU head to bed and close your eyes';
                    canMove = false;
                    await delay(3000);
                    document.getElementById("startText").style.color = 'rgba(0, 0, 0, 0)';
                    await delay(3000);
                    document.getElementById("startText").style.color = 'rgba(255, 255, 255, 1)';
                    document.getElementById("startText").innerText = 'You wake up and see a mysterious black and white figure\nstanding the the base of your bed';
                    await delay(4000);
                    document.getElementById("startText").innerText = 'End of the game\nTo be continued in : Point And click adventure 2, The clickening!';
                }
                else {
                    showSpeech("No time to rest!\nThe world needs to be saved!");
                }
                break;
            case ("boxes"):
                await delay(2500);
                showSpeech("Just a bunch of broken old boxes\nThere is nothing of value here");
                break;
            case ("shrine"):
                await delay(2500);
                if (!hasKey) {
                    showSpeech("A key is poking out\nU take it");
                    hasKey = true;
                    document.getElementById("keyItem").classList.toggle("disabled");
                }
                else {
                    showSpeech("An empty shrine");
                }
                break;
            case ("chest"):
                await delay(2500);
                if (hasKey && !hasAcid) {
                    showSpeech("U unlock the chest and open it\nThere is a bottle of acid inside\nThe key broke");
                    document.getElementById("keyItem").classList.toggle("disabled");
                    document.getElementById("acidItem").classList.toggle("disabled");
                    hasAcid = true;
                    document.getElementById("ground").src = "Img/DungeonTile2.png";
                    dungeonState++;
                }
                else if (!hasAcid) {
                    showSpeech("A chest\nU try to open it but it seems like its locked");
                }
                else {
                    showSpeech("An empty chest");
                }
                break;
            case ("lever"):
                await delay(2500);
                if (hasAcid && !unrusted) {
                    showSpeech("U let the acid desolve the rust on the lever\nu switch the lever");
                    document.getElementById("acidItem").classList.toggle("disabled");
                    unrusted = true;
                    document.getElementById("ground").src = "Img/DungeonTile3.png";
                    dungeonState++;
                }
                else if (!unrusted) {
                    showSpeech("A rusted over lever");
                }
                else {
                    showSpeech("A fliped lever");
                }
                break;
            case ("crystal"):
                await delay(2500);
                if (unrusted && !brokeCrystal) {
                    showSpeech("The corrupted time crystal...\nU smash it to pieces and u feel like the time has started again");
                    document.getElementById("ground").src = "Img/DungeonTile4.png";
                    dungeonState++;
                    brokeCrystal = true;
                }
                else if (!brokeCrystal) {
                    showSpeech("The currupted time crystal\nits behind some bars and u cant reach it");
                }
                else {
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
                characterAudio.src = "Audio/talkingOutside.mp3";
                if (brokeCrystal) {
                    document.getElementById("foregroundImg").src = "Img/TileMapForeGround2.png";
                    document.getElementById("ground").src = "Img/TileMap4.png";
                    document.body.style.backgroundImage = 'url(Img/Background3.png)';
                    if (!ended) {
                        showSpeech("Its Fall!\nThe world is saved!\nYou are exhausted and can finally get some rest");
                        ended = true;
                    }
                }
                else {
                    document.getElementById("foregroundImg").src = "Img/TileMapForeGround1.png";
                    document.getElementById("ground").src = "Img/TileMap3.png";
                    document.body.style.backgroundImage = 'url(Img/Background1.png)';
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
    characterAudio.play();
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