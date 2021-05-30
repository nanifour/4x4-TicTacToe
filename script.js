//variables
var myBoard;
const playerOne = 'X';
const computer = 'O';
const winningMessageElement = document.getElementById('winningMessage');

//Winning combos of arrays within an array
const youWin = [
    //horizontal wins
	[0, 1, 2, 3],
	[4, 5, 6, 7],
	[8, 9, 10, 11],
    [12, 13, 14, 15],
    //vertical wins
	[0, 4, 8, 12],
	[1, 5, 9, 13],
	[2, 6, 10, 14],
	[3, 7, 11, 15],
    //diagonal wins
    [0, 5, 10, 15],
    [3, 6, 9, 12]
]

//Player select where to go and store reference for cell
const cellElements = document.querySelectorAll('.cell');

startGame();

function startGame() {
	document.querySelector(".gameover").style.display = "none";

	myBoard = Array.from(Array(16).keys()); //4x4 = 16

	for (var i = 0; i < cellElements.length; i++) {
		cellElements[i].innerText = '';
		cellElements[i].style.removeProperty('background-color');
		cellElements[i].addEventListener('click', turnClick, false);  //can click twice
	}
}


function turnClick(box) {
	if (typeof myBoard[box.target.id] == 'number') { //if empty 
		turn(box.target.id, playerOne)               //player turn
		if (!tie()) turn(computerPick(), computer); //computer turn
	}
}


function turn(humanId, player) {
	myBoard[humanId] = player;
	document.getElementById(humanId).innerText = player; //select element just clicked by human player
    //check win after each turn
    let gameWon = checkWin(myBoard, player)
	if (gameWon) gameOver(gameWon)
}

//check to see who won
function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of youWin.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

//game over if won
function gameOver(gameWon) {
	for (let index of youWin[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == playerOne ? "#00c2ff" : "#ef233c";  //human win = blue and computer win = orange
	}
	for (var i = 0; i < cellElements.length; i++) {
		cellElements[i].removeEventListener('click', turnClick, false); //no more click
	}
	document.getElementById("message").innerHTML = gameWon.player == playerOne ? `You Win!` : `You Lose.`;
    //window.alert(gameWon.player == playerOne ? "You win!" : "You lose.");
}

//see which boxes are empty
function emptyboxes() {
	return myBoard.filter(s => typeof s == 'number'); //return # of box becuas it is empty
}

//computer pick empty box
function computerPick() {
	return emptyboxes()[0];
}

//check it there is a tie
function tie() {
    return [...cellElements].every(cell => {
    return cell.classList.contains(playerOne) || cell.classList.contains(computer)
  })
}




