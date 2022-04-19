import { Token } from "./token";
import { Stack } from "./stack";
import { tokenize } from "./tokenize";

export function toRPN(string: string) {
  const outputQueue: Token[] = [];
  const operatorStack = new Stack<Token>();

  tokenize(string).forEach((token) => {
    if (token.isLiteral() || token.isVariable()) {
      outputQueue.push(token);
    }

    if (token.isFunction()) {
      operatorStack.push(token);
    }

    if (token.isFunctionArgumentSeparator()) {
      let op = operatorStack.peek();
      while (op && !op.isLeftParenthesis()) {
        outputQueue.push(operatorStack.pop() as Token);
        op = operatorStack.peek();
      }
    }

    if (token.isOperator()) {
      const op1 = token;
      while (true) {
        const op2 = operatorStack.peek();
        if (!op2 || !op2.isOperator()) {
          break;
        }
        const op2Precedent = op1.precedence < op2.precedence;
        const equalPrecedence = op1.precedence === op2.precedence;
        if (op2Precedent || (op1.isLeftAssociative() && equalPrecedence)) {
          outputQueue.push(operatorStack.pop() as Token);
        } else {
          break;
        }
      }
      operatorStack.push(token);
    }

    if (token.isLeftParenthesis()) {
      operatorStack.push(token);
    }

    if (token.isRightParenthesis()) {
      let op = operatorStack.peek();
      while (op && !op.isLeftParenthesis()) {
        outputQueue.push(op);
        op = operatorStack.pop();
      }
      operatorStack.pop();
      const functionOp = operatorStack.peek();
      if (functionOp && functionOp.isFunction()) {
        outputQueue.push(operatorStack.pop() as Token);
      }
    }
  });

  while (operatorStack.peek()) {
    const operator = operatorStack.pop() as Token;
    outputQueue.push(operator);
  }

  return outputQueue;
}
