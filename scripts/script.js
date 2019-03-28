/*jshint esversion: 6 */

/*
    1.  Create and assign varables & retrieve the necesaru HTML elements
    2.  Make the flipping work.
    3.  Basic game - no randomization, no timer, just flipping, comparing and       alert box for result.
    4.  Make new game button work
    5.  Randomize the game boxes on loading - also create images.js file here.
    6.  Create timer
    7.  Make the fancy display for results
*/

// 1. ------------------------------------------------------------------

let record = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let imgRec = [];
let rand, flippedCards = 0,
    cardTextRec = [],
    cardRec = [],
    cardNum, front, back, cardChk = 0,
    correct = 0;

let mem = document.getElementById('game'),
    timer = document.getElementById('timer'),
    scoreEl = document.getElementById('score'),
    newGame;

let result = document.getElementById('result'),
    opacityD = document.getElementById('opacityD'),
    h1Res = document.getElementById('h1Res'),
    pRes = document.getElementById('pRes');

let status = 0,
    countDown;
let secsInput = 60,
    seconds = secsInput,
    gameOver = false;


function newBoard() {  //called on windowLoad
    for(var i=0; i<20; i++){
        if(i===0) {
            rand = Math.round(Math.random() * images.length);
            
            while(rand === images.length) {
                rand = Math.round(Math.random() * images.length);
            }
            imgRec[i] = rand;
        } else {
            while(status === 0) { //console.log("this is rand: " + rand);
                rand = Math.round(Math.random() * images.length);
                if(rand !== images.length) {
                    for(let j=0; j<imgRec.length; j++) {
                        if(rand === imgRec[j]) {
                            break;
                        }
                        else if (j === imgRec.length - 1){
                            status = 1;
                            //console.log(rand);
                            imgRec[i] = rand;
                        }
                    }
                }
            }
        }
        status = 0;
        document.getElementById("back" + (i+1)).innerHTML = images[rand];
    }
    // CALL THE TIMER
    startTimer(seconds);
}

function startTimer(secs) {
    timer.innerHTML = "00:" + secs;
     
      if(secs === -1) {
          clearTimeout(countDown);
          displayResult();
          timer.innerHTML = "00:00";
          return;
      }
    //recurring function
    countDown = setTimeout(() => { startTimer(secs)}, 1000);
   
        secs--;
    
} 


function displayResult() {
    gameOver = true;

    const width = window.innerWidth;

    opacityD.style.display = "block";
    result.style.display = "block";   
    result.style.left = (width/2) - (500/2) + "px";
    result.style.top = 150 + "px";
    
    if(correct === 10) {
        h1Res.innerHTML = "Gongratulations! You won!";
        pRes.innerHTML = "You've scored " + correct + " points.";
    }else {
        h1Res.innerHTML = "Try again!";
        pRes.innerHTML = "You've scored " + correct + " points.";
    }
    
    
//if(correct === 10){
//    gameOver = true;
//    alert("Gongrats! You've won! Your score is " + correct);
//} else {
//    alert("Your score is " + correct);
//}
}

// 2. CARD FLIPPING -----------------------------------------------------
function cardClick(cardId) {
    
    cardNum = cardId.replace("card", "");
    cardNum = parseInt(cardNum, 10);
    
    // IF conditions
    if (record[cardNum - 1] === 0 && cardChk === 0 && !gameOver) {

        // Do the actual flipping
        front = document.getElementById("front" + cardNum);
        back = document.getElementById("back" + cardNum);
        front.style.transform = "rotateY(-180deg)";
        back.style.transform = "rotateY(0deg)";

        // 3. BASIC GAME --------------------------------------------------------
        // Change data of variables, compare the 2 flipped cards, display result etc.

        cardTextRec.push(back.innerHTML);
        cardRec.push(cardNum);

        flippedCards++;
        record[cardNum - 1] = 1;

        if (flippedCards === 2) { // Two cards have been flipped... Compare them.
//            console.log(cardTextRec[0]);
//            console.log(cardTextRec[1]);
            if (cardTextRec[0] === cardTextRec[1]) { // same card, increase points
                correct++;
                scoreEl.innerHTML = "Score: " + correct;

                cardRec = [];
                cardTextRec = [];
                flippedCards = 0;

                if (correct === 10) { // display result and stop game
                    clearTimeout(countDown);
                    
                    setTimeout(function () {
                        displayResult();
                    }, 1000);
                    
                }
                return;

            } else {
                //Flip back because the two cards were not the same
                cardChk = 1;
                // call the flipBack function at a time delay of 600ms
                setTimeout(function() { flipBack(); }, 600);      
                 return;
            }
        }
    }

    if (gameOver) {
        alert("Game is over. Click on the New Game button to start a new game.");
    }
}

function flipBack() {
    //card1
    front = document.getElementById("front" + cardRec[0]);
    back = document.getElementById("back" + cardRec[0]);
    front.style.transform = "rotateY(0)";
    back.style.transform = "rotateY(180deg)";

    //card 2
    front = document.getElementById("front" + cardRec[1]);
    back = document.getElementById("back" + cardRec[1]);
    front.style.transform = "rotateY(0)";
    back.style.transform = "rotateY(180deg)";

    record[cardRec[0] - 1] = 0;
    record[cardRec[1] - 1] = 0;
    cardTextRec = [];
    cardRec = [];
    flippedCards = 0;
    cardChk = 0;
}

mem.addEventListener("click", function(e) {
    let el = e.target.parentElement; // el == front# --> parentId == card#
    let numId = el.id; // == card#

    if (Number.isInteger(parseInt(numId.replace("back", ""), 10))) {
        cardClick(el.parentElement.id);
    } else {
        cardClick(numId);
    }
});


// 4. New game button -----------------------------------------
newGame = document.getElementById("new");
newGame.addEventListener("click", () => {
    window.location.reload();
});

const okayButton = document.getElementById("okayButton");
okayButton.addEventListener("click", () => {
    result.style.display = "none";
    opacityD.style.display = "none";
});

window.onload = newBoard();



