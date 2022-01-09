const checkParentheses = (str) => {
  let stack = [];

  const prnthsObj = {
    "{": "}",
    "[": "]",
    "(": ")",
  };

  const prnthsClosedObj = {
    "}": true,
    "]": true,
    ")": true,
  };

  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (prnthsObj[char]) {
      stack.push(char);
    } else if (prnthsClosedObj[char]) {
      if (prnthsObj[stack.pop()] !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
};

console.log("1 true", checkParentheses("--()--")); // true
console.log("2 false", checkParentheses("-a]--[")); // false
console.log("3 false", checkParentheses("dsa{vsfs{ad")); // false
console.log("4 false", checkParentheses("j78(g5b]uyg")); // false
console.log("5 true", checkParentheses(",m{i987y}hj")); // true
console.log("6 true", checkParentheses("dsa[3ed---:]::")); // true
