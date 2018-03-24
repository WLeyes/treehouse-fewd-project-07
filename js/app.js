// Game Controller
const GameCtrl = ( () => {
  return {

    gameData: () => {
      let data = [
        {
          "category": "Before and after",
          "phrases":[
            "tis The Season Tickets",
            "A Blast From The Past Present And Future",
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
            "American Ninja Warrior",
            "American Gladiators",
            "Csi Miami",
            "Cheers",
            "Fraggle Rock",
            "Fuller House",
            "Mythbusters",
            "Knight Rider",
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
            "Boom Boxes",
            "Die Hard",
            "Danielle Steel",
            "Green Day",
            "Ouija Board"
          ]
        }
      ]
      data = data[Math.floor(Math.random() * data.length)];
      localStorage.setItem('category', data.category.toUpperCase());
      localStorage.setItem('phrase',  data.phrases[Math.floor(Math.random() * data.phrases.length)].toUpperCase());
      // return category;
    },
    
    qwerty: () => {
      const qwerty = document.querySelector(UISelectors.qwerty);
    },

    getRandomPhraseAsArray: phrase => {
      let phraseToCharactersArray = [];
      let data = localStorage.getItem('phrase');
      const newString = data.split("");
      phraseToCharactersArray.push(newString);
      return phraseToCharactersArray;
    },

    checkLetter: array => {
      let letterFound;
    },

    checkWin: () => {

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
   keys: 'keyrow',
   qwerty: '#qwerty button'
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
        li.textContent = `${phrase[0][i]}`;
        if(li.textContent === " "){
          li.className = 'letter space';
          li.textContent = '-';
        } else {
          li.className = 'letter';
          li.style.color = 'green';
        }
        document.querySelector(UISelectors.phrase).appendChild(li);
      }
    },

    phraseWithoutSpaces: () => {
      let phraseWithoutSpaces = []
      phraseWithoutSpaces = localStorage.getItem('phrase');
      // Test: remove space to compare to key event and win/lose conditions 
      phraseWithoutSpaces = phraseWithoutSpaces.split(' ').join('');
      console.log('phraseWithoutSpaces: ' + phraseWithoutSpaces);
    },

    validKeys: (e) => {
      // testing valid keys
      let qwerty = [];
      let validKeys = document.querySelectorAll(UISelectors.qwerty);
      for(i = 0; i < validKeys.length; i++){
        qwerty.push(validKeys[i].textContent.toUpperCase());
      }
      console.log(qwerty);
      let index = e;
      console.log(qwerty.indexOf(index));
      if(qwerty.indexOf(index) != -1){
        console.log(index + ' is in indexOf index');
        // loop through phraseWithoutSpaces and for each letter that matches the key pressed change class to .show
          // if it doesn't match missed = +1 || lives = -1 ?
      } else{
        console.log('invalid key was pressed!');
        // flash message that an invalid key was pressed
      }
    },

  greetPlayer: () => {
    const h3 = document.createElement('h3');
    h3.textContent = `Welcome: ${localStorage.getItem('username')}`;
    document.querySelector(UISelectors.banner).appendChild(h3);
  },

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
    document.addEventListener('keyup', keyup);

    UICtrl.phraseWithoutSpaces();

    const UISelectors = UICtrl.getSelectors();
  }

// Listen for keyup events
const keyup = (e) => {
  console.log(e.key.toUpperCase());
  
  // Check that valid key was pressed
  UICtrl.validKeys(e.key.toUpperCase());


  e.preventDefault();
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