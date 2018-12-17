// GLOBAL CONSTANTS
const ACTIVE_ROW_CELL_COLOR = "#A3B1D1";
const CELL_COLOR = "#649FC9";
const GLOW_GRADIENT = "radial-gradient(white 2%," + ACTIVE_ROW_CELL_COLOR + " 98%)";
const NUM_OF_TRIES = 8;
const NUM_OF_BEADS = 6;
const SEQUENCE_LENGTH = 4;

// GLOBAL VARIABLES
let activeCellArray = []; 
let beadIdPrefix = "bead"; // this will need to change to "dtopBead" for desktop layout someday
let currentTry;
let currentCellId;
let displayHelpOnOff = 1;
let previousCellId;
let glowingCellId;
let glowingCellPosition;
let currentBeadId = "bead2";
let glowingBeadId;
let previousGlowingBeadId;

// GLOBAL ARRAYS
let solutionBeadNames = [];

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


// EVERY TIME GAME STARTS OR RESTARTS
let initializeGame = function() {

	currentTry = 0;
	// Hide solution divs:
	for(i=1; i < (SEQUENCE_LENGTH + 1); i++) {
		let prefix = "solution"
		let targetCellId = prefix + i;
		document.getElementById(targetCellId).style.visibility = "hidden";
	};

	// Randomly assign solutionSequence:
	for (i = 0; i < SEQUENCE_LENGTH; i++ ) {
		var solutionSequence =[];
		solutionSequence[i] = Math.floor(Math.random() * 6) + 1;
		solutionBeadNames[i] = "bead" + solutionSequence[i];
		var currentBead = './img/bead' + solutionSequence[i] + '.png';
		var currentTargetImgId = 'solImg' + (i + 1);
		document.getElementById(currentTargetImgId).setAttribute("src", currentBead);
	};

	// Give the first row active color
	for (i=0; i<SEQUENCE_LENGTH; i++) {
		targetCellId = "try" + (currentTry+1) + "_" + (i+1);
		document.getElementById(targetCellId).style.backgroundColor = ACTIVE_ROW_CELL_COLOR;
	};
	trySequence();
};

