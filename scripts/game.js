    //Game Configuration
    var level = 0;
    var gameStarted = false;
    var levelTitle = $("#level-title");

    // Setting buttons up and storing the pattern.
    var gamePattern = new Array();
    var userClickedPattern = new Array();
    var buttonColors = ["red","blue","green","yellow"];

$(document).ready(function() {

    $(".btn").click((e) => {
        var clickedButton = e.target;        
        var userChosenColor = clickedButton.id;
        userClickedPattern.push(userChosenColor);
        playSound(clickedButton.id);
        animatePress(clickedButton);
        checkAnswer(userClickedPattern.length-1);
    })

    $(this).keydown((e) => {
        if(!gameStarted){            
            nextSequence();
            gameStarted = true;
        }
    });

    function nextSequence(){
        var randomNumber = Math.floor((Math.random() * 4));
        var randomChosenColor = buttonColors[randomNumber];
        
        gamePattern.push(randomChosenColor);
        playSound(randomChosenColor);
        animateButton(randomChosenColor);

        userClickedPattern = new Array();
        level++;
        levelTitle.text("Level " + level);
    }

    function checkAnswer(currentLevel){
        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            console.log("Good!");
            if(gamePattern.length === userClickedPattern.length)
                setTimeout(nextSequence, 1200);
        }
        else{
            levelTitle.text("Game Over, Press Any Key to Restart");
            gameOverAnimation();
            startOver();
        }       
    }
})

function playSound(buttonColor) {
    var audio = new Audio("sounds/" + buttonColor + ".mp3");
    audio.play();
}

function gameOverAnimation(){
    var gameOverAudio = new Audio("sounds/wrong.mp3");
    gameOverAudio.play();
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 100);
}

function animateButton(color){
    let element = $("#" + color); 
    $(element).animate({
        opacity: 0.25,
    },100, () => {
       $(element).animate({
        opacity: 1
       }, 100); 
    })
}

function animatePress(currentButton){
    $(currentButton).addClass("pressed");
    setTimeout(() => $(currentButton).removeClass("pressed"), 100);
}

function startOver(){
    level = 0;
    gamePattern = new Array();
    gameStarted = false;
}




