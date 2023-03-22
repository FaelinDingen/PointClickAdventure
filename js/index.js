const mainCharacter = document.getElementById("mainCharacter");
const gameWindow = document.getElementById("gameWindow");
const offsetCharacter = 16;
const characterAudio = document.getElementById("characterAudio");

document.getElementById('ground').setAttribute('draggable', false);

gameWindow.onclick = async function (e) {

    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left - offsetCharacter;
    var y = e.clientY - rect.top - offsetCharacter;
    mainCharacter.style.left = x + "px";
    mainCharacter.style.top = y + "px";

    switch (e.target.id) {
        case ("tool"):
            await delay(2500);
            characterAudio.play();
            document.getElementById("ground").src = "img/TileMap2.png";
            break;
        case ("stone"):

            break;
    }
}


function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}