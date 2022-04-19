import { toRPN } from "./to-rpn";
import { validateParentheses } from "./validate-parentheses";

export function RPNSolver(string: string): number {
  const stack: number[] = [];

  if (!validateParentheses(string)) {
    throw new Error("Invalid expression!");
  }

  toRPN(string).forEach((token) => {
    if (token.isLiteral()) {
      stack.push(+token.value);
    }

    if (token.isOperator()) {
      if (token.value === "NEGATE") {
        const operation = token.operation as (a: number) => number;
        stack.push(operation(stack.pop() as number));
      } else {
        const { operation } = token;
        const operand2 = stack.pop() as number;
        const operand1 = stack.pop() as number;
        stack.push(operation(operand1, operand2));
      }
    }

    if (token.isFunction()) {
      stack.push(token.function(stack.pop() as number));
    }

    if (token.isVariable()) {
      throw new Error("Variables not supported");
    }
  });

  const result = stack.pop();

  if (stack.length || result === undefined || isNaN(result)) {
    throw new Error("Invalid expression");
  }

  return result;
}
