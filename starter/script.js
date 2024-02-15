// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

let pwdLength;
let uppercase;
let lowercase;
let numbers;
let punctuation;

// Function to prompt user for password options
function getPasswordOptions() {
  let pwdLengthElement = document.getElementById('password-length');
  pwdLength = pwdLengthElement.value;

  let preferenceElement1 = document.getElementById('preference1');
  uppercase = preferenceElement1.checked;
  
  let preferenceElement2 = document.getElementById('preference2');
  lowercase = preferenceElement2.checked;
  
  let preferenceElement3 = document.getElementById('preference3');
  numbers = preferenceElement3.checked;
  
  let preferenceElement4 = document.getElementById('preference4');
  punctuation = preferenceElement4.checked;

  console.log(pwdLength + uppercase + lowercase + numbers + punctuation)
}

// Function for getting a random element from an array
function getRandom(arr) {
  let randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex];
}

// Function to generate password with user input
function generatePassword() {
  getPasswordOptions();

  let pwdPreferenceBoolean = [uppercase, lowercase, numbers, punctuation];
  let pwdPreferenceArray = [];
  let numPreferences = 0;
  let draftPassword = [];
  let actualPassword = [];

  //calculate a balanced number of characters for each preference
  //check the number of preferences
  for (let i = 0; i < pwdPreferenceBoolean.length; i++) {
    if (pwdPreferenceBoolean[i] != false) {
      numPreferences+= 1;
    }
  }
  let baseNumber = parseInt(pwdLength / numPreferences); //minimum number of characters for the selected preferences
  let numExtra = pwdLength - (baseNumber * numPreferences); //the remainder
  //declare variables
  let numUppercase = 0;
  let numLowercase = 0;
  let numNumbers = 0;
  let numPunctuation = 0;
  //iterate through "pwd preference array" to assign the base number of characters
  for (var i = 0; i < pwdPreferenceBoolean.length; i++) {
    if (pwdPreferenceBoolean[i] == true) {
      switch (i) {
        case 0:
          numUppercase = baseNumber; //update number of characters
          pwdPreferenceArray.push(0); //note which type was selected following the cases
          break;
        case 1:
          numLowercase = baseNumber;
          pwdPreferenceArray.push(1);
          break;
        case 2:
          numNumbers = baseNumber;
          pwdPreferenceArray.push(2);
          break;
        case 3:
          numPunctuation = baseNumber;
          pwdPreferenceArray.push(3);
          break;
      }
    }
  }
  //randomize the assignment of the additional characters
  if (numExtra != 0) {
    for (var i = 0; i < numExtra; i++) {
      var randomIndex = Math.floor(Math.random() * numExtra);
      switch (pwdPreferenceArray[randomIndex]) {
        case 0:
          numUppercase += 1;
          break;
        case 1:
          numLowercase += 1;
          break;
        case 2:
          numNumbers += 1;
          break;
        case 3:
          numPunctuation += 1;
          break;
      }
    }
  }

  //generate the password
  //retrieving password characters according to the selected preferences
  for (var i = 0; i < numUppercase; i++) {
    draftPassword.push(getRandom(upperCasedCharacters));
  }
  for (var i = 0; i < numLowercase; i++) {
    draftPassword.push(getRandom(lowerCasedCharacters));
  }
  for (var i = 0; i < numNumbers; i++) {
    draftPassword.push(getRandom(numericCharacters));
  }
  for (var i = 0; i < numPunctuation; i++) {
    draftPassword.push(getRandom(specialCharacters));
  }
  //scramble password order
  var arrayCopy = draftPassword.slice(); // Make a copy of the original array

    for (var i = 0; i < pwdLength; i++) {
        // Generate a random index between 0 and the length of the array
        var randomIndex = getRandom(arrayCopy);

        // Add the element at the random index to the result array
        actualPassword.push(arrayCopy[randomIndex]);

        // Remove the selected element from the array copy to avoid duplicates
        arrayCopy.splice(randomIndex, 1);
    }

  //create string to hold password
  let password = "";
  for (var i = 0; i < pwdLength; i++) {
    password += draftPassword[i];
  }
  return password;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var passwordText = document.querySelector('#password');
  getPasswordOptions();
  //if password is empty and no preference is selected
  if (pwdLength == 0) {
    passwordText.value = "Please makes sure that you have entered your desired password length and selected your password preferences.";
  } else if (uppercase===false && lowercase===false && numbers===false && punctuation===false) {
    passwordText.value = "Please makes sure that you have selected your password preferences.";
  } else {
    console.log("passed")
    passwordText.value = generatePassword();
  }
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);