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
    }
  }
})();

// UI Controller
const UICtrl = ( () => {
  // Selectors for the markup if change to selector name, all can be changed here in a single location 
  const UISelectors = {
   overlay: '#overlay',
   startBtn: '.btn__reset',
   banner: '#banner',
   phrase: '#phrase ul',
   qwerty: '#qwerty'
 }
 return {
  hideOverlay:  () => document.querySelector(UISelectors.overlay).style.display = 'none',
  
  appendUsernameInput: () => {
    const input = document.createElement('input'); // todo: finish writing this out
  },

  displayCategory: () => {
    const p = document.createElement('p');
    p.textContent = `Today's Category: ${localStorage.getItem('category')}`;
    document.querySelector(UISelectors.banner).appendChild(p);
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
  
  // Load event listeners
  const loadEventListeners = () => {
    
    // Get UI selectors 
    const UISelectors = UICtrl.getSelectors();

    // Listen for Start game click 
    document.querySelector(UISelectors.startBtn).addEventListener('click', startGame);
  }
  
  const startGame = () => {
    console.log('Game started!');
    UICtrl.hideOverlay();
    UICtrl.greetPlayer();
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
      
      console.log('Init random name: ' + localStorage.getItem('username')); // todo: remove
    }
  } 
})(PlayerCtrl, GameCtrl, UICtrl);

// Ititialize App
App.init();