
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


	//console.log('the random secret solution is', solutionSequence);
	//console.log('and the bead names for the solution are', solutionBeadNames);
};

initializeGame();

/////////////////////////////// helper functions. . . .

let displaySubmitBtn = function() {
	var targetLabelId = "tryLabel" + currentTry;
	document.getElementById(targetLabelId).style.backgroundImage = glowGradient;
	//document.getElementById(targetLabelId).style.backgroundImage = "url('./img/blank.png')";
	document.getElementById(targetLabelId).textContent = "GO!";
	document.getElementById(targetLabelId).addEventListener('click', compareTryToSolution);
}

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
		//compareTryToSolution();
	};





};

let compareTryToSolution = function() {

	// Turn off the submit button now that try array has been submitted

	var targetLabelId = "tryLabel" + currentTry;
	document.getElementById(targetLabelId).textContent = currentTry;
	document.getElementById(targetLabelId).removeEventListener('click', compareTryToSolution);
	document.getElementById(targetLabelId).style.backgroundImage = '';

	let copyOfSolution = solutionBeadNames;
	let compareSolution = new Array(4);
	let copyOfTryArray = nestedTryBeadArray[currentTry-1];
	let compareTry = new Array(4);
	let exactMatchCount = 0;
	let partialMatchCount = 0;  

			console.log("exactMatchCount=", exactMatchCount);
			console.log("copyOfSolution array=", copyOfSolution);
			console.log("compareSolution array=", compareSolution)
			console.log("copyOfTryArray =", copyOfTryArray);
			console.log("compareTry =", compareTry);


	for(i = 0; i < sequenceLength; i++) {
		if(copyOfTryArray[i] === copyOfSolution[i]) {
			compareTry[i] = copyOfTryArray[i];
			copyOfTryArray[i] = "";
			compareSolution[i] = copyOfSolution[i];
			copyOfSolution[i] = "";
			exactMatchCount++;
		}
	};

	for(i = 0; i < sequenceLength; i++) {
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
			
			console.log("compareSolution array=", compareSolution)
			console.log("copyOfSolution array=", copyOfSolution);
			console.log("copyOfTryArray =", copyOfTryArray);
			console.log("compareTry =", compareTry);
			console.log("exactMatchCount=", exactMatchCount);
			console.log("partialMatchCount=", partialMatchCount);




	// for(i = 0; i < sequenceLength; i++) {
	// 	if(nestedTryBeadArray[currentTry-1][i] === solutionBeadNames[i]) {
	// 		exactMatchCount++;
	// 	} else {
	// 	};
	// };

	console.log("exact match count =", exactMatchCount);
	if(exactMatchCount === 4) {
		console.log("need to run the gameWon function");
	}

	//console.log(nestedTryBeadArray[currentTry-1]);

		// need to implement currentTry iterator when a turn is finished
	// perhaps at the end of each selectBead, test to see if current array is full, call
	// helper functions to score, etc., and then...
	// currentTry++
};


// HEART OF THE GAME: GUESS (DEDUCE?) THE SOLUTION SEQUENCE

let trySequence = function() {

	// Make the "active" cell (that a bead can be assigned to) glow. Default = first cell in the active row.
	///////
	glowingCellId = "try" + currentTry + "_" + 1;
	//console.log("initial glowingCellId = " + glowingCellId);
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

	//console.log("currentTry = " + currentTry);
	//if CurrentTry === 9, gameLost function call

	//console.log('final status for glowing cell =', glowingCellId);
};

trySequence();

//console.log("solutionBeadNames=", solutionBeadNames);



