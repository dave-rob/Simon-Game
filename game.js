alert("working");
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
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
})

$(document).keypress(function() {
    if(!gameStarted){
        nextSequence();
        gameStarted = true;
    } 
    
})