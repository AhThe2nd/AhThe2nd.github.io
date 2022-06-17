// Log the version to the console
console.log("Version 1.0");

// Import the functions we need
import {fetchWord, deleteElement} from "./functions.js";

// For troubleshooting -> Uncomment to ensure javascript is functioning
// alert('Javascript is working!')

// Global variables for use throughout the script
var gameActive = false;                                     // Used to control the state of the game and whether a user can type or not
var userWordSection = document.querySelector("#user_word"); // Selection of the area where a user types their word
var gameSpeed = 1200;                                       // Sets the speed of the words in milliseconds (higher is slower)       
var userWord = "";                                          // This variable holds the word that the user is typing
var strikes = 0;                                            // This variable holds the number of strikes
var score = 0;                                              // This variable holds the score
var activeLane;                                             // This variable determines which lane to place the next word
var activeWords = [];                                       // This array holds all the words currently on screen
var letterCodes = [ "a", "b", "c", "d", "e", 
                    "f", "g", "h", "i", "j", 
                    "k", "l", "m", "n", "o",               // These codes are used to determine which button was pressed by the user
                    "p", "q", "r", "s", "t", 
                    "u", "v", "w", "x", "y",
                    "z" ];                         

// Select some preliminary elements for use throughout the script

// Select the lanes
const lane1 = document.querySelector("#lane1");
const lane2 = document.querySelector("#lane2");
const lane3 = document.querySelector("#lane3");
const lane4 = document.querySelector("#lane4");
const lane5 = document.querySelector("#lane5");

// Select the two buttons in the pop-up windows
const retry = document.querySelector("#retry");
const gotItButton = document.querySelector("#got_it");

// End of preliminary declarations and selections


// Main Game Loop Code //////////////////////////////////////

// This function contains most of the game logic. It calls other functions and could not be imported.
// If I were to rebuild or work on this further, I would split this function into a few smaller functions.
function mainGameLoop(){
    fetchWord(activeWords);

    // Define variables to count child elements in each lane
    var lane1Count = lane1.childElementCount;
    var lane2Count = lane2.childElementCount;
    var lane3Count = lane3.childElementCount;
    var lane4Count = lane4.childElementCount;
    var lane5Count = lane5.childElementCount;

    // Lose conditions that trigger the timer to stop and retry window to display
    if (lane1Count > 15 || 
        lane2Count > 15 || 
        lane3Count > 15 || 
        lane4Count > 15 || 
        lane5Count > 15 || 
        strikes >= 10){
            userWord = "";
            retry.classList.remove("hide");
            document.querySelector("#final_score").innerHTML = "Final Score: " + score;
            clearInterval(timer);
            return;
        }

    // Generate a random lane
    let min = 1;
    let max = 6;
    
    // This if block prevents "undefined" from being written as a target word. The API usually returns undefined on the first call
    if (activeWords.length > 0){
        // Get the latest word and add it to a random lane
        var latestWord = activeWords[activeWords.length - 1];
        activeLane = Math.floor(Math.random() * (max - min) + min);

        // Generate a new "p" element to be placed in the lane
        var newSection = document.createElement("p");

        // Add CSS to ensure columns contain 15 words evenly
        newSection.classList.add('target_word');

        // Store the text as a Textnode
        let textNode = document.createTextNode(latestWord);

        // Add the text node to the new p section
        newSection.appendChild(textNode);
    }    

    // This block will place the newly selected word in the randomly selected lane
    switch(activeLane) {
        case 1:
            lane1.insertBefore(newSection, lane1.firstChild);
            break;
        case 2:
            lane2.insertBefore(newSection, lane2.firstChild);
            break;
        case 3:
            lane3.insertBefore(newSection, lane3.firstChild);
            break;
        case 4:
            lane4.insertBefore(newSection, lane4.firstChild);
            break;
        case 5:
            lane5.insertBefore(newSection, lane5.firstChild);
            break;
      }
}

// User Input Code //////////////////////////////////////

// All logic for what to do when certain keys are pressed
window.addEventListener('keydown', function (e){
    
    // Check if the key was a letter key and ensure neither the instructions or retry window are active
    if (letterCodes.includes(e.key) && 
    retry.classList.contains("hide")&&
    instructions.classList.contains("hide")){
        userWord += e.key; // Adds a letter to the word the user is typing
    }

    // Match user-entered word to all active words
    else if (e.key == "Enter" && gameActive == true)
    {
        // Select all p elements from the HTML
        let allWords = document.querySelectorAll("p");
        
        // Check if any of the inner HTML matches the user word
        // for all p elements and remove it if it does match
        let goodWord = false;
        for (let i = 0; i < allWords.length; i++){
            if (allWords[i].innerHTML == userWord)
            {
                goodWord = true;
                // Increase score by the length of the word
                score += allWords[i].innerHTML.length;
                
                // Display the updated score
                this.document.querySelector("#score").innerHTML = "Score" + "<br>" + score;
                
                // Remove the word from the screen and set the user word to empty string
                allWords[i].remove();
                userWord = "";
            }
        }
    
        // This block handles strikes. If an incorrect word is entered it will clear the user's word and increase the strikes
        if (!goodWord){
                userWord = "";
                
                if (strikes < 10){
                    strikes++;
                }
                this.document.querySelector("#strikes").innerHTML = "Strikes" + "<br>" + strikes;
            }
    }
    
    // This block allows the user to start the game by typing "start" and hitting enter. Only needed on first plays, and not replays.
    else if (e.key == "Enter" && gameActive == false){
        if (userWord == "start"){
            gameActive = true;
            userWord = "";
            const timer = setInterval(mainGameLoop, gameSpeed);
            this.document.querySelector("#score").innerHTML = "Score" + "<br>" + score;
        }
    }

    // Erase last letter of string if backspace pressed
    else if (e.key == "Backspace"){
        // Chop the last letter off the string
        userWord = userWord.slice(0, userWord.length - 1);
    }
    
    // Finally, write the word to the user section
    userWordSection.innerHTML = userWord;
}, false);

// Click on retry button event handler
const retryButton = document.querySelector("#retry_button");
retryButton.addEventListener("click", () => {
     // Reset some variables
     score = 0;
     strikes = 0;

     // Rewrite HTML elements
     document.querySelector("#score").innerHTML = "Score" + "<br>" + score;
     document.querySelector("#strikes").innerHTML = "Strikes" + "<br>" + strikes;

     // Delete all children of the lanes
    const wordsToDelete = document.querySelectorAll("p");
    
    // This deletes all p tags
    wordsToDelete.forEach(deleteElement);

    // Remove pop-up retry window
    retry.classList.add("hide");
});

// Click event handler for the "Got it!" button when reading the instructions on first load
gotItButton.addEventListener('click', () =>{
    const instructions = document.querySelector("#instructions");
    instructions.classList.add("hide");
})
