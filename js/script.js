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
let currentTry = 0;
let currentCellId;
let previousCellId;
let glowingCellId;
let glowingCellPosition;
let currentBeadId = "bead2";
let glowingBeadId;
let previousGlowingBeadId;

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

	// Turn on bead listeners
	for (z = 0; z < numberOfBeads; z++) {
		currentBeadId = beadIdPrefix + (z + 1);
		document.getElementById(currentBeadId).style.backgroundColor = activeRowCellColor;
		document.getElementById(currentBeadId).addEventListener('click', function(){
			nestedTryBeadArray[currentTry-1][glowingCellPosition-1] = this.id;
			console.log("nestedTryBeadArray[currentTry-1][glowingCellPosition-1]", nestedTryBeadArray[currentTry-1][glowingCellPosition-1]);
			previousGlowingBeadId = glowingBeadId;
			currentBeadId = this.id;
			glowingBeadId = this.id;
			selectBeadVisuals(this.id);
		});
	};

	// Turn on listeners for all of the try (i.e. guess) cells
	let targetCellId;
	for (z=0; z < numOfTries; z++) {
		for (i = 0; i < sequenceLength; i++) {
			targetCellId = "try" + (z + 1) + "_" + (i+1);
			//activeCellArray[i] = targetCellId;
			document.getElementById(targetCellId).addEventListener('click', function() {
				if(activeCellArray.includes(this.id)) {
					previousCellId = currentCellId;
					currentCellId = this.id;
					glowingCellId = this.id;
					makeCellGlow(this.id);
				};
			});
		};
	};

	// Give the first row active color
	for (i=0; i<sequenceLength; i++) {
		targetCellId = "try" + (currentTry+1) + "_" + (i+1);
		document.getElementById(targetCellId).style.backgroundColor = activeRowCellColor;
	};
};

initializeGame();

let displaySubmitBtn = function() {
	var targetLabelId = "tryLabel" + currentTry;
	document.getElementById(targetLabelId).style.backgroundImage = glowGradient;
	//document.getElementById(targetLabelId).style.backgroundImage = "url('./img/blank.png')";
	document.getElementById(targetLabelId).textContent = "GO!";
	document.getElementById(targetLabelId).addEventListener('click', compareTryToSolution);
}

function makeCellGlow(cell) {
	document.getElementById(previousCellId).style.backgroundImage = '';
	glowingCellPosition = Number(glowingCellId.toString().split('').pop());

	document.getElementById(cell).style.backgroundImage = glowGradient;
	glowingCellId = cell;
};

function selectBeadVisuals(bead) {
	if(previousGlowingBeadId) { 
		document.getElementById(previousGlowingBeadId).style.backgroundImage = '';
		document.getElementById(previousGlowingBeadId).style.backgroundColor = activeRowCellColor;	
	};

	glowingBeadId = bead;
	document.getElementById(glowingBeadId).style.backgroundImage = glowGradient;

	var selectedBeadPng = './img/' + glowingBeadId + '.png';
	var currentTargetImgId = glowingCellId + "img";

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
		displaySubmitBtn();
	};
};

let compareTryToSolution = function() {

	// Turn off the submit button now that try array has been submitted
	var targetLabelId = "tryLabel" + currentTry;
	document.getElementById(targetLabelId).textContent = currentTry;
	document.getElementById(targetLabelId).removeEventListener('click', compareTryToSolution);
	document.getElementById(targetLabelId).style.backgroundImage = '';

	// A few local variables to hold solution array, the try (guess) array, and arrays for holding
	// the elements that have been scored/counted (so that they're not counted again)
	let copyOfSolution = new Array(4); // because we can't mess with the actual solution sequence!
	for(i=0; i<sequenceLength; i++) {
		copyOfSolution[i] = solutionBeadNames[i];
	};

	console.log("1. nestedTryBeadArray[currentTry-1]=", nestedTryBeadArray[currentTry-1])


	let compareSolution = new Array(4);     // temp array to hold elements that have been scored/removed from copyOfSolution
	let copyOfTryArray = new Array(4); // because we can't mess with the actual submitted "try" array
	for(i=0; i<sequenceLength; i++) {
		copyOfTryArray[i] = nestedTryBeadArray[currentTry-1][i];
	};
	let compareTry = new Array(4);  // temp array to hold elements that have been scroed/removed from copyOfTryArray
	let exactMatchCount = 0;  // how many "try" elements match shape AND position of solution array
	let partialMatchCount = 0;  // how many "try" elements match the shape but not position of solution array

	for(i = 0; i < sequenceLength; i++) {              // first sort out/count ALL exact matches
		if(copyOfTryArray[i] === copyOfSolution[i]) {
			compareTry[i] = copyOfTryArray[i];
			copyOfTryArray[i] = "";
			compareSolution[i] = copyOfSolution[i];
			copyOfSolution[i] = "";
			exactMatchCount++;
		}
	};

	for(i = 0; i < sequenceLength; i++) {  // from remaining elements, sort out/count ones that match shape but not position
		for(z = 0; z < sequenceLength; z++) {
			if(copyOfTryArray[i] && copyOfSolution[z] && (copyOfTryArray[i] === copyOfSolution[z])) {
				compareTry[i] = copyOfTryArray[i];
				copyOfTryArray[i] = "";
				compareSolution[z] = copyOfSolution[z];
				copyOfSolution[z] = "";
				partialMatchCount++;
			};
		}
	};

	console.log("2. nestedTryBeadArray[currentTry-1]=", nestedTryBeadArray[currentTry-1])


	console.log("copyOfSolution array=", copyOfSolution);
	console.log("compareSolution array=", compareSolution);
	console.log("copyOfTryArray =", copyOfTryArray);
	console.log("compareTry =", compareTry);
	console.log("exactMatchCount=", exactMatchCount);
	console.log("partialMatchCount=", partialMatchCount);

	if(exactMatchCount === 4) {
		console.log("need to run the gameWon function");
	};

	// do I need to next these so that changeActiveRow isn't called after gameWon function runs?

	if(currentTry <= 8) {
		changeActiveRow();
	};
};



