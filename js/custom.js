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
function longestPalindromicSubstring(s) {
    let start = 0;
    let end = 0;
    for (let i = 0; i < s.length; i++) {
        let len1 = expandAroundCenter(s, i, i);
        let len2 = expandAroundCenter(s, i, i + 1);
        let len = Math.max(len1, len2);
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }
    return s.substring(start, end + 1);
};
function expandAroundCenter(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
};
function randomDemoString() {
    document.getElementById("start-string").value = demoPalindromicStrings[Math.floor(Math.random() * demoPalindromicStrings.length)]
};
function findLongestPalindromicSubstring() {
    var str = document.getElementById("start-string").value;
    const longestPalindrome = longestPalindromicSubstring(str);
    document.getElementById("result").textContent = longestPalindrome;
};
document.addEventListener('DOMContentLoaded', function () {
    randomDemoString();
});
