
// GLOBAL CONSTANTS
const sequenceLength = 4;
const numOfTries = 8;
const cellColor = "#C6D8FF";

// GLOBAL VARIABLES
let currentTry;

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

let sequenceTry = function() {
	var glowingCellId = "Try" + currentTry + "_" + 1;
	// make glowingCell glow ... well, sort of
	//document.getElementById(glowingCellId).setAttribute("background-image", "#72195A");
	for (i = 0; i < sequenceLength; i++) {
		console.log('currentTry = ' + currentTry);
		document.addEventListener
		var currentCellId = "Try" + currentTry + "_" + (i+1);
		console.log("currentCellId = " + currentCellId)
		console.log("");
		//if CurrentTry === 9, gameLost function call
	}
	currentTry++
	console.log("currentTry = " + currentTry);

}

sequenceTry();

