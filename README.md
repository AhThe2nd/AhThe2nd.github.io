# AhThe2nd.github.io

TYPING GAME

Advanced Javascript Project
Andrew Howell - 20012884

Game Overview
-------------
 
 Starting a game
  - Upon loading, the user is presented with the rules of the game in a div overlayed on top of the rest of the game.
  - When the user is comfortable with the rules they can click "Got it!" to close the instructions.
  - These instructions will only display whe the page is initially load, they will not display upon replaying.
  - To start the first round players will type "start" and hit enter. I chose to do this as a sort of tutorial so the player knows that they can now type in the box.
 
 Playing the game
  - After "start" is typed words will begin appearing in the 5 lanes on screen.
  - The user will type the words and press enter to submit their word.
  - If their word matches any word in any lane, that word is removed from play and points are awarded per letter.
  - If the user's word does NOT match any word in any lane, their strike count increases and they can try again
 
 Ending the game
   - The game will end when either: 10 strikes are given, or any lane overflows it's border
   - At this point a window will display showing the user's score and indicating that the game is over
   - The user can click a "retry" button to play again
   - They will not be presented with the instructions again, nor will they have to type "start" because they now know how to play
 
 Inner Workings
 --------------
 
 Fetching Words
  - Words are fetched from the Random Word API: https://random-word-api.herokuapp.com/home
  - Parameters are used in the fetch request to ensure the words are between 3 and 7 characters inclusive
  - The database of words is quite large and you will see many words that you have never heard before!
  - After words are fetched, they are assigned a lane at random and a new <p> element containing the word is added to that lane
  - These <p> elements are destroyed when the user correctly enters a word, score and strikes are augmented as necessary
  
  User Input
  - The script constantly waits for keydown events and does several things based on certain conditions
  - If a normal key is pressed and neither the instructions window, nor the retry window are being display: a new character is added to the user's word
  - The user can backspace at any time to correct a typo
  - There are several conditions coded to ensure the user cannot enter letters or submit words when the instructions or retry windows are present
   
    ***KNOWN BUG: If the user is VERY RAPIDLY entering and submitting words (mashing the keyboard and spamming enter) it is possible for some of the
    characters to remain in the user's textbox while the retry window is present. Though I didn't have time to fix this, the user can easily backspace
    when the next round starts to get rid of these letters as they normally would.
    
Final Thoughts
--------------

I had a lot of fun making this program. Though I didn't implement every feature I wanted from the beginning (mainly CSS animations), I am happy with the end result.
Were I to continue working on this project I would flesh out the style a little more, and possibly add some sounds effects and animations for certain events like
getting a word right or getting a word wrong.

I had also intended on adding a combo feature where the user would build a combo on every correct entry which would lead to score multipliers, and then reset
when the user entered a word incorrectly. Time contraints and other school and personal commitments made me ultimately scrap this feature.

Javascript is fun, thanks for everything this semester John!
