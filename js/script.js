
// GLOBAL CONSTANTS
const activeRowCellColor = "#A3B1D1";
const cellColor = "#649FC9";
const fieldColor = "#6B5CA5";
const glowGradient = "radial-gradient(white 2%," + activeRowCellColor + " 98%)";
const numOfTries = 8;
const numberOfBeads = 6;
const sequenceLength = 4;

// GLOBAL VARIABLES
let activeCellArray = [];
let beadIdPrefix = "bead"; // this will need to change to "dtopBead" for desktop layout
let currentTry;
// let currentCellIterator; // wait, am I still using this
let glowingCellId;
let glowingCellPosition = 1;
let glowingBeadId;

// GLOBAL ARRAYS
let solutionBeadArray = [];
let solutionSequence = []; //array of numbers corresponding to solution sequence
let solutionBeadNames = [];

let temporaryTryBeadArray = ["", "", "", ""];
let nestedTryBeadArray = [
["", "", "", ""],
["", "", "", ""],
["", "", "", ""],
["", "", "", ""],
["", "", "", ""],
["", "", "", ""],
["", "", "", ""],
["", "", "", ""]
];

let nestedTryScores = [
["", "", "", ""],
["", "", "", ""],
["", "", "", ""],
["", "", "", ""],
["", "", "", ""],
["", "", "", ""],
["", "", "", ""],
["", "", "", ""]
];

// LET'S GET THIS GAME STARTED
let initializeGame = function() {

	// STILL TO DO: Clear global variable arrays
	currentTry = 1;

	//initialize nestedTryBeadArray and nestedTryScores
	for (i = 0; i < numOfTries; i++) {
		for (z = 0; z < sequenceLength; z++) {
			nestedTryBeadArray[i][z] = "";
		}
	}
	console.log("nestedTryBeadArray=", nestedTryBeadArray);
	for (i = 0; i < numOfTries; i++) {
		for (z = 0; z < sequenceLength; z++) {
			nestedTryScores[i][z] = "";
		}
	}
	console.log("nestedTryScores=", nestedTryScores);

	// Randomly assign solutionSequence
	for (i = 0; i < sequenceLength; i++ ) {
		solutionSequence[i] = Math.floor(Math.random() * 6) + 1;
		solutionBeadNames[i] = "bead" + solutionSequence[i];
		var currentBead = './img/bead' + solutionSequence[i] + '.png';
		var currentTargetImgId = 'solImg' + (i + 1);
		document.getElementById(currentTargetImgId).setAttribute("src", currentBead);
	};
	// Populate solutionBeadArray
	for (i = 0; i < numberOfBeads; i++) {
		solutionBeadArray[i] = "bead" + (i+1);
	};
	console.log('the random secret solution is', solutionSequence);
	console.log('and the bead names for the solution are', solutionBeadNames);
};

initializeGame();

///////////////////////////////

let assignGlowToCell = function(cell) {
	document.getElementById(glowingCellId).style.backgroundImage = '';
	cell.style.backgroundImage = glowGradient;
	glowingCellId = cell.id;
	return glowingCellPosition = cell.id.toString().split('').pop();
	console.log("glowingCellId=", glowingCellId, "and position is", glowingCellPosition);
};

let selectBead = function() {
	document.getElementById(glowingBeadId).style.backgroundImage = '';
	document.getElementById(glowingBeadId).style.backgroundColor = activeRowCellColor;			
	this.style.backgroundImage = glowGradient;
	glowingBeadId = this.id;
	let targetTryBeadArray = "try" + currentTry + "beadArray";
	temporaryTryBeadArray[glowingCellPosition -1] = glowingBeadId;
	for(i = 0; i < sequenceLength; i++) {
		if(temporaryTryBeadArray[i] === solutionBeadNames[i]) {
			console.log("index " + i + " matches...gameOver");
		} else {
			console.log('index' + i + "doesn't match ... onto next turn");
		};
	};


	// need to implement currentTry iterator when a turn is finished
	// perhaps at the end of each selectBead, test to see if current array is full, call
	// helper functions to score, etc., and then...
	// currentTry++

};

///////////////////////////////////

// LET'S TAKE SOME TURNS ("TRIES") TO FIGURE OUT THE SOLUTION SEQUENCE

let trySequence = function() {

	// Make the "active" cell (that a bead can be assigned to) glow. Default = first cell in the active row.
	///////
	glowingCellId = "try" + currentTry + "_" + 1;
	console.log("initial glowingCellId = " + glowingCellId);
	document.getElementById(glowingCellId).style.backgroundImage = glowGradient;
	let currentTryObject = "try" + currentTry + "beadObject";

	// Make the current "try" row a different color and turn on listeners
	for (i = 0; i < sequenceLength; i++) {
		let currentCellId = "try" + currentTry + "_" + (i+1);
		activeCellArray[i] = currentCellId;
		document.getElementById(currentCellId).style.backgroundColor = activeRowCellColor;
		let currentScoreId = "score" + currentTry + "_" + (i+1);
		document.getElementById(currentScoreId).style.backgroundColor = activeRowCellColor;
		document.getElementById(activeCellArray[i]).addEventListener('click', function() {
			assignGlowToCell(this)});
	}

	for (z = 0; z < numberOfBeads; z++) {
		let currentBeadId = beadIdPrefix + (z + 1);
		glowingBeadId = currentBeadId;
		document.getElementById(currentBeadId).style.backgroundColor = activeRowCellColor;
		document.getElementById(currentBeadId).addEventListener('click', selectBead);

	}

	console.log("currentTry = " + currentTry);
	//if CurrentTry === 9, gameLost function call

	console.log('final status for glowing cell =', glowingCellId);

}

trySequence();



