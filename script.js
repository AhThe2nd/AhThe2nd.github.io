alert("javascript is working!");
var gameActive = false;

// Codes used to check if a key press is a valid letter
var letterCodes = [ "a", "b", "c", "d", "e", 
                "f", "g", "h", "i", "j", 
                "k", "l", "m", "n", "o", 
                "p", "q", "r", "s", "t", 
                "u", "v", "w", "x", "y",
                "z" ];

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

// Import the functions we need
import {fetchWord} from "./functions.js";

// Declare variables for the active lane and an array of words
var activeLane;
var activeWords = [];

setInterval(addWordsOnInterval, 800);

function addWordsOnInterval(){
    fetchWord(activeWords);
    console.log(activeWords);

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

        // Add CSS
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
    
    // Check if the key was a letter key
    if (letterCodes.includes(e.key))
    {
        console.log(e.key);
        userWord += e.key;
    }

    // Match word to required
    else if (e.key == "Enter")
    {
        // Select all p elements from the HTML
        let allWords = document.querySelectorAll("p");

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
                strikes++;
                this.document.querySelector("#strikes").innerHTML = "Strikes: " + strikes;
            }
    }



    // Erase last letter of string if backspace pressed

    else if (e.key == "Backspace")
    {

        // Chop the last letter off the string
        userWord = userWord.slice(0, userWord.length - 1);
    }
    document.querySelector("#user_word").innerHTML = userWord;
    
}, false);

// NEXT: Keep track of lane lengths and if a lane length ever becomes
//       greater than  17, it is game over.