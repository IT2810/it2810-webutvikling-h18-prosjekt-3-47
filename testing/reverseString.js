const reverseString = str => 
    str
        .toLowerCase()
        .split('')//Split into an array
        .reverse()//reverse the the chars in our array
        .join('');//Put the chars together

module.exports = reverseString;
