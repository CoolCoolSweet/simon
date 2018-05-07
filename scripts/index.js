$(window).on('load', function (e) {  /* I am using and "on.load" instead of a document ready because I had issues where my sounds wouldnt load in time on fast computers. I read that this can solve the problem because an "on.load" waits for all the assets (sounds) to be loaded too as opposed to just dom elements? in any case this solved my problem. */

    // VARIABLES
    const gameButtonsHtmlElements = $(".game-button").toArray();
    const colorList = ["yellow", "green", "red", "blue"];
    const gameButtons = [];
    let solutionArray = [];
    let guessIndex = 0;
    let randomSelector = 0;
    const slider = document.getElementById("speed-slider");
   
    
    // FUNCTIONS

    // Main game flow
    const gameLogic = (guessColor) => {
        	 
		if (guessColor !== solutionArray[guessIndex].color) {
            guessIndex = "loser"; /* Prevent any more gameplay by switching type*/
            
        };
        
        guessIndex++;

		if (guessIndex == solutionArray.length) {
			toggleButtonsWorking();
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

    // Change score text
    const setScore = () => {
        $(".level").text("Score");
        $(".number").css("font-size", "5rem");
        $(".number").text(solutionArray.length - 1);
    }

    // Flash the solution sequence
    const flashSequence = (flashDelay) => {

        $(".level").text("Please");
        $(".number").css("font-size", "2rem");
        $(".number").text("Wait...");

		setTimeout(() => {
            toggleButtonsWorking();
            setScore();
        }, ((600 * solutionArray.length) + flashDelay) * (slider.value / 100));

        for (let i = 0; i < solutionArray.length; i++) {
            setTimeout(() => {
                $(solutionArray[i].className).toggleClass("flash");
                $(solutionArray[i].sound)[0].pause();
                $(solutionArray[i].sound)[0].currentTime = 0;
				$(solutionArray[i].sound)[0].play();
                setTimeout(() => {
					$(solutionArray[i].className).toggleClass("flash");
                }, 300 * (slider.value / 100));
            }, ((600 * i) + flashDelay) * (slider.value / 100));
		};
	};
	
	const toggleButtonsWorking = () => {
		for (let i = 0; i < gameButtons.length; i++) {
			$(`.game-button${i}`).toggleClass("disabled-button");
        };
        $(`.start-button`).toggleClass("disabled-button");
        $(`#reverse-mode`).toggleClass("disabled-button"); 
		$(`html`).toggleClass("cursor-thing");
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

		$(gameButtons[i].htmlElement).on('click', () =>  {
			$(gameButtons[i].sound)[0].pause();
			$(gameButtons[i].sound)[0].currentTime = 0;
			$(gameButtons[i].sound)[0].play();
            gameLogic(gameButtons[i].color);
        });
    
    });

    $(".start-button").on('click', () => {
        toggleButtonsWorking();
		guessIndex = 0;
		solutionArray = [];
        randomSelector = randNum(0, 3);
        pushNewColor(randomSelector);
        flashSequence(0);
    });
    
});