
// GLOBAL CONSTANTS
const sequenceLength = 4;
const numOfTries = 8;

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


