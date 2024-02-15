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

var pwdLength;
var uppercase;
var lowercase;
var numbers;
var punctuation;

// Function to prompt user for password options
function getPasswordOptions() {
  var pwdLengthElement = document.getElementById('password-length');
  pwdLength = pwdLengthElement.value;

  var preferenceElement1 = document.getElementById('preference1');
  uppercase = preferenceElement1.checked;
  
  var preferenceElement2 = document.getElementById('preference2');
  lowercase = preferenceElement2.checked;
  
  var preferenceElement3 = document.getElementById('preference3');
  numbers = preferenceElement3.checked;
  
  var preferenceElement4 = document.getElementById('preference4');
  punctuation = preferenceElement4.checked;

  console.log(pwdLength + uppercase + lowercase + numbers + punctuation)
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex];
}

// Function to generate password with user input
function generatePassword() {
  getPasswordOptions();

  var pwdPreferenceBoolean = [uppercase, lowercase, numbers, punctuation];
  var pwdPreferenceArray = [];
  var numPreferences = 0;
  var draftPassword = [];
  var actualPassword = [];

  //calculate a balanced number of characters for each preference
  //check the number of preferences
  for (var i = 0; i < pwdPreferenceBoolean.length; i++) {
    if (pwdPreferenceBoolean[i] != false) {
      numPreferences+= 1;
    }
  }
  var baseNumber = parseInt(pwdLength / numPreferences); //minimum number of characters for the selected preferences
  var numExtra = pwdLength - (baseNumber * numPreferences); //the remainder
  //declare variables
  var numUppercase = 0;
  var numLowercase = 0;
  var numNumbers = 0;
  var numPunctuation = 0;
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

  // scramble the password order
  for (var i = 0; i < draftPassword.length; i++) {
    var character = getRandom(draftPassword);
    while (character == "null") {
      character = getRandom(draftPassword);
      if (character != "null") {
        break;
      }
    }
    actualPassword.push(character);
    draftPassword[draftPassword.indexOf(character)] = "null";
  }

  //create string to hold password
  var password = "";
  for (var i = 0; i < pwdLength; i++) {
    password += actualPassword[i];
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
  } else if (pwdLength < 8 || pwdLength > 128) {
    passwordText.value = "Please ensure that the desired password legnth is at least 8 characters and no more than 128."
  } else if (uppercase===false && lowercase===false && numbers===false && punctuation===false) {
    passwordText.value = "Please makes sure that you have selected your password preferences.";
  } else {
    console.log("passed")
    passwordText.value = generatePassword();
  }
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);