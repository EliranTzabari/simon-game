var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []

var started = false
var level = 0



$(document).on("keydown", startGame)
function startGame (){
    if(!started){
        $("h1").text("Level" + level)
        nextSequence()
        started = true
    }

    }

$(".btn").on("click",handler)
function handler(){
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length -1)
}


function nextSequence(){
    userClickedPattern = []
    level++
    $("h1").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * buttonColors.length) //1\2\3\4
    var randomChosenColor = buttonColors[randomNumber] // Random color
    gamePattern.push(randomChosenColor) //Insert the new color to the colours array
    AnimateNextColor(0)
    
}



function playSound(name){
    var sound = new Audio(colorSound[name])
    sound.play();
}
 function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    },100)
 }

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
                
            }, 1000)
    }   
    
    } else {
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");

        gameOver()
    }
}
function gameOver(){
    level = 0
    gamePattern = []
    started = false
}


function AnimateAndPlaySound(color){
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100) // Animate
    playSound(color)
}


function AnimateNextColor(index){
    var color = gamePattern[index];
    if(!color) {
        return; //There is no more colors to animate;
        }
        else{

            setTimeout(() => {
                AnimateAndPlaySound(color)
            
            
            index++
        AnimateNextColor(index)
    }, 500);
}
}



var colorSound = {
    "blue" : "./sounds/blue.mp3",
    "green" : "./sounds/green.mp3",
    "red" : "./sounds/red.mp3",
    "yellow" : "./sounds/yellow.mp3",
    "wrong" : "./sounds/wrong.mp3"
}