// FIRST TIME GAME LOADS
let firstLoadInitialize = function() {
	// Turn on bead listeners
	for (z = 0; z < NUM_OF_BEADS; z++) {
		currentBeadId = beadIdPrefix + (z + 1);
		document.getElementById(currentBeadId).style.backgroundColor = ACTIVE_ROW_CELL_COLOR;
		document.getElementById(currentBeadId).addEventListener('click', function(){
			nestedTryBeadArray[currentTry-1][glowingCellPosition-1] = this.id;
			previousGlowingBeadId = glowingBeadId;
			currentBeadId = this.id;
			glowingBeadId = this.id;
			selectBeadVisuals(this.id);
		});
	};
	// Turn on listeners for all of the try (i.e. guess) cells
	let targetCellId;
	for (z=0; z < NUM_OF_TRIES; z++) {
		for (i = 0; i < SEQUENCE_LENGTH; i++) {
			targetCellId = "try" + (z + 1) + "_" + (i+1);
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
	document.getElementById("gearImg").addEventListener('click', function(){
		displayHelpOnOff++;
		if(displayHelpOnOff % 2 === 0) {
			document.getElementById("helpWindow").style.visibility = "visible";	
		} else {
			document.getElementById("helpWindow").style.visibility = "hidden";				
		};
	});

	initializeGame();
};
firstLoadInitialize();

// 
let reInitialize = function() {
	// Give a dark color and blank PNG to all try cells, all score cells
	for (i = 0; i < NUM_OF_TRIES; i++) {
		for (z = 0; z < SEQUENCE_LENGTH; z++) {
			nestedTryBeadArray[i][z] = ""; // Initialize nestedTryBeadArray:
			nestedTryScores[i][z] = "";    // Initialize nestedTryScores;

			let targetCellId = "try" + (i+1) + "_" + (z+1);
			let targetImgId = "try" + (i+1) + "_" + (z+1) + "img";
			let blankie = "./img/blank.png";

			document.getElementById(targetCellId).style.backgroundColor = CELL_COLOR;
			document.getElementById(targetImgId).setAttribute("src", blankie);
			document.getElementById(targetCellId).style.backgroundImage = "";

			targetCellId = "score" + (i+1) + "_" + (z+1);
			targetImgId = "score" + (i+1) + "_" + (z+1) + "img";

			document.getElementById(targetCellId).style.backgroundColor = CELL_COLOR;
			document.getElementById(targetImgId).setAttribute("src", blankie);
		};
	};
	document.getElementById("tippy").style.backgroundImage = '';
	document.getElementById("tippy").textContent = '';
	document.getElementById("tippy").removeEventListener('click', reInitialize);
	// document.getElementById("tippy").textContent = "help?";
	document.getElementById("heady").style.visibility = "visible";
	document.getElementById("gear").style.visibility = "visible";
	document.getElementById("background").style.visibility = "visible";


	initializeGame();
};

// DISPLAY SUBMIT BUTTON ONCE TRY ROW IS FULL
let displaySubmitBtn = function() {
	var targetLabelId = "tryLabel" + currentTry;
	document.getElementById(targetLabelId).style.backgroundImage = GLOW_GRADIENT;
	document.getElementById(targetLabelId).style.color = "black";

	document.getElementById(targetLabelId).textContent = "GO!";
	document.getElementById(targetLabelId).addEventListener('click', compareTryToSolution);
};


// MAKE A CELL "GLOW" (SORT OF) WHEN IT'S CLICKED ON
function makeCellGlow(cell) {
	document.getElementById(previousCellId).style.backgroundImage = '';
	glowingCellPosition = Number(glowingCellId.toString().split('').pop());
	document.getElementById(cell).style.backgroundImage = GLOW_GRADIENT;
	glowingCellId = cell;

};

// MAKE A CLICKED BEAD "GLOW" WHEN SELECTED, REVERT TO REGULAR BACKGROUND WHEN ANOTHER IS SELECTED
function selectBeadVisuals(bead) {
	glowingBeadId = bead;
	document.getElementById(glowingBeadId).style.backgroundImage = GLOW_GRADIENT;
	var selectedBeadPng = './img/' + glowingBeadId + '.png';
	var currentTargetImgId = glowingCellId + "img";
	document.getElementById(currentTargetImgId).setAttribute("src", selectedBeadPng);

	//bookmark
	
	//test to see if nestedTryBeadArray[currentTry-1] is full, and if so, activate "submit" button
	var selectedBeadCount = 0;
	for(i = 0; i<SEQUENCE_LENGTH; i++) {
		if(nestedTryBeadArray[currentTry-1][i] !== '') {
			selectedBeadCount++;
		};
	};

	if(selectedBeadCount === 4) {
		displaySubmitBtn();
	};
};


let compareTryToSolution = function() {
	// Turn off the submit button now that try array has been submitted
	var targetLabelId = "tryLabel" + currentTry;
	document.getElementById(targetLabelId).textContent = currentTry;
	document.getElementById(targetLabelId).style.color = "white";	
	document.getElementById(targetLabelId).removeEventListener('click', compareTryToSolution);
	document.getElementById(targetLabelId).style.backgroundImage = '';

	// A few local variables to hold solution array, the try (guess) array, and arrays for holding
	// the elements that have been scored/counted (so that they're not counted again)
	let copyOfSolution = new Array(4); // because we can't mess with the actual solution sequence!
	for(i=0; i<SEQUENCE_LENGTH; i++) {
		copyOfSolution[i] = solutionBeadNames[i];
	};
	let compareSolution = new Array(4);     // temp array to hold elements that have been scored/removed from copyOfSolution
	let copyOfTryArray = new Array(4); // because we can't mess with the actual submitted "try" array
	for(i=0; i<SEQUENCE_LENGTH; i++) {
		copyOfTryArray[i] = nestedTryBeadArray[currentTry-1][i];
	};
	let compareTry = new Array(4);  // temp array to hold elements that have been scroed/removed from copyOfTryArray
	let exactMatchCount = 0;  // how many "try" elements match shape AND position of solution array
	let partialMatchCount = 0;  // how many "try" elements match the shape but not position of solution array

	for(i = 0; i < SEQUENCE_LENGTH; i++) {              // first sort out/count ALL exact matches
		if(copyOfTryArray[i] === copyOfSolution[i]) {
			compareTry[i] = copyOfTryArray[i];
			copyOfTryArray[i] = "";
			compareSolution[i] = copyOfSolution[i];
			copyOfSolution[i] = "";
			exactMatchCount++;
		}
	};

	for(i = 0; i < SEQUENCE_LENGTH; i++) {  // from remaining elements, sort out/count ones that match shape but not position
		for(z = 0; z < SEQUENCE_LENGTH; z++) {
			if(copyOfTryArray[i] && copyOfSolution[z] && (copyOfTryArray[i] === copyOfSolution[z])) {
				compareTry[i] = copyOfTryArray[i];
				copyOfTryArray[i] = "";
				compareSolution[z] = copyOfSolution[z];
				copyOfSolution[z] = "";
				partialMatchCount++;
			};
		}
	};

	if (currentTry <= 8) {
		populateScoreCells(exactMatchCount, partialMatchCount);
		if(exactMatchCount === 4) {
			gameWon();
		} else {
			if(currentTry === 8) {
				gameLost();
			} else {
				changeActiveRow();
			}
		}
	};
};

function populateScoreCells(exactMatches, partialMatches) {
	let tempScoreImgArr =[];
	for(i=0; i<exactMatches; i++) {
		tempScoreImgArr.push("./img/exactMatch.png");
	};
	for(i=0; i<partialMatches; i++) {
		tempScoreImgArr.push("./img/partialMatch.png");
	};
	let targetCellId;
	let scoreImg;
	for(i=0; i < tempScoreImgArr.length; i++) {
		targetCellId = "score" + currentTry + "_" + (i+1) + "img";
		scoreImg = tempScoreImgArr[i];
		document.getElementById(targetCellId).setAttribute("src", scoreImg);
	};
};

// ONCE A "TRY" ROW HAS BEEN SUBMITTED FOR SCORING, TURN THE ROW BACK TO REGULAR COLOR, HIGHLIGHT NEXT ROW
function changeActiveRow() {
	// Lighted colors in active (currentTry-1) row.
	for (i = 0; i < SEQUENCE_LENGTH; i++) {
		currentCellId = "try" + (currentTry) + "_" + (i+1);
		document.getElementById(currentCellId).style.backgroundColor = CELL_COLOR;
		document.getElementById(currentCellId).style.backgroundImage = '';
		currentCellId = "try" + (currentTry+1) + "_" + (i+1);
		document.getElementById(currentCellId).style.backgroundColor = ACTIVE_ROW_CELL_COLOR;
		let currentScoreId = "score" + (currentTry) + "_" + (i+1);
		document.getElementById(currentScoreId).style.backgroundColor = CELL_COLOR;
	};
	glowingCellId = currentCellId;
	trySequence();
};

// HEART OF THE GAME: GUESS (DEDUCE?) THE SOLUTION SEQUENCE
function trySequence() {
	// Initialize nestedTryBeadArray[currentTry-1], glowingCellPosition = 1, and increment currentTry:
	nestedTryBeadArray[currentTry-1] = [];
	glowingCellPosition = 1;
	currentTry ++;

	// Make the "active" cell (that a bead can be assigned to) glow. Default = first cell in the active row.
	glowingCellId = "try" + currentTry + "_" + 1;
	currentCellId = glowingCellId;
	document.getElementById(glowingCellId).style.backgroundImage = GLOW_GRADIENT;

	// Make the currentTry "try" row & score cells a different color 
	let targetCellId;
	for (i = 0; i < SEQUENCE_LENGTH; i++) {
		targetCellId = "try" + currentTry + "_" + (i+1);
		activeCellArray[i] = targetCellId;
		document.getElementById(currentCellId).style.backgroundColor = ACTIVE_ROW_CELL_COLOR;
		let currentScoreId = "score" + currentTry + "_" + (i+1);
		document.getElementById(currentScoreId).style.backgroundColor = ACTIVE_ROW_CELL_COLOR;
	};
};

// GAME OVER (WIN OR LOSE)
let gameOver = function() {
	// Reveal solution sequence
	for(i=1; i < (SEQUENCE_LENGTH + 1); i++) {
		let prefix = "solution"
		let targetCellId = prefix + i;
		document.getElementById(targetCellId).style.visibility = "visible";
	};
	document.getElementById("tippy").style.backgroundImage = GLOW_GRADIENT;
	document.getElementById("tippy").addEventListener('click', reInitialize);
	document.getElementById("heady").style.visibility = "hidden";
	document.getElementById("gear").style.visibility = "hidden";
	document.getElementById("background").style.visibility = "hidden";
};

// GAME LOST
let gameLost = function() {
	document.getElementById("tippy").innerHTML = "OH DANG.<br>play again?";
	gameOver();
};

// GAME WON
let gameWon = function() {
	document.getElementById("tippy").innerHTML = "YOU WON!<br>play again?";
	gameOver();
};

