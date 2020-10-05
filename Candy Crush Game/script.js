document.addEventListener("DOMContentLoaded", () =>{

const grid = document.querySelector('.grid');
const width = 8;
let score = 0;
const squares = [];
const candyColors = [
    'url(images/red.png)',
    'url(images/orange.png)',
    'url(images/green.png)',
    'url(images/purple.png)',
    'url(images/blue.png)',
    'url(images/yellow.png)'
];


//Create Board
function createBoard(){
    for(let i = 0; i < width*width; i++){
        const square = document.createElement('div');
        square.setAttribute('draggable', true);
        square.setAttribute('id', i);
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        square.style.backgroundImage = candyColors[randomNumber];
        grid.appendChild(square);
        squares.push(square);
    }
}

createBoard();

//Drag The Candies
let colorBeingDragged;
let colorBeingReplaced
let squareIdBeingDragged;
let squareIdBeingReplaced;

squares.forEach(square => square.addEventListener('dragstart', dragStart));
squares.forEach(square => square.addEventListener('dragend', dragEnd));
squares.forEach(square => square.addEventListener('dragover', dragOver));
squares.forEach(square => square.addEventListener('dragenter', dragEnter));
squares.forEach(square => square.addEventListener('dragleave', dragLeave));
squares.forEach(square => square.addEventListener('drop', dragDrop));


function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id);
    console.log(colorBeingDragged);
    console.log(this.id, 'dragStart');
}

function dragOver(e) {
    e.preventDefault();
    console.log(this.id, 'dragOver');
}

function dragEnter(e) {
    e.preventDefault();
    console.log(this.id, 'dragEnter');
}

function dragLeave() {
    console.log(this.id, 'dragLeave');
}


function dragDrop() {
    console.log(this.id, 'dragDrop');
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
}

function dragEnd() {
    console.log(this.id, 'dragEnd');

    //Valid Moves
    let validMoves = [
        squareIdBeingDragged - 1,
        squareIdBeingDragged - width,
        squareIdBeingDragged + 1,
        squareIdBeingDragged + width
    ]

    let validMove = validMoves.includes(squareIdBeingReplaced);

    if(squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null;
    } else if(squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    } else {
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }
}

// Drop Candies Once Some Have Been Cleared
function moveDown() {
    for(i = 0; i < 55; i++){
        if(squares[i + width].style.backgroundImage === ''){
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
            squares[i].style.backgroundImage = '';
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow = firstRow.includes(i);
            if(isFirstRow && squares[i].style.backgroundImage === ''){
                let randomColor = Math.floor(Math.random() * candyColors.length);
                squares[i].style.backgroundImage = candyColors[randomColor];
            }
        }
    }
}


//Checking For Matches

//check for row of Three
function checkRowForThree() {
    for(i = 0; i < 61; i++){
        let rowOfThree = [i, i+1, i+2];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === '';

        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
        if(notValid.includes(i)){
            continue;
        }

        if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 3;
            rowOfThree.forEach(index => {
                squares[index].style.backgroundImage = '';
            })
        }
    }
}
checkRowForThree();

//check for Column of Three
function checkColumnForThree() {
    for(i = 0; i < 47; i++){
        let columnOfThree = [i, i+width, i+width*2];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === '';

        if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 3;
            columnOfThree.forEach(index => {
                squares[index].style.backgroundImage = '';
            })
        }
    }
}
checkColumnForThree();


//check for row of four
function checkRowForFour() {
    for(i = 0; i < 60; i++){
        let rowOfFour = [i, i+1, i+2, i+3];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === '';

        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55];
        if(notValid.includes(i)){
            continue;
        }

        if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 4;
            rowOfFour.forEach(index => {
                squares[index].style.backgroundImage = '';
            })
        }
    }
}
checkRowForFour();

//check for Column of Four
function checkColumnForFour() {
    for(i = 0; i < 47; i++){
        let columnOfFour = [i, i+width, i+width*2, i+width*3];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === '';

        if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 4;
            columnOfFour.forEach(index => {
                squares[index].style.backgroundImage = '';
            })
        }
    }
}
checkColumnForFour();

window.setInterval(function(){
    moveDown();
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
},100)

});