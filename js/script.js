
// GLOBAL CONSTANTS
const sequenceLength = 4;
const numOfTries = 8;
const cellColor = "#649FC9";
const fieldColor = "#6B5CA5";
const activeRowCellColor = "#A3B1D1";
const glowGradient = "radial-gradient(white 10%," + activeRowCellColor + " 90%)";

// GLOBAL VARIABLES
let currentTry;

let activeCellArray = [];

let solutionSequence = [];

let try1beadArray = [];
let try2beadArray = [];
let try3beadArray = [];
let try4beadArray = [];
let try5beadArray = [];
let try6beadArray = [];
let try7beadArray = [];
let try8beadArray = [];


const bead1img = "img/bead1.png";
const bead2img = "img/bead2.png";
const bead3img = "img/bead3.png";
const bead4img = "img/bead4.png";
const bead5img = "img/bead5.png";
const bead6img = "img/bead6.png";


let try1scores = [];
let try2scores = [];
let try3scores = [];
let try4scores = [];
let try5scores = [];
let try6scores = [];
let try7scores = [];
let try8scores = [];

let initializeGame = function() {
	currentTry = 1;
	//randomly assign solutionSequence
	for (i = 0; i < sequenceLength; i++ ) {
		solutionSequence[i] = Math.floor(Math.random() * 6) + 1;
		var currentBead = './img/bead' + solutionSequence[i] + '.png';
		var currentTargetImgId = 'solImg' + (i + 1);
		document.getElementById(currentTargetImgId).setAttribute("src", currentBead);
	}
	//to do: clear try and score arrays
}

initializeGame();

let trySequence = function() {
	var glowingCellId = "try" + currentTry + "_" + 1;
	console.log("glowingCellId = " + glowingCellId);
	// make glowingCell glow ... well, sort of
	document.getElementById(glowingCellId).style.backgroundImage = glowGradient;
	var currentLabelId = "tryLabel" + currentTry;
	document.getElementById(currentLabelId).style.backgroundColor = activeRowCellColor;

	//set up the activeTry row to look and be, well, active
	for (i = 0; i < sequenceLength; i++) {

		// give all try cells in the active row the active-row color
		console.log('currentTry = ' + currentTry);
		var currentCellId = "try" + currentTry + "_" + (i+1);
		activeCellArray[i] = currentCellId;
		console.log("activeCellArray[i] = " + activeCellArray[i]);
		document.getElementById(currentCellId).style.backgroundColor = activeRowCellColor;
		var currentScoreId = "score" + currentTry + "_" + (i+1);
		document.getElementById(currentScoreId).style.backgroundColor = activeRowCellColor;
		console.log("currentCellId = " + currentCellId)
		console.log("");
		document.getElementById(activeCellArray[i]).addEventListener('click', function() {
			console.log('that tickles! ' + this.id);
		})
	}
	currentTry++
	console.log("currentTry = " + currentTry);
			//if CurrentTry === 9, gameLost function call

}

trySequence();

