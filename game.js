var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];


// for the game level
var level=0;
// a variable to keep track if the game has started or not
var started=false;


// when the game has not started upon pressing a key the game starts
$(document).keydown(function(){
    // check if the game has already started or not
    if(!started){
        
        // also update the heading to level 0
        $("#level-title").text("Level "+level);
        // call the nextsequence
        nextSequence();
        //  change the state to started
        started=true;
    }
});


// generated sequence
function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);

    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio=new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();
    // upon triggering the function the user chosen color array gets set to 0 again
    userClickedPattern=[];
    // update the level while new swquence is generated
    level+=1;
    $("#level-title").text("Level "+level);
    
}
// button click event..button pressed..sequnce added.. music..animation.check answer
$(".btn").click(function(event){
    var userChosenColour=event.target.id;
    // or can use $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // check for the last button clicked
    checkAnswer(userClickedPattern.length-1);
    
});

function playSound(name){
    $("#"+name).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
// add animation while button pressed
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

// checks the generated pattern and given pattern
function checkAnswer(currentLevel){
    console.log(userClickedPattern);
    console.log(gamePattern);
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        //pattern matches
        console.log("right");
        if (userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence()},1000);
        }
    }else{
        //game-over
        console.log("wrong");
        var wrong_audio=new Audio("sounds/wrong.mp3");
        wrong_audio.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
    
}


// function to restart the game
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}






