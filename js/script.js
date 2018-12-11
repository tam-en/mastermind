
// GLOBAL CONSTANTS
const activeRowCellColor = "#A3B1D1";

const bead1img = "img/bead1.png"; // DO I EVEN NEED THESE? PATH IS WRONG FROM SCRIPT.JS
const bead2img = "img/bead2.png";
const bead3img = "img/bead3.png";
const bead4img = "img/bead4.png";
const bead5img = "img/bead5.png";
const bead6img = "img/bead6.png";

const cellColor = "#649FC9";
const fieldColor = "#6B5CA5";
const glowGradient = "radial-gradient(white 10%," + activeRowCellColor + " 90%)";
const numOfTries = 8;
const numberOfBeads = 6;
const sequenceLength = 4;


// GLOBAL VARIABLES
let activeCellArray = [];
let beadIdPrefix = "bead"; // this will need to change to "dtopBead" for desktop layout
let currentTry;
let glowingCellId;
let glowingBeadId;


// GLOBAL ARRAYS
let masterBeadArray = [];
let solutionSequence = [];

let try1beadArray = [];
let try2beadArray = [];
let try3beadArray = [];
let try4beadArray = [];
let try5beadArray = [];
let try6beadArray = [];
let try7beadArray = [];
let try8beadArray = [];

let try1scores = [];
let try2scores = [];
let try3scores = [];
let try4scores = [];
let try5scores = [];
let try6scores = [];
let try7scores = [];
let try8scores = [];


// LET'S GET THIS GAME STARTED
let initializeGame = function() {

	// STILL TO DO: Clear global variable arrays

	currentTry = 1;

	// Randomly assign solutionSequence
	for (i = 0; i < sequenceLength; i++ ) {
		solutionSequence[i] = Math.floor(Math.random() * 6) + 1;
		var currentBead = './img/bead' + solutionSequence[i] + '.png';
		var currentTargetImgId = 'solImg' + (i + 1);
		document.getElementById(currentTargetImgId).setAttribute("src", currentBead);
	}
	// Populate masterBeadArray
	for (i = 0; i < numberOfBeads; i++) {
		masterBeadArray[i] = "bead" + (i+1);
	}

}

initializeGame();

// LET'S TAKE SOME TURNS ("TRIES") TO FIGURE OUT THE SOLUTION SEQUENCE

let trySequence = function() {

	// Make the "active" cell (that a bead can be assigned to) glow. Default = first cell in the active row.
	glowingCellId = "try" + currentTry + "_" + 1;
	console.log("glowingCellId = " + glowingCellId);
	document.getElementById(glowingCellId).style.backgroundImage = glowGradient;

	// Make the row for the current "try" a different color and turn on listeners
	for (i = 0; i < sequenceLength; i++) {
		let currentCellId = "try" + currentTry + "_" + (i+1);
		activeCellArray[i] = currentCellId;
		document.getElementById(currentCellId).style.backgroundColor = activeRowCellColor;
		let currentScoreId = "score" + currentTry + "_" + (i+1);
		document.getElementById(currentScoreId).style.backgroundColor = activeRowCellColor;
		document.getElementById(activeCellArray[i]).addEventListener('click', function() {
			document.getElementById(glowingCellId).style.backgroundImage = '';
			this.style.backgroundImage = glowGradient;
			glowingCellId = this.id;
		})
	}

	for (i = 0; i < numberOfBeads; i++) {
		let currentBeadId = beadIdPrefix + (i + 1);
		glowingBeadId = currentBeadId;
		document.getElementById(currentBeadId).style.backgroundColor = activeRowCellColor;
		document.getElementById(currentBeadId).addEventListener('click', function() {
			document.getElementById(glowingBeadId).style.backgroundImage = '';
			document.getElementById(glowingBeadId).style.backgroundColor = activeRowCellColor;			
			this.style.backgroundImage = glowGradient;
			glowingBeadId = this.id;
		})
	}



	currentTry++
	console.log("currentTry = " + currentTry);
			//if CurrentTry === 9, gameLost function call

}

trySequence();

