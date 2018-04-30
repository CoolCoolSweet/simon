// $(function () {
    
    // VARIABLES
    const playButtons = document.getElementsByClassName('play-button');

    // FUNCTIONS
    const clickEvent = () => {
        console.log("hi");
    };


    for (let i=0; i < playButtons.length; i++) {
    playButtons[i].addEventListener("click", clickEvent, false);
    };

// });