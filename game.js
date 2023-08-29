var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function (){
        $(`#${currentColor}`).removeClass("pressed")}, 100);
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    $("h1").text(`Level ${level}`);
    //$(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userInput(userChosenColor);
})

function userInput(color){
    userClickedPattern.push(color);
    animatePress(color);
    playSound(color);
    checkAnswer(userClickedPattern.length - 1);
}

$(document).keypress(function(letter) {
    var char = String.fromCharCode(letter.keyCode);
    if(char === "q" && gameStarted){
        userInput("green");
    } else if(char === "w" && gameStarted){
        userInput("red");
    } else if(char === "a" && gameStarted){
        userInput("yellow");
    } else if(char === "s" && gameStarted){
        userInput("blue")
    } else if ((char !== "s" || char !=="q" || char !=="w" || char !=="a") && gameStarted){
        alert("wrong key");
    } else{
        nextSequence();
        gameStarted = true;
        userPlaying = true; 
    }
    
})

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence()}, 1000);
            userClickedPattern = [];
        }
    } else {
        console.log("failed");
        gameOver();
    }
}

function answerWrong(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200)
}

function gameOver(){
    answerWrong();
    $("h1").text("Game Over! Press any key to try again.");
    gameStarted = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];  
}