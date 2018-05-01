// $(function () {
    
//     // VARIABLES
//     const gameButtonsReturnedArray = document.getElementsByClassName('game-button');
//     const colorList = ["yellow", "green", "red", "blue"];
//     const gameButtons = [];
//     const solutionArray = [];

//     // FUNCTIONS
//     const clickEvent = (buttonNum) => {
//         alert(this.color);
//         console.log(colorList[Math.floor((Math.random() * colorList.length))]);
//         console.log(gameButtons[buttonNum].color);
//     };

//     // SETUP kinda thing (There is probably a better name)

//     // I'm using a for loop, instead of foreach() method because the array returned is not a real array. It is some NodeList object thing.
//     for (let i = 0; i < gameButtonsReturnedArray.length; i++) { 
//         gameButtons[i] = {
//             htmlElement: gameButtonsReturnedArray[i],
//             color: colorList[i],
//         };
//         gameButtons[i].htmlElement.addEventListener("click", () => { clickEvent(i); }, false);
//     };
    

// });

$(function () {

    // VARIABLES
    const gameButtonsHtmlElements = $(".game-button").toArray();
    const colorList = ["yellow", "green", "red", "blue"];
    const gameButtons = [];
    const solutionArray = [];
    let guessIndex = 0;
    let randomSelector = 0;
    
    // FUNCTIONS

    // Main game flow
    const gameLogic = (guessColor) => {    
        if (guessColor === solutionArray[guessIndex]) {
            randomSelector = colorList[randNum(0, 3)];
            pushNewColor(randomSelector);
            guessIndex++;
        } else {
            alert('loser');
        }
        
        console.log(guessColor, guessIndex);
        console.log(solutionArray);
        
    };

    // Generates a random number between min and max (inclusive)
    const randNum = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    };

    // Pushes a new color to the solutionArray
    const pushNewColor = (color) => {
        solutionArray.push(gameButtons[color]);
    };

    // Flash the solution sequence
    const flashSequence = () => {
        
    }
    // BUILT UP STUFF

    // Building up the gameButtons array here with objects in the array and attaching click event listeners to each htmlElement.
    gameButtonsHtmlElements.forEach((element, i) => {
        gameButtons[i] = {
            color: colorList[i],
            htmlElement: gameButtonsHtmlElements[i],
        }

        $(gameButtons[i].htmlElement).on('click', () =>  {
            gameLogic(gameButtons[i].color);
        });
    
    });
    
    randomSelector = randNum(0, 3);
    pushNewColor(randomSelector);
    console.log(solutionArray);
    
});