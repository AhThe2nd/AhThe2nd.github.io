console.log('Flag #1');
var gameActive = false;

// Place all selections here
const retry = document.querySelector("#retry");
var userWordSection = document.querySelector("#user_word");
//const capsWarning = document.querySelector("#caps_lock_warning");

// Codes used to check if a key press is a valid letter
var letterCodes = [ "a", "b", "c", "d", "e", 
                "f", "g", "h", "i", "j", 
                "k", "l", "m", "n", "o", 
                "p", "q", "r", "s", "t", 
                "u", "v", "w", "x", "y",
                "z" ];

// Game speed variable (higher is slower)
var gameSpeed = 1200;                

// Declare a variable for the user word
var userWord = "";

// Declare a variable for the number of strikes
var strikes = 0;

// Declare a variable for score
var score = 0;

// Select the lanes
const lane1 = document.querySelector("#lane1");
const lane2 = document.querySelector("#lane2");
const lane3 = document.querySelector("#lane3");
const lane4 = document.querySelector("#lane4");
const lane5 = document.querySelector("#lane5");

console.log('Flag #2');

// Import the functions we need
import {fetchWord, deleteElement} from "./functions.js";

// Declare variables for the active lane and an array of words
var activeLane;
var activeWords = [];

// Function with most of the game logic
function addWordsOnInterval(){
    fetchWord(activeWords);
    // console.log(activeWords);

    // Define variables to count child elements in each lane
    var lane1Count = lane1.childElementCount;
    var lane2Count = lane2.childElementCount;
    var lane3Count = lane3.childElementCount;
    var lane4Count = lane4.childElementCount;
    var lane5Count = lane5.childElementCount;

    // Lose conditions that trigger the timer to stop
    if (lane1Count > 15 || 
        lane2Count > 15 || 
        lane3Count > 15 || 
        lane4Count > 15 || 
        lane5Count > 15 || 
        strikes >= 10)
        {
            
            userWord = "";
            retry.classList.remove("hide");
            document.querySelector("#final_score").innerHTML = "Final Score: " + score;
            clearInterval(timer);
            return;
        }
    
    console.log("Lane 1: " + lane1Count);
    console.log("Lane 2: " + lane2Count);
    console.log("Lane 3: " + lane3Count);
    console.log("Lane 4: " + lane4Count);
    console.log("Lane 5: " + lane5Count);

    // Generate a random lane
    let min = 1;
    let max = 6;
    
    // This if block prevents "undefined" from being written as a target word
    if (activeWords.length > 0)
    {
        var latestWord = activeWords[activeWords.length - 1];

        activeLane = Math.floor(Math.random() * (max - min) + min);

        // Generate a new element
        var newSection = document.createElement("p");

        // Add CSS to ensure columns contain 15 words evenly
        newSection.classList.add('target_word');

        // Store the text as a Textnode
        let textNode = document.createTextNode(latestWord);

        // Add the text node to the new p section
        newSection.appendChild(textNode);

    }    

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

// User Input Code
// All logic for what to do when certain keys are pressed
window.addEventListener('keydown', function (e)
{
    console.log('Keys have been pressed');
    // Check if the key was a letter key
    if (letterCodes.includes(e.key) && retry.classList.contains("hide"))
    {
        userWord += e.key;
        console.log(userWord);
    }


    // Match word to required
    else if (e.key == "Enter" && gameActive == true)
    {
        // Select all p elements from the HTML
        let allWords = document.querySelectorAll("p");
        console.log('All p sections selected');

        // Check if any of the inner HTML matches the user word
        // for all p elements and remove it if it does match
        let goodWord = false;
        for (let i = 0; i < allWords.length; i++)
        {
            if (allWords[i].innerHTML == userWord)
            {
                goodWord = true;
                // Increase score by the length of the word
                score += allWords[i].innerHTML.length;
                this.document.querySelector("#score").innerHTML = "Score" + "<br>" + score;
                
                // Remove the word from the screen and set the user word to empty string
                allWords[i].remove();
                userWord = "";
            }
        }
    
        if (!goodWord){
                userWord = "";
                
                if (strikes < 10){
                    strikes++;
                }
                this.document.querySelector("#strikes").innerHTML = "Strikes: " + strikes;
            }
    }
    else if (e.key == "Enter" && gameActive == false){
        if (userWord == "start"){
            gameActive = true;
            userWord = "";
            const timer = setInterval(addWordsOnInterval, gameSpeed);
            this.document.querySelector("#score").innerHTML = "Score" + "<br>" + score;
        }
    }

    // Erase last letter of string if backspace pressed
    else if (e.key == "Backspace")
    {

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
     document.querySelector("#strikes").innerHTML = "Strikes: " + strikes;


     // Delete all children of the lanes
    const wordsToDelete = document.querySelectorAll("p");
    
    // This should delete all p tags
    wordsToDelete.forEach(deleteElement);

    // Remove pop-up retry window
    retry.classList.add("hide");
});



// Change all permanent text to heading tags so we can use p for just the words