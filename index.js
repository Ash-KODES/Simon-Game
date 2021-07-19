
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];

var userChosenColors=[];
var level=0;
var started=false;

$(document).on("keypress",function(){
	if(!started){
	nextSequence();
	started=true;
    }
});
$(document).on("click",function(){
	if(!started){
	nextSequence();
	started=true;
    }
});

$(".btn").on("click",function(event){
           var userChosenColour = $(this).attr("id");
  userChosenColors.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userChosenColors.length);
});


function nextSequence(){
	userChosenColors=[];
	var randomNumber=Math.floor(Math.random()*4);
	var randomChosenColor=buttonColors[randomNumber];

	gamePattern.push(randomChosenColor);
	
	$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

	$("h1").text("Level "+level++);

	var soundName=randomChosenColor;
	playSound(soundName);
}

function checkAnswer(size){
	if(gamePattern[size-1]===userChosenColors[size-1]){
          if(gamePattern.length===userChosenColors.length){
          	setTimeout(function(){
          		nextSequence();}
          		,500);      
          }
	}
	else{
		playSound("wrong");
		$("body").addClass("game-over");
		$("h1").text("Game Over!!Press any key to restart!!");
		setTimeout(function(){
			$("body").removeClass("game-over");}
			,500);
		startOver();
		}
	}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(colorName){
	$("#"+colorName).addClass("pressed");
	setTimeout(function(){
		$("#"+colorName).removeClass("pressed");}
		,100);
	}

function startOver(){
	userChosenColors=[];
	gamePattern=[];
	level=1;
	started=false;
}
