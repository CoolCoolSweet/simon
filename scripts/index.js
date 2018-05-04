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
    const startButton = $(".start-button");
    const colorList = ["yellow", "green", "red", "blue"];
    const gameButtons = [];
    const solutionArray = [];
    let guessIndex = 0;
	let randomSelector = 0;
    
    // FUNCTIONS

    // Main game flow
    const gameLogic = (guessColor) => {  
		if (guessColor === solutionArray[guessIndex].color) {
			guessIndex++;	
        } else {
            alert('loser');
		};

		if (guessIndex == solutionArray.length) {
			randomSelector = randNum(0, 3);
			pushNewColor(randomSelector);
			flashSequence(1000);
			guessIndex = 0;
		}
        
    };

    // Generates a random number between min and max (inclusive)
    const randNum = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    };

    // Pushes a new object to the solutionArray
    const pushNewColor = (number) => {
        solutionArray.push(gameButtons[number]);
    };

    // Flash the solution sequence
    const flashSequence = (flashDelay) => {
        for (let i = 0; i < solutionArray.length; i++) {
            setTimeout(() => {
				$(solutionArray[i].className).toggleClass("flash");
				$(solutionArray[i].sound)[0].play();
                setTimeout(() => {
					$(solutionArray[i].className).toggleClass("flash");
                }, 300);
            }, ((600 * i) + flashDelay));
		};
    };
    
    // BUILT UP STUFF

    // Building up the gameButtons array here with objects in the array and attaching click event listeners to each htmlElement.
    gameButtonsHtmlElements.forEach((element, i) => {
        gameButtons[i] = {
        	color: colorList[i],
            htmlElement: gameButtonsHtmlElements[i],
			className: `.game-button${i}`,
			sound: `#${colorList[i]}-sound`
        }

        $(gameButtons[i].htmlElement).on('mouseup', () =>  {
			$(gameButtons[i].sound)[0].play();
            gameLogic(gameButtons[i].color);
        });
    
    });

    startButton.on('click', () => {
		guessIndex = 0;
		solutionArray.length = 0;
        randomSelector = randNum(0, 3);
        pushNewColor(randomSelector);
        flashSequence(0);
	});
    
});