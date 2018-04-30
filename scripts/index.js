$(function () {
    
    // VARIABLES
    const gameButtonsReturnedArray = document.getElementsByClassName('game-button');
    const colorMap = ["yellow", "green", "red", "blue"];
    const gameButtons = [];
    let solutionArray = [];

    // FUNCTIONS
    const clickEvent = (colour) => {
        console.log(colour);
        console.log(colorMap[Math.floor((Math.random() * colorMap.length))]);
    };

    for (let i=0; i < gameButtonsReturnedArray.length; i++) {
        gameButtons[i] = {
            name: gameButtonsReturnedArray[i],
            color: colorMap[i],
        };
        gameButtons[i].name.addEventListener("click", () => { clickEvent(colorMap[i]); }, false);
    };
    
});