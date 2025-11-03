function start() {
   const cards = Array.from(document.getElementsByTagName("img"));
   const cardValues = ['Ace', 'King', 'Queen', 'Jack', '10', 'Joker'];
   const cardBack = "./cards/card_back_red.png";

   let gameCards = [];
   cardValues.forEach(value => {
      gameCards.push(value, value);
   });

   gameCards = shuffleArray(gameCards);

   cards.forEach((card, index) => {
      card.dataset.value = gameCards[index];
      card.dataset.isFlipped = 'false';
      card.dataset.isMatched = 'false';
      card.src = cardBack;
      
      card.addEventListener('click', handleCardClick);
   });

   window.gameState = {
      flippedCards: [],
      canFlip: true,
      matchedPairs: 0,
      attempts: 0
   };

   createAttemptsCounter();
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
   const newArray = [...array];
   for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
   }
   return newArray;
}

function handleCardClick(event) {
   const card = event.target;
   const isFlipped = card.dataset.isFlipped === 'true';
   const isMatched = card.dataset.isMatched === 'true';
   
   if (isFlipped || isMatched || !window.gameState.canFlip) {
      return;
   }
   
   flipCard(card);
   window.gameState.flippedCards.push(card);
   
   if (window.gameState.flippedCards.length === 2) {
      checkForMatch();
   }
}

function flipCard(card) {
   card.dataset.isFlipped = 'true';
   card.src = `./cards/${card.dataset.value}.png`;
}

function checkForMatch() {
   window.gameState.canFlip = false;
   
   const [card1, card2] = window.gameState.flippedCards;
   
   window.gameState.attempts++;
   updateAttemptsCounter();
   
   if (card1.dataset.value === card2.dataset.value) {
      card1.dataset.isMatched = 'true';
      card2.dataset.isMatched = 'true';
      window.gameState.matchedPairs++;
      
      if (window.gameState.matchedPairs === 6) {
         setTimeout(showFinalScore, 500);
      }
      resetFlippedCards();
   } else {
      setTimeout(() => {
         flipCardBack(card1);
         flipCardBack(card2);
         resetFlippedCards();
      }, 1000);
   }
}

function flipCardBack(card) {
   card.dataset.isFlipped = 'false';
   card.src = './cards/card_back_red.png';
}

function resetFlippedCards() {
   window.gameState.flippedCards = [];
   window.gameState.canFlip = true;
}

function showFinalScore() {
   const attempts = window.gameState.attempts;
   let message = `Congratulations! You won!\n\n`;
   message += `Total attempts: ${attempts}\n\n`;
   
   alert(message);
   
   if (confirm('Would you like to play again?')) {
      restartGame();
   }
}

function createAttemptsCounter() {
   const existingCounter = document.getElementById('attempts-counter');
   if (existingCounter) {
      existingCounter.remove();
   }
   
   const counter = document.createElement('div');
   counter.id = 'attempts-counter';
   counter.innerHTML = `Attempts: <span id="attempts-count">0</span>`;
   counter.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.9);
      padding: 10px 15px;
      border-radius: 10px;
      font-family: Arial, sans-serif;
      font-size: 16px;
      font-weight: bold;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      z-index: 1000;
   `;
   
   document.body.appendChild(counter);
}

function updateAttemptsCounter() {
   const attemptsCount = document.getElementById('attempts-count');
   if (attemptsCount) {
      attemptsCount.textContent = window.gameState.attempts;
   }
}

function restartGame() {
   window.gameState = {
      flippedCards: [],
      canFlip: true,
      matchedPairs: 0,
      attempts: 0
   };
   start();
}

window.addEventListener("load", start, false);