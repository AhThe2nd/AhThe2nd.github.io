// All functions will be stored here

// This function gets a random word promise from the Random Words API of length 3 - 7 characters inclusive.
export async function fetchWord(array) {

    console.log('Flag #3');
    // Generate a random int between a minimum and maximum
    let word;
    var min = 3;
    var max = 8;
    var wordLength = Math.floor(Math.random() * (max - min) + min);
    
    // API Call
    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${wordLength}`);
    const wordJSON = await response.json();
    word = wordJSON[0];
    array[array.length] = word;
    return array;
  };

// This function deletes an HTML element
export function deleteElement(element){
  element.remove();
}