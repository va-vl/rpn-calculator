export function validateParentheses(string: string): boolean {
  const stack: string[] = [];

  for (let char of string) {
    if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      if (stack[stack.length - 1] === "(") {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}
