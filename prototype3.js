// Import the functions we need
import {fetchWord} from "./functions.js";

// Declare active word array and the next word
var activeWords = [];
var nextWord;

setInterval(addWordsOnInterval(), 1000);

function addWordsOnInterval(){
    fetchWord(activeWords);
}
