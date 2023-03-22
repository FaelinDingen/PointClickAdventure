const mainCharacter = document.getElementById("mainCharacter");
const gameWindow = document.getElementById("gameWindow");
const offsetCharacter = 16;


document.getElementById('ground').setAttribute('draggable', false);

gameWindow.onclick = function (e) {

    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left - offsetCharacter;
    var y = e.clientY - rect.top - offsetCharacter;
    mainCharacter.style.left = x + "px";
    mainCharacter.style.top = y + "px";
}