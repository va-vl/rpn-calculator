import {
  Token,
  operatorCharacters,
  OperatorCharactersType,
  functionStrings,
  FunctionStringsType
} from "./token";

const isDigit = (char: string) => /\d|\./.test(char);
const isOperator = (char: string) => operatorCharacters.includes(char);
const isLetter = (char: string) => /[a-z]/i.test(char);
const isFunction = (str: string) => functionStrings.includes(str);
const isComma = (char: string) => char === ",";
const isLeftParenthesis = (char: string) => char === "(";
const isRightParenthesis = (char: string) => char === ")";
const isUnaryMinus = (char: string, charIndex: number, lastChar?: string) =>
  char === "-" &&
  (charIndex === 0 ||
    isLeftParenthesis(lastChar as string) ||
    isOperator(lastChar as string));

export function tokenize(str: string) {
  const result: Token[] = [];
  const letterBuffer: string[] = [];
  const numberBuffer: string[] = [];
  let lastChar: string;

  const emptyNumberBufferAsLiteral = () => {
    if (numberBuffer.length) {
      result.push(Token.literal(numberBuffer.join("")));
      numberBuffer.length = 0;
    }
  };

  const emptyLetterBufferAsVariables = () => {
    for (let i = 0, l = letterBuffer.length; i < l; i += 1) {
      result.push(Token.variable(letterBuffer[i]));
      if (i < l - 1) {
        result.push(Token.operator("*"));
      }
    }
    letterBuffer.length = 0;
  };

  [...str.replace(/\s+/g, "")].forEach((char, idx) => {
    if (isDigit(char)) {
      numberBuffer.push(char);
    }

    if (isLetter(char)) {
      if (numberBuffer.length) {
        emptyNumberBufferAsLiteral();
        result.push(Token.operator("*"));
      }
      letterBuffer.push(char);
    }

    if (isOperator(char)) {
      if (isUnaryMinus(char, idx, lastChar)) {
        result.push(Token.operator("NEGATE"));
        return;
      }

      emptyNumberBufferAsLiteral();
      emptyLetterBufferAsVariables();
      result.push(Token.operator(char as OperatorCharactersType));
    }

    if (isLeftParenthesis(char)) {
      if (letterBuffer.length) {
        const bufferedLetters = letterBuffer.join("");
        if (isFunction(bufferedLetters)) {
          result.push(Token.function(bufferedLetters as FunctionStringsType));
          letterBuffer.length = 0;
        } else {
          emptyLetterBufferAsVariables();
        }
      } else if (numberBuffer.length) {
        emptyNumberBufferAsLiteral();
        result.push(Token.operator("*"));
      }
      result.push(Token.leftParenthesis());
    }

    if (isRightParenthesis(char)) {
      emptyLetterBufferAsVariables();
      emptyNumberBufferAsLiteral();
      result.push(Token.rightParenthesis());
    }

    if (isComma(char)) {
      emptyNumberBufferAsLiteral();
      emptyLetterBufferAsVariables();
      result.push(Token.functionArgumentSeparator());
    }

    lastChar = char;
  });

  if (numberBuffer.length) {
    emptyNumberBufferAsLiteral();
  }

  if (letterBuffer.length) {
    emptyLetterBufferAsVariables();
  }

  return result;
}
