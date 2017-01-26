/*============= Load the CSS and HTML First ================
  Append the Child Element JavaScript to the HTML Body, so
  that the HTML and CSS load first and the js file loads last.
============================================================*/
	function downloadJSAtOnload()
	{
		var element = document.createElement("script");
		element.src = "Guessinggame.js";
		document.body.appendChild(element);
		document.getElementById('form2').style.display = "none"; //hides form2 for reference.
	}
	if (window.addEventListener)
	window.addEventListener("load", downloadJSAtOnload, false);
	else if (window.attachEvent)
	window.attachEvent("onload", downloadJSAtOnload);
	else window.onload = downloadJSAtOnload;
	

/*==================== Global Initiations ===================
  Global variables and initiation scripts. Load the header,
  and all the other content that needs to be seen when the 
  forms load. Allow the computer to guess randomly right away.
=============================================================*/	
	var playerGuess = 6;
	//var playerNumber = 6;
	var computerGuess = 0;
	var gameStatus = 0;
	var gamesRemaining = 6;
	var computerGuess = Math.floor(Math.random() * 50) + 1; //Generates a random number from 1 through 5.
	"use strict";
	document.title = "Guessing Game";
	playerGuess = parseInt(document.getElementById('inputBox').value);

	//form1 (initialized content)
	document.getElementById("form1").autocomplete = "off";
	document.getElementById('restartGameButton').onClick="startGame();";
	document.getElementById("h1NumGuessGame").innerHTML = "NUMBER GUESSING GAME";
	document.getElementById("textBlock").innerHTML= "I'm thinking of a number<br> from"+
	" <span style=\"color:rgb(219,112,147)\">1 through 50</span>&#8212"+"<br>"+
	"If you can get it in <span style=\"color:rgb(219,112,147)\">6 tries</span>, you"+"<br>"+
	" win. If you fail--well, we'll get to"+"<br>"+" that later... <br> <br>"+"Go ahead&#8212 <br>"+
	"Click the button and start the game:";
	
	//form2 (initialized content)
	document.getElementById("inputBox").maxLength = "2";
	document.getElementById("form2").autocomplete = "off";
	document.getElementById('restartGameButton').onClick="restartGame();";
	document.getElementById("h1NumGuessGame2").innerHTML = "NUMBER GUESSING GAME";
	document.getElementById("goAheadText").innerHTML = "Go ahead&#8212 you've got 6 chances to win.";
	
	document.getElementById("numberRemainingText").innerHTML = "Number of guesses remaining: "+
	" <span style=\"color:rgb(219,112,147); font-size: 28px;\">"+playerGuess+"</span>"+
	"<span style=\"color:rgb(219,112,147); font-size: 28px;\"> "+computerGuess+"</span>";
	
	document.getElementById("guessHereText").innerHTML = "Enter your guess here: ";
	document.getElementById("gameStatus").innerHTML = "Game status: ";
	
/*=================== Beginning of the Game =======================
  The Click Me button starts the game, the first form dissapears
  and the second form appears. You get all the beginning stats:
  Player Guesses, gamesRemaining = remaining tries.
=================================================================*/	
	document.getElementById("clickMeButton").onclick = function startGame() 
    {  
		document.getElementById('form1').style.display = "none"; 
		document.getElementById('form2').style.display = "block"; 
		 
		document.getElementById("numberRemainingText").innerHTML = "Number of guesses remaining: "+
		" <span style=\"color:rgb(219,112,147); font-size: 28px;\">"+gamesRemaining+"</span>";
		playerGuesses();
    };	
	
/*=================== Player Guesses input ======================
  The player puts a number in the input box and then is the input
  passes through the if statements as arguments in showing a result.
  Set the focus to the input box right away.
=================================================================*/		
	var playerGuesses = document.getElementById("submitButton").onclick = function playerGuesses()
	{
		//var playerGuess = 6;
		document.getElementById("inputBox").focus();
		document.getElementById("submitButton").addEventListener('click', runSwitch);
	};
	
