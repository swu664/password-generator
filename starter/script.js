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

// Function to prompt user for password options
function getPasswordOptions() {
  let pwdLengthElement = document.getElementById('password-length');
  let pwdLength = pwdLengthElement.value;

  let preferenceElement1 = document.getElementById('preference1');
  let uppercase = preferenceElement1.checked;
  
  let preferenceElement2 = document.getElementById('preference2');
  let lowercase = preferenceElement2.checked;
  
  let preferenceElement3 = document.getElementById('preference3');
  let numbers = preferenceElement3.checked;
  
  let preferenceElement4 = document.getElementById('preference4');
  let punctuation = preferenceElement4.checked;

  console.log(pwdLength + uppercase + lowercase + numbers + punctuation)
}

// Function for getting a random element from an array
function getRandom(arr) {
  return Math.floor(Math.random() * arr.length);
}

// Function to generate password with user input
function generatePassword() {
  getPasswordOptions();

  let pwdPreferenceBoolean = [uppercase, lowercase, numbers, punctuation];
  let pwdPreferenceArray = [];
  let numPreferences = 0;
  let draftPassword = new Array(pwdLength);
  let actualPassword = new Array(pwdLength);

  //calculate a balanced number of characters for each preference
  //check the number of preferences
  for (let i = 0; i < pwdPreferenceBoolean.length; i++) {
    if (pwdPreferenceBoolean[i] != false) {
      numPreferences+= 1;
    }
  }
  let baseNumber = Math.floor(pwdLength / numPreferences); //minimum number of characters for the selected preferences
  let numExtra = pwdLength % numPreferences; //the remainder
  //declare variables
  let numUppercase = 0;
  let numLowercase = 0;
  let numNumbers = 0;
  let numPunctuation = 0;
  //iterate through "pwd preference array" to assign the base number of characters
  for (var i = 0; i < pwdPreferenceBoolean.length; i++) {
    if (pwdPreferenceBoolean[i] = true) {
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
      pwdPreferenceArray.splice(randomIndex, 1); //remove the chosen character type
      numExtra -= 1; //decrease the number of remaining extra characters
    }
  }
  
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');
//if password is empty and no preference is selected ...
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);