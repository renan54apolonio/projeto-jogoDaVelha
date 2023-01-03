const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextEelement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
let isCircleTurn;
const restartButton = document.querySelector("[data-restart-button]");

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () =>{
    for (const cell of cellElements){
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true});
    };

    isCircleTurn = false;
    board.classList.add("x");
    winningMessage.classList.remove("show-winning-message")
};

const endGame = (isDraw) => {
    if (isDraw){
        winningMessageTextEelement.innerHTML = "Empate!"
    } else {
        winningMessageTextEelement.innerHTML = isCircleTurn ? "Circulo venceu" : "X venceu"
    };


    winningMessage.classList.add("show-winning-message")
};

const checkForWin = (currentPlayer) =>{
   return winningCombinations.some((combination) => {
    return combination.every((index) => {
        return cellElements[index].classList.contains(currentPlayer);
    });
   });
};

const checkForDraw = () => {
    return [...cellElements].every((cell) => {
      return cell.classList.contains("x") || cell.classList.contains("circle");
    });
  };

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const swpaTurns =() =>{
    isCircleTurn = !isCircleTurn;

    board.classList.remove("x");
    board.classList.remove("circle");
    if(isCircleTurn){
        board.classList.add("circle");
    }else{
        board.classList.add("x");
    };
};

const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    const isWin = checkForWin(classToAdd);
    if(isWin) {
        endGame(false)
    };


    swpaTurns(cell, classToAdd);
};

startGame();

restartButton.addEventListener("click", startGame);