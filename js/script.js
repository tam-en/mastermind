
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
let glowingCellId;
let glowingCellPosition = 1;
let glowingBeadId;

// GLOBAL ARRAYS
//let solutionSequence = []; //array of numbers corresponding to solution sequence
let solutionBeadNames = [];

//let temporaryTryBeadArray = ["", "", "", ""];
let nestedTryBeadArray = [
["", "", "", ""], // index 0 = 1st try bead sequence
["", "", "", ""], // index 1 = 2nd try bead sequence
["", "", "", ""], // etc. ...
["", "", "", ""],
["", "", "", ""],
["", "", "", ""],
["", "", "", ""],
["", "", "", ""]
];

let nestedTryScores = [
["", "", "", ""], // index 0 = try 1 scores
["", "", "", ""], // index 1 = try 2 scores
["", "", "", ""], // etc. ...
["", "", "", ""],
["", "", "", ""],
["", "", "", ""],
["", "", "", ""],
["", "", "", ""]
];

// LET'S GET THIS GAME STARTED
let initializeGame = function() {

	currentTry = 1;

	//initialize nestedTryBeadArray and nestedTryScores
	for (i = 0; i < numOfTries; i++) {
		for (z = 0; z < sequenceLength; z++) {
			nestedTryBeadArray[i][z] = "";
		}
	};

	for (i = 0; i < numOfTries; i++) {
		for (z = 0; z < sequenceLength; z++) {
			nestedTryScores[i][z] = "";
		}
	};

	// Randomly assign solutionSequence
	for (i = 0; i < sequenceLength; i++ ) {
		var solutionSequence =[];
		solutionSequence[i] = Math.floor(Math.random() * 6) + 1;
		solutionBeadNames[i] = "bead" + solutionSequence[i];
		var currentBead = './img/bead' + solutionSequence[i] + '.png';
		var currentTargetImgId = 'solImg' + (i + 1);
		document.getElementById(currentTargetImgId).setAttribute("src", currentBead);
	};


	console.log('the random secret solution is', solutionSequence);
	console.log('and the bead names for the solution are', solutionBeadNames);
};

initializeGame();

///////////////////////////////

// let displaySubmitBtn = function() {
// 	var targetLabelId = "tryLabel" + currentTry;
// 	document.getElementById(targetLabelId).style.backgroundImage = './img/blank.png';
// }

let assignGlowToCell = function(cell) {
	document.getElementById(glowingCellId).style.backgroundImage = '';
	cell.style.backgroundImage = glowGradient;
	glowingCellId = cell.id;
	glowingCellPosition = cell.id.toString().split('').pop();
	console.log("glowingCellId=", glowingCellId, "and position is", glowingCellPosition);
};

let selectBead = function() {

	// Store the clicked bead Id as "glowingBeadId" and make it glow (well, sort of) 
	document.getElementById(glowingBeadId).style.backgroundImage = '';
	document.getElementById(glowingBeadId).style.backgroundColor = activeRowCellColor;			
	this.style.backgroundImage = glowGradient;
	glowingBeadId = this.id;
	nestedTryBeadArray[currentTry-1][glowingCellPosition-1] = glowingBeadId;
	console.log("xxglowingBeadId= " + glowingBeadId + " and nestedTryBeadArray[" + currentTry + "-1][" + glowingCellPosition +"-1] is " + nestedTryBeadArray[currentTry-1][glowingCellPosition-1]);
	var selectedBeadPng = './img/' + glowingBeadId + '.png';
	var currentTargetImgId = glowingCellId + "img";
	console.log("selectedBeadPng=", selectedBeadPng);

	document.getElementById(currentTargetImgId).setAttribute("src", selectedBeadPng);

	//test to see if nestedTryBeadArray[currentTry-1] is full, and if so, activate "submit" button
	var selectedBeadCount = 0;
	for(i = 0; i<sequenceLength; i++) {
		if(nestedTryBeadArray[currentTry-1][i] !== '') {
			selectedBeadCount++;
		};
	};

	if(selectedBeadCount === 4) {
		// make submit button available
		console.log("all of the bead cells are full!");
	};





};

let compareTryToSolution = function() {

	var exactMatchCount = 0;
	for(i = 0; i < sequenceLength; i++) {
		if(nestedTryBeadArray[currentTry-1][i] === solutionBeadNames[i]) {
			exactMatchCount++;
		} else {
		};
	};


	console.log("exact match count =", exactMatchCount);
	if(exactMatchCount === 4) {
		console.log("need to run the gameWon function");
	}

	console.log(nestedTryBeadArray[currentTry-1]);

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

console.log("solutionBeadNames=", solutionBeadNames);