/*====================== Run the Switch =========================
  Start off with putting focus on the input box and parsing what 
  the user inputs as a integer between 1 and 50. The Switch is
  based on the inputs that are true for the output on conditions:
  isNaN or null, Out of Range, playerGuess less than computerGuess,
  playerGuess is greater than computerGuess, and Correct number
  guessed. Monitor the number of tries and update the tries for
  each time as needed. Note: Winning is different than running out
  of turns, but you also have no turns left if you win and the input
  box will be grayed out (user cannot enter anymore).
=================================================================*/		
	function runSwitch()
	{
		document.getElementById("inputBox").focus();
		playerGuess = parseInt(document.getElementById('inputBox').value);
		switch (true)
		{ 
			case (isNaN(playerGuess)|| playerGuess === null):
				triesRemainingUpdates();
				document.getElementById("gameStatus").innerHTML += "<br><br>"+
				"<span style=\"color:rgb(255,0,0);\">Error! You did not put a number in! "+
				" Please try again!</span>"+
				"<br> Please put a number in between 1 and 50 (inclusive)";	
				triesRemaining();
				break;	
				
			case (playerGuess < 1 || playerGuess > 50):
				triesRemainingUpdates();
				document.getElementById("gameStatus").innerHTML += "<br>"+
				"<span style=\"color:rgb(255,0,0);\">The number you put in is out of range!"+
				" Please put a number in between 1 and 50: (inclusive)</span><br>";
				triesRemaining();
				break;
				
			case (playerGuess > 0 && playerGuess < 51 && playerGuess < computerGuess):
				triesRemainingUpdates();
				document.getElementById("gameStatus").innerHTML += "<br>"+
				"Please guess again! "+
				" &nbsp&nbsp&nbsp&nbsp Your guess was: " +playerGuess+
				" <span style=\"color:rgb(219,112,147);\">(Please go Higher!)</span><br>";
				triesRemaining();
				break;
				
			case (playerGuess > 0 && playerGuess < 51 && playerGuess > computerGuess):	
				triesRemainingUpdates();
				gameStatus = document.getElementById("gameStatus").innerHTML += "<br>"+
				"Please guess again! "+" &nbsp&nbsp&nbsp&nbsp Your guess was: " +playerGuess+
				" <span style=\"color:rgb(219,112,147);\">(Please go Lower!)</span><br>";
				triesRemaining();
				break;	
				
			case (playerGuess === computerGuess ):
				winner();

				break;	
		}				
	}
	
/*================== Disable the Enter Key ======================
  This disables the enter key from being used, because the textbox
  will kick the form2 back out to the other form1 if you press the
  enter key. We could use an event listener and make the button click?
  Another option.
=================================================================*/		
	
	function stopRKey(evt) 
	{ 
	    evt = (evt) ? evt : ((event) ? event : null); 
		var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
		if ((evt.keyCode == 13) && (node.type=="text"))  
		{
			return false;
		} 
	} 
	document.onkeypress = stopRKey; 

/*===================== Games Remaining =========================
  Check to see the number of guesses remaining and don't allow the
  player to play anymore if there are no more guesses remaining.
  Disable the input box and tell them the stats.
=================================================================*/	
	function winner()
	{
		//triesRemainingUpdates();
		gamesRemaining = 0;
		document.getElementById("numberRemainingText").innerHTML = "Number of guesses remaining: "+
		" <span style=\"color:rgb(219,112,147); font-size: 28px;\">"+gamesRemaining+"</span>" +
		"<span style=\"color:rgb(219,112,147); font-size: 28px;\"> "+
		"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspComputer Guess: "+computerGuess+"</span>";
		document.getElementById("gameStatus").innerHTML += "<br>"+"You guessed the correct number: "+
		"<span style=\"color:rgb(219,112,147); font-size: 28px;\">"+
		playerGuess+"</span> <span style=\"color:rgb(0,155,0); font-size: 28px;\"> (Winner!)</span> "+
		" Tries remaining:<span style=\"color:rgb(219,112,147); font-size: 28px;\"> "+gamesRemaining+
		"</span><br> Would you like to play another round? Then please hit the Reset at anytime button!";
		document.getElementById('inputBox').disabled = true;
	}
	
/*===================== Games Remaining =========================
  Check to see the number of guesses remaining and don't allow the
  player to play anymore if there are no more guesses remaining.
  Disable the input box and tell them the stats.
=================================================================*/	

	function triesRemaining()
	{	
		if (gamesRemaining === 0)
		{
			gamesRemaining = 0;	
			document.getElementById("gameStatus").innerHTML += "<br>"+
			"<br><span style=\"color:rgb(255,0,0); font-size: 28px;\">You have no more tries! (Exit or play again!)</span><br>"+
			"<br>Your guess was:<span style=\"color:rgb(219,112,147); font-size: 28px;\"> "+playerGuess+
			"</span> Tries remaining:<span style=\"color:rgb(219,112,147); font-size: 28px;\"> "+gamesRemaining;
			document.getElementById('inputBox').disabled = true;
			document.getElementById('submitButton').disabled = true;
		}				
	}
	
/*================= Games Remaining Updates =====================
  Check to see the number of guesses remaining and don't allow the
  player to play anymore if there are no more guesses remaining.
=================================================================*/	
	function triesRemainingUpdates()
	{
		gamesRemaining--;
		document.getElementById("numberRemainingText").innerHTML = "Number of guesses remaining: "+
		" <span style=\"color:rgb(219,112,147); font-size: 28px;\">"+gamesRemaining;
		document.getElementById('inputBox').value = "";
	}
	

/*=================== Restart the Game Over =====================
  Restart the game by using the window object reload attribute.
  Note: This is the same as window.location.reload(true); code.
=================================================================*/
	 document.getElementById("restartGameButton").onclick =function restartGame()
	{
		location.reload(true);
	};
