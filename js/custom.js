// A small array of demo strings to test functionality
const demoPalindromicStrings = [
    "abcddcbaefggfehijjihklmnmlknoonoo",
    "racecarradarleveldeifiedrotator",
    "abcdedcbaxyzyxwvutsstuvwxxyzyx",
    "qwertrewqqwertyytrewqasdfgfdsa",
    "palindromeemordnilapxyzzyxword",
    "noonracecarredderlevelcivicpop",
    "abcdcbaxyxrepaperotto",
    "statskayakreferminimmadamnoon",
    "abbaevegohangasalamiimalasagnahog"
];
// Function to return the longest palindromic substring in a given string
function longestPalindromicSubstring(s) {
    let start = 0; // Start index of the longest palindrome found
    let end = 0;   // End index of the longest palindrome found

    for (let i = 0; i < s.length; i++) {
        // Check for odd-length palindromes centered at i
        let len1 = expandAroundCenter(s, i, i);

        // Check for even-length palindromes centered between i and i + 1
        let len2 = expandAroundCenter(s, i, i + 1);

        // Determine the longer palindrome length between len1 and len2
        let len = Math.max(len1, len2);

        // Update the start and end indices if a longer palindrome is found
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }

    // Extract and return the longest palindrome substring
    return s.substring(start, end + 1);
}

// Function to expand around the center and return the palindrome length
function expandAroundCenter(s, left, right) {
    // Expand while the characters on either side of the center match
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;  // Move left index one step backward
        right++; // Move right index one step forward
    }

    // Return the length of the palindrome
    // Subtract 1 because indices have moved one step beyond the palindrome
    // This considers the zero-based indexing of an array
    return right - left - 1;
};

// Function to set a random string from the demo string array to the input field
function randomDemoString() {
    // Generate a random index based on the length of the demo strings
    const randomIndex = Math.floor(Math.random() * demoPalindromicStrings.length);
    // Update the input field with the demo string
    document.getElementById("start-string").value = demoPalindromicStrings[randomIndex];
};

// Function to find and display the longest palindromic substring
function findLongestPalindromicSubstring() {
    const inputElement = document.getElementById("start-string");
    const resultElement = document.getElementById("result");
    const str = inputElement.value;
    const longestPalindrome = longestPalindromicSubstring(str);
    resultElement.textContent = longestPalindrome;
};

document.addEventListener('DOMContentLoaded', function () {
    randomDemoString();
});

