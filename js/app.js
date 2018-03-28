// Game Controller
let tries = 0;
let missed = 0;
let maxMissed = 5;

const GameCtrl = ( () => {
  
  return {

    
    // this is my equivelent to the "phrases array" reequested for the project
    // I am using an object in order to set category and phrase
    gameData: () => {
      let data = [
        {
          "category": "Before and after",
          "phrases":[
            "Back To The Future Plans",
            "Charlie Brown Paper Bag",
            "Cover Charge By The Hour",
            "Pearl Jam Session",
            "tis The Season Tickets",
            "A Blast From The Past Present And Future",
            "Private Eye Of The Storm",
            "A Dream Come True Detective",
            "Ancient Stone Temple Pilots",
            "Bowling Alley Cat",
            "Cherry Pie In The Sky",
            "Elephant Seal Of Approval",
            "Hole In One Of A Kind",
            "Junk Food For Thought",
            "Lemon Pie Chart"
          ]
        },
        {
          "category": "Rhyme Time",
          "phrases":[
            "Yertle The Turtle",
            "Gruesome Twosome",
            "Ants In Your Pants",
            "Shop Till You Drop",
            "A Friend To The End",
            "A Locket In Your Pocket",
            "After Dark",
            "Beat Feet",
            "Burritos With Fritos",
            "Fender Bender",
            "How Now Brown Cow",
            "In Like Flynn",
            "In It To Win It",
            "Jeepers Creepers"
          ]
        },
        {
          "category": "TV Show Title",
          "phrases": [
            "Family Guy",
            "American Idol",
            "American Ninja Warrior",
            "American Gladiators",
            "Game Of Thrones",
            "Csi Miami",
            "Cheers",
            "South Park",
            "The Simpsons",
            "Fraggle Rock",
            "Fuller House",
            "Mythbusters",
            "Knight Rider",
            "Smallville",
            "Gold Rush",
            "The IT Crowd"
          ]
        },
        {
          "category": "The 90’s",
          "phrases":[
            "Ace Ventura",
            "American Pie",
            "Austin Powers",
            "Beanie Babies",
            "Beepers",
            "In Living Color",
            "Boom Boxes",
            "Die Hard",
            "Mad Tv",
            "Kurt Cobain",
            "Danielle Steel",
            "Pauly Shore",
            "Green Day",
            "Ouija Board"
          ]
        }
      ]
      data = data[Math.floor(Math.random() * data.length)];
      localStorage.setItem('category', data.category.toUpperCase()); // Random Category
      localStorage.setItem('phrase',  data.phrases[Math.floor(Math.random() * data.phrases.length)].toUpperCase()); // Random Phrase
    },

    // Thsi gets called to set the Random phrase to the game board
    getRandomPhraseAsArray: phrase => {
      let phraseToCharactersArray = [];
      let data = localStorage.getItem('phrase');
      const newString = data.split("");
      phraseToCharactersArray.push(newString);
      return phraseToCharactersArray;
    },

      //Remove space to compare to key event and win/lose conditions 
    phraseWithoutSpaces: () => {
      let phraseWithoutSpaces = []
      phraseWithoutSpaces = localStorage.getItem('phrase');
      phraseWithoutSpaces = phraseWithoutSpaces.split(' ').join('');
      return phraseWithoutSpaces;
    },

    // Splits the phrase array in to an Array of letters
    phraseSplit: () => {
      let phraseSplit = [];
      phraseSplit = localStorage.getItem('phrase');
      phraseSplit = phraseSplit.split('');
      return phraseSplit;
    },

    checkLetter: (event) => {
      const li = document.querySelectorAll('.letter');
      let match = null;
      for(let i = 0; i < li.length; i++){
        if(event === li[i].textContent.toLowerCase()){
          match = event;
          li[i].classList.add('show');
        }
      }
      return match;
    },

    checkWin: () => {
      if(missed === 5){
        console.log('Game over! you lost');
      }
      else if(document.querySelectorAll('.show').length === GameCtrl.phraseWithoutSpaces().length){
        console.log("You won!");
      }
    }
  }
})();



// Player Controller
const PlayerCtrl = ( () => {
  return { 
    // Database
    playerData: () => {
      const data = [
        "Sheldon Cooper",
        "Spock",
        "Leonard Hofstadter",
        "Amy Farrah Fowler",
        "Lisa Simpson",
        "Carlton Banks",
        "Bart Simpson",
        "Steve Urkel",
        "Dwight Schrute",
        "Stewie Griffin",
        "Milhouse Van Houten",
        "Captain Jean Luc Picard of the USS Enterprise"
      ]
      // Pick a random username
      player = data[Math.floor(Math.random() * data.length)];
      // check localStorage if empty (new player) then set
      if(localStorage.getItem('username') === null) {
        localStorage.setItem('username', player);
      }
      return player;
    },

    // initial check to see if username input and local storage are null
    initCheckPlayer: () => {
      const UISelectors = UICtrl.getSelectors();
      let player;
      if(localStorage.getItem('username') !== null) {
        player = localStorage.getItem('username');
        document.querySelector(UISelectors.overlayInput).value = player;
        console.log('Welcome back: ' + player);
      } else {
        PlayerCtrl.createNewPlayer();
        console.log('creating new player');
      }
    },

    // Create new Player
  createNewPlayer: () => {
    const input = UICtrl.getUsernameInput();
   if(input.name === '') {
    PlayerCtrl.playerData();
     console.log('set new random name to local storage'); 
   }
  },
  
  checkForUsername: () => {
    // Check for username
    const input = UICtrl.getUsernameInput(); 
    let player;
    if( input.name === '') {
      // PlayerCtrl.getRandomUsernameJSON();
      player = localStorage.getItem('username');
      UICtrl.greetPlayer(player);
    } else {
      player = input.name;
      localStorage.setItem('username', player);
      UICtrl.greetPlayer(player);
    }
    return player;
  }

  }
})();


