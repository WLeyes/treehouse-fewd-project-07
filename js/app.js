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
    // Create new Player
  createNewPlayer: () => {
    const input = UICtrl.getUsernameInput();
   if(input.name === '') {
    PlayerCtrl.playerData();
     console.log('set new random name to local storage'); 
   }
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
   qwerty: '#qwerty'
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
    p.textContent = `Today's Category: "${localStorage.getItem('category')}"`;
    document.querySelector(UISelectors.banner).appendChild(p);
  },

    // Add secret phrase to the game board 
    addPhraseToDisplay: () => { // todo: set show class to any li that equals a space
      const phrase = GameCtrl.getRandomPhraseAsArray();
      let arrayLength = phrase[0].length;
      console.log(phrase);
      let test = []
      test = localStorage.getItem('phrase');
  
      // Test: remove space to compare to key event and win/lose conditions 
      test = test.split(' ').join('');
      console.log('Test: ' + test);
      
      for(let i = 0; i < arrayLength; i++){
        let li = document.createElement('li');
        li.textContent = `${phrase[0][i]}`;
        if(li.textContent === " "){
          li.className = 'space';
          li.textContent = '-';
        } else {
          li.className = 'letter';
          li.style.color = 'green';
        }
        document.querySelector(UISelectors.phrase).appendChild(li);
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

    let player;
    // check if player has played before and retrieve username
    if(localStorage.getItem('username') !== null) {
      player = localStorage.getItem('username');
      document.querySelector(UISelectors.overlayInput).value = player;
      console.log('Welcome back: ' + player);
    } else {
      PlayerCtrl.createNewPlayer();
      console.log('creating new player');
    }

    // Listen for Start game click 
    document.querySelector(UISelectors.startBtn).addEventListener('click', startGame);
  }
  
  const startGame = () => {
    console.log('Game started!');
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
    UICtrl.hideOverlay();
    // Add phrase to display
    UICtrl.addPhraseToDisplay();
    const UISelectors = UICtrl.getSelectors();

    
    // if(document.querySelector(UISelectors.overlayInput.value) !== '') {
    //   UICtrl.greetPlayer();
    // } else {
    //   player = document.querySelector(UISelectors.overlayInput.value);
    //   localStorage.setItem('username', player);
    //   UICtrl.greetPlayer();
    // }

    
    UICtrl.displayCategory();
  }


  return {
    init: () => {
      // Load event listeners
      loadEventListeners();

      // Pick a random name and set to local storage in case input is empty
      PlayerCtrl.playerData();

      // Pick random category and phrase and set it to localStorage
      GameCtrl.gameData();
      
      // console.log('Init random name: ' + localStorage.getItem('username')); // todo: remove
    }
  } 
})(PlayerCtrl, GameCtrl, UICtrl);

// Ititialize App
App.init();