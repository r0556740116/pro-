const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;   

let matchedCards = 0;
let attempts = 0;
let categorySelected = false;


// פונקציה להפוך את הכרטיסים
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
  
    if (!categorySelected) {
      alert("Please select a category before starting the game.");
      return;
    }
  
    this.classList.add("flip");
  
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
  
    secondCard = this;
    attempts++;
    checkForMatch();
  }
  
  
  
// פונקציה לבדוק אם יש התאמה בין הכרטיסים
function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCard() : unflipCard();
}

 function disableCard() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    matchedCards += 2;   
    resetBoard();
    checkGameOver(); 
}


function unflipCard() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 500);
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;

}

function checkGameOver() {
    if (matchedCards === cards.length) { 
        displayEndMessage(); 
    }
}

function displayEndMessage() {
    const endMessage = document.getElementById('endMessage');
    const restartButton = document.getElementById('restartButton');
    endMessage.style.display = 'block'; 
    restartButton.style.display = 'block'; 

endMessage.innerHTML = `<h2>The game is over! all due respect!</h2><p>You finished the game in -${attempts} tries .</p>`;

    restartButton.addEventListener('click', restartGame);
}

// ערבוב הכרטיסים
function shuffle() {
    cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}



function restartGame() {
    matchedCards = 0; 
    attempts = 0;
   cards.forEach(card => {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard); 
    });

    shuffle(); 
    const endMessage = document.getElementById('endMessage');
    const restartButton = document.getElementById('restartButton');
    endMessage.style.display = 'none'; 
    restartButton.style.display = 'none'; 
    unlockChoiceButtons();
}
(function() {
    shuffle(); 
})();


const choiceButtons = document.querySelectorAll("#flagsButton, #catsButton, #harryPotterButton");
function lockChoiceButtons() {
    choiceButtons.forEach(button => {
        button.disabled = true;  
    });
}

 function unlockChoiceButtons() {
     choiceButtons.forEach(button => {
         button.disabled = false; 
     });
 }

cards.forEach((card) => card.addEventListener("click", flipCard));


function chooseHarryPotter() {
    lockChoiceButtons();
     fetch('https://hp-api.onrender.com/api/characters')
         .then(response => response.json())  
         .then(data => {
             createCardPairsHP(data);
         })
         .catch(error => console.error('Error fetching data:', error));
         categorySelected = true;
 }

 function createCardPairsHP(data) {
     const cards = document.querySelectorAll('.memory-card');

     
    const selectedData = data.slice(0, 6); 
    const pairedData = selectedData.concat(selectedData); 
     const shuffledData = shuffleData(pairedData);

     cards.forEach((card, index) => {
         const frontFace = card.querySelector('.front-face'); 

         
         if (shuffledData[index] && shuffledData[index].image && frontFace) {
             frontFace.src = shuffledData[index].image;  
             frontFace.alt = shuffledData[index].name;   
             card.dataset.card = shuffledData[index].name;  
         }
     });
 }


 function chooseCats() {
    lockChoiceButtons();
     fetch('https://api.thecatapi.com/v1/images/search?limit=12')
         .then(response => response.json())  
         .then(data => {
             createCardPairsCat(data);
         })
         .catch(error => console.error('Error fetching data:', error));
         categorySelected = true;
 }

  function createCardPairsCat(data) {
      const cards = document.querySelectorAll('.memory-card');
      
     const selectedData = data.slice(0, 6);  
     const pairedData = selectedData.concat(selectedData); 
      const shuffledData = shuffleData(pairedData);
      cards.forEach((card, index) => {
          const frontFace = card.querySelector('.front-face'); 

          if (shuffledData[index] && shuffledData[index].url && frontFace) {
              frontFace.src = shuffledData[index].url;
              frontFace.alt = shuffledData[index].name;   
              card.dataset.card = shuffledData[index].id;  
                      }
      });
  }




 function chooseFlags() {
    lockChoiceButtons();
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())  
        .then(data => {
            const selectedFlags = data.slice(0, 6).map(country => country.flags.png);  
            const pairedFlags = [...selectedFlags, ...selectedFlags];
            const shuffledFlags = shuffleData(pairedFlags);
            updateCardPng(shuffledFlags);
        })
        .catch(error => console.error('Error fetching data:', error));
        categorySelected = true;
}


function shuffleData(data) {
    const shuffled = []; // מערך חדש לאחסון הערבוב
    const tempData = [...data]; // שוכפל את המערך המקורי כדי לא לשנות אותו ישירות

    while (tempData.length > 0) {
        const randomIndex = Math.floor(Math.random() * tempData.length); // בחירת אינדקס אקראי מתוך המערך
        const item = tempData.splice(randomIndex, 1)[0]; // הוצאת האיבר הממוקם באינדקס האקראי
        shuffled.push(item); // הכנס את האיבר למערך החדש
    }
    return shuffled; // מחזירים את המערך המעורבב
}

function updateCardPng(data) {
    // קבלת כל כרטיסי המשחק
    const cards = document.querySelectorAll('.memory-card');

    // ללכת על כל כרטיס ולשנות את התמונה בצד הקדמי (front-face)
    cards.forEach((card, index) => {
        const frontFace = card.querySelector('.front-face'); // חיפוש ה-div של התמונה בצד הקדמי של הכרטיס

        // אם יש תמונה מה-API, נעדכן אותה בכרטיס
        if (data[index] && frontFace) {
            frontFace.src = data[index]; // עדכון ה-src לתמונה מה-API
            frontFace.alt = `Flag ${index + 1}`;  // עדכון ה-alt לתמונה (אופציונלי)
            card.dataset.card = data[index];  // עדכון מזהה הכרטיס (שיהיה אפשר לזהות את הזוגות)
        }
    });
}