let changeActiveRow = function() {
	// turn off listeners and light colors in currentTry-1 row.

	console.log("zzz beginning of changeActiveRow function, currentCellId=", currentCellId);
	//console.log("zzz glowingCellId=", glowingCellId, "glowingCellPosition=");
	console.log("zzz", glowingCellPosition, "and glowingBeadId=", glowingBeadId, "and currentBeadId=", currentBeadId);
	console.log("");


	glowingCellPosition = 1;
	let glowingCellId = "try" + currentTry + "_" + glowingCellPosition;

	for (i = 0; i < sequenceLength; i++) {
		currentCellId = "try" + (currentTry) + "_" + (i+1);
		document.getElementById(currentCellId).style.backgroundColor = cellColor;
		document.getElementById(currentCellId).style.backgroundImage = '';
		currentCellId = "try" + (currentTry+1) + "_" + (i+1);
		document.getElementById(currentCellId).style.backgroundColor = activeRowCellColor;



		// document.getElementById(currentCellId).removeEventListener('click', function() {
		// 	document.getElementById(glowingCellId).style.backgroundImage = '';
		// 	document.getElementById(currentCellId).style.backgroundImage = glowGradient;
		// 	glowingCellId = currentCellId;
		// 	glowingCellPosition = currentCellId.toString().split('').pop();		
		// 
		let currentScoreId = "score" + (currentTry) + "_" + (i+1);
		document.getElementById(currentScoreId).style.backgroundColor = cellColor;

	};

	//console.log("will this help?", glowingCellId);


	trySequence();
};

// HEART OF THE GAME: GUESS (DEDUCE?) THE SOLUTION SEQUENCE

let trySequence = function() {


	// Initialize nestedTryBeadArray[currentTry-1], glowingCellPosition = 1, and increment currentTry:
	nestedTryBeadArray[currentTry-1] = [];
	glowingCellPosition = 1;
	currentTry ++;

	// Make the "active" cell (that a bead can be assigned to) glow. Default = first cell in the active row.
	glowingCellId = "try" + currentTry + "_" + 1;
	currentCellId = glowingCellId;

	console.log("zzz before the meat of the trySequence function, currentCellId=", currentCellId);
	console.log("zzz glowingCellId=", glowingCellId, "glowingCellPosition=");
	console.log("zzz", glowingCellPosition, "and glowingBeadId=", glowingBeadId, "and currentBeadId=", currentBeadId);
	console.log("");
	document.getElementById(glowingCellId).style.backgroundImage = glowGradient;

	// Make the first "try" row a different color and turn on listeners

	let targetCellId;

	for (i = 0; i < sequenceLength; i++) {
		targetCellId = "try" + currentTry + "_" + (i+1);
		activeCellArray[i] = targetCellId;
		document.getElementById(currentCellId).style.backgroundColor = activeRowCellColor;
		let currentScoreId = "score" + currentTry + "_" + (i+1);
		document.getElementById(currentScoreId).style.backgroundColor = activeRowCellColor;
		// document.getElementById(targetCellId).addEventListener('click', makeCellGlow);
	};

};

trySequence();

