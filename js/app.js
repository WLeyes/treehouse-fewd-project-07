// Game Controller
  // todo: refactor and relocate inside game controller 
let tries = 0;
let missed = 0;

// you can increase or decrease lives here
  // lives will be updated on the display as well
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
      tries++;
      // Get UI selectors
      const UISelectors = UICtrl.getSelectors();

      const li = document.querySelectorAll(UISelectors.letter);
      const button = document.querySelectorAll(`${UISelectors.qwerty} button`);
      let match = null;

      // mark each letter that was pressed
      for(i=0; i < button.length; i++){
        if(button[i].textContent === event){
          button[i].classList.add('chosen');
          button[i].disabled = true;
        }
      }

      // if letter is a match display it
      for(let i = 0; i < li.length; i++){
        if(event === li[i].textContent.toLowerCase()){
          match = event;
          li[i].classList.add('show');
        }
      }

      // If letter is not found;
      if(match === null){
        missed++;
        if(missed >= 1 && missed <= maxMissed){
          let lives = document.querySelector('.tries').firstChild;
          lives.src = '../images/lostHeart.png';
          lives.parentElement.classList.add('tried');
          lives.parentElement.classList.remove('tries');
          for(i=0; i < button.length; i++){
            if(button[i].textContent === event){
              button[i].classList.add('missed');
            }
          }
      }
    }

    },

    checkWin: () => {
      if(missed === maxMissed){
        console.log('Game over! you lost');
        UICtrl.lose();
      }
      else if(document.querySelectorAll('.show').length === GameCtrl.phraseWithoutSpaces().length){
        console.log("You won!");
        UICtrl.win();
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
      console.log('set new random name to localStorage'); 
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
    scoreboard: '#scoreboard ol',
    letter: '.letter',
    show: '.show',
    qwerty: '#qwerty',
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

  greetPlayer: () => {
    const h3 = document.createElement('h3');
    h3.textContent = `Welcome: ${localStorage.getItem('username')}`;
    document.querySelector(UISelectors.banner).appendChild(h3);
  },

  lives: () => {
    for(i = 0; i < maxMissed; i++){ // todo: reset lives
      const li = document.createElement('li');
      li.className = 'tries';
      const img = document.createElement('img');
      img.setAttribute('src', 'images/liveHeart.png') ;
      li.appendChild(img);
      document.querySelector(UISelectors.scoreboard).appendChild(li);
    }
  },

  reset: () => { // todo: refactor win/lose and place common settings between them into reset

  },

  win: () => {
    let div = document.createElement('div');
    div.id = 'overlay';
    div.className = 'win';
    let h2 = document.createElement('h2');
    h2.className = 'title';
    h2.textContent = 'Wheel of Success';
    let p = document.createElement('p');
    p.textContent = `Congratulations ${localStorage.getItem('username')}, you won!`;
    let a = document.createElement('a');
    a.className = 'btn__reset';
    a.textContent = 'Start a new game?';
    document.body.appendChild(div);
    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(a);
    // Listen for Start game click 
    a.addEventListener('click', (event) => {
      missed = 0;
      console.log('reset missed to: ' + missed);
      App.init();
      
      // Remove last category from display
      document.querySelector(`${UISelectors.banner} p`).remove();

      // Remove last phrase
      let phrase = document.querySelectorAll(`${UISelectors.phrase} li`);
      console.log(phrase.length);
      let li = document.querySelectorAll(`${UISelectors.phrase} li`);
      for(let i = 0; i < phrase.length; i++) {
        document.querySelector(UISelectors.phrase).removeChild(li[i]);
      }
      
      // Add category to display
      UICtrl.displayCategory();

      // Add phrase to display
      UICtrl.addPhraseToDisplay();
      
      // Clear the keys
      let qwerty = document.querySelectorAll('#qwerty button');
      console.log(qwerty.length);
      for(let i = 0; i < qwerty.length; i++){  
        qwerty[i].removeAttribute('class');
        qwerty[i].disabled = false;
      }

      let ol = document.querySelector(UISelectors.scoreboard);
      let lives = document.querySelectorAll(`${UISelectors.scoreboard} li`);
      console.log('lives: '+lives.length);
      // remove empty hearts
      for(i=0; i < lives.length; i++){
        ol.removeChild(lives[i]);
      }

      // Set new hearts
      UICtrl.lives();
      
      // Hide win overlay
      div.style.display = 'none';

      // Start the game
      App.startGame;
    });
  },

  lose: () => {
    let div = document.createElement('div');
    div.id = 'overlay';
    div.className = 'lose';
    let h2 = document.createElement('h2');
    h2.className = 'title';
    h2.textContent = 'Wheel of Success';
    let p = document.createElement('p');
    p.textContent = `Sorry ${localStorage.getItem('username')}, you lost!`;
    let p2 = document.createElement('p');
    p2.textContent = `The correct answer was: ${localStorage.getItem('phrase')}`;
    let a = document.createElement('a');
    a.className = 'btn__reset';
    a.textContent = 'Start a new game?';
    document.body.appendChild(div);
    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(p2);
    div.appendChild(a);
    // Listen for Start game click 
    a.addEventListener('click', (event) => {
      missed = 0;
      console.log('reset missed to: ' + missed);
      App.init();
      
      // Remove last category from display
      document.querySelector(`${UISelectors.banner} p`).remove();

      // Remove last phrase
      let phrase = document.querySelectorAll(`${UISelectors.phrase} li`);
      console.log(phrase.length);
      let li = document.querySelectorAll(`${UISelectors.phrase} li`);
      for(let i = 0; i < phrase.length; i++) {
        document.querySelector(UISelectors.phrase).removeChild(li[i]);
      }
      
      // Add category to display
      UICtrl.displayCategory();

      // Add phrase to display
      UICtrl.addPhraseToDisplay();
      
      // Clear the keys
      let qwerty = document.querySelectorAll('#qwerty button');
      console.log(qwerty.length);
      for(let i = 0; i < qwerty.length; i++){  
        qwerty[i].removeAttribute('class');
        qwerty[i].disabled = false;
      }

      let ol = document.querySelector(UISelectors.scoreboard);
      let lives = document.querySelectorAll(`${UISelectors.scoreboard} li`);
      console.log('lives: '+lives.length);
      
      // remove empty hearts
      for(i=0; i < lives.length; i++){
        ol.removeChild(lives[i]);
      }

      // Set new hearts
      UICtrl.lives();

      // Hide lose overlay
      div.style.display = 'none';

      // Start the game
      App.startGame;
    });
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
  
  UICtrl.lives();
  // Hide overlay
  UICtrl.hideOverlay();

  // Credit to Randy Layne for the following listener 
    // supress users ability to click around in the phrase area and have the browsers text selector reveal the phrase
    document.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    
  // Add category to display
  UICtrl.displayCategory();

  // Add phrase to display
  UICtrl.addPhraseToDisplay();
  
  // listen for key input
  qwerty.addEventListener('click', onScreenKeyboard);

  // listen for key input
  window.addEventListener('keyup', keyup);

  GameCtrl.phraseWithoutSpaces();

}


// Listen for keyup events
const keyup = (event) => { 
  event.preventDefault();
  // testing for valid key press
  const key = event.key
  const validKeys = document.querySelectorAll('button');
  
  // Make sure that only valid keypress is validated
  for(let count in validKeys) {
    if (count !== undefined) {
      const letter = validKeys[count];
      if (letter.textContent === key && letter.className !== "chosen missed") {
        GameCtrl.checkLetter(letter.textContent);	
      }
    }
    // console.log(validKeys[count]);
  }
  GameCtrl.checkWin();
}

// Listen for onscreen Keyboard
const onScreenKeyboard = (event) => {
  if(event.target.nodeName === 'BUTTON'){
    GameCtrl.checkLetter(event.target.textContent);
    GameCtrl.checkWin();
  }
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