// UI Controller
const UICtrl = ( () => {
  // Selectors for the markup if change to selector name, all can be changed here in a single location 
  const UISelectors = {
    overlay: '#overlay',
    overlayTitle: '.title',
    overlayInput: '#usernameInput',
    startBtn: '.btn__reset',
    banner: '#banner',
    phrase: '#phrase ul',
    letter: '.letter',
    show: '.show',
    qwerty: '#qwerty button',
  }
  return {

  hideOverlay:  () => document.querySelector(UISelectors.overlay).style.display = 'none',
  
  appendUsernameInputToOverlay: () => {
    const input = document.createElement('input');
    // input.style.placeholder = 'Please enter a username';
    input.id ='usernameInput';
    input.className = 'usernameInput';
    document.querySelector(UISelectors.overlayTitle).insertAdjacentElement('afterend',input)
  },

  // Get username from input
  getUsernameInput: () => {
    return {
      name: document.querySelector(UISelectors.overlayInput).value
    }
  },

  displayCategory: () => {
    const p = document.createElement('p');
    p.className = 'title';
    p.textContent = `Today's Category: "${localStorage.getItem('category')}"`;
    document.querySelector(UISelectors.banner).appendChild(p);
  },

  // Add secret phrase to the game board 
  addPhraseToDisplay: () => { // todo: set show class to any li that equals a space
    const phrase = GameCtrl.getRandomPhraseAsArray();
    let arrayLength = phrase[0].length;
    console.log(phrase);
    for(let i = 0; i < arrayLength; i++){
      let li = document.createElement('li');
      // adds class name depending if letter or space
      li.textContent = `${phrase[0][i]}`;
      if(li.textContent === " "){
        li.className = 'letter space';
        li.textContent = '';
      } else {
        li.className = 'letter';
      }
      document.querySelector(UISelectors.phrase).appendChild(li);
    }
  },

  checkLetter: (event) => {
    let li = document.querySelectorAll(UISelectors.letter);
    let match = null;
      // Loop through each letter, if found change to show letter
      for(i = 0; i < li.length; i++){
        if(event === li[i].textContent.toLowerCase()) {
          li[i].classList.add(show);
      }
    }
  },

  greetPlayer: () => {
    const h3 = document.createElement('h3');
    h3.textContent = `Welcome: ${localStorage.getItem('username')}`;
    document.querySelector(UISelectors.banner).appendChild(h3);
  },

  // used for mapping the selectors
  getSelectors: () => UISelectors
 }
})();




// App Controller
const App = ( (PlayerCtrl, GameCtrl, UICtrl) => {
  UICtrl.appendUsernameInputToOverlay();
  // Load event listeners
  const loadEventListeners = () => {
    
    // Get UI selectors 
    const UISelectors = UICtrl.getSelectors();

    // check if player has played before and retrieve username
    PlayerCtrl.initCheckPlayer();

    // Listen for Start game click 
    document.querySelector(UISelectors.startBtn).addEventListener('click', startGame);
  }
  
const startGame = () => {
  console.log('Game started!');

  // Check player username
  PlayerCtrl.checkForUsername();
  
  // Hide overlay
  UICtrl.hideOverlay();

  // Add category to display
  UICtrl.displayCategory();

  // Add phrase to display
  UICtrl.addPhraseToDisplay();
  
  // listen for key input
  qwerty.addEventListener('click', (event) => {
    if(event.target.nodeName === 'BUTTON'){
      tries++;
      event.target.disabled = true;
      event.target.className = 'chosen';
      const letterFound = GameCtrl.checkLetter(event.target.textContent);
      if(letterFound === null){
        missed++;
        if(missed >= 1 && missed <= maxMissed){
          let lives = document.querySelector('.tries').firstChild;
          lives.src = '../images/lostHeart.png';
          lives.parentElement.className = 'tried';
        }
      }
    }
    console.log('tries: ' + tries);
    console.log('Missed: ' + missed);
    GameCtrl.checkWin();
  });

  GameCtrl.phraseWithoutSpaces();

}


return {
  init: () => {
    // Load event listeners
    loadEventListeners();

    // Pick a random name and set to local storage in case input is empty
    PlayerCtrl.playerData();

    // Pick random category and phrase and set it to localStorage
    GameCtrl.gameData();
  }
} 
})(PlayerCtrl, GameCtrl, UICtrl);



// Ititialize App
App.init();