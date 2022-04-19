export enum Types {
  Literal,
  Variable,
  Operator,
  Function,
  FunctionArgumentSeparator,
  LeftParenthesis,
  RightParenthesis
}

export enum Associativity {
  Left,
  Right
}

const Operators = {
  NEGATE: {
    associativity: Associativity.Right,
    precedence: 5,
    operation: (a: number) => -a
  },
  "^": {
    associativity: Associativity.Right,
    precedence: 4,
    operation: (a: number, b: number) => a ** b
  },
  "*": {
    associativity: Associativity.Left,
    precedence: 3,
    operation: (a: number, b: number) => a * b
  },
  "/": {
    associativity: Associativity.Left,
    precedence: 3,
    operation: (a: number, b: number) => a / b
  },
  "+": {
    associativity: Associativity.Left,
    precedence: 2,
    operation: (a: number, b: number) => a + b
  },
  "-": {
    associativity: Associativity.Left,
    precedence: 2,
    operation: (a: number, b: number) => a - b
  }
};

export const operatorCharacters = Object.keys(Operators).filter(
  (char) => char !== "NEGATE"
);

export type OperatorCharactersType = Exclude<keyof typeof Operators, "NEGATE">;

const Functions = {
  sqrt: (n: number) => Math.sqrt(n),
  sin: (deg: number) => Math.sin((deg * Math.PI) / 180),
  cos: (deg: number) => Math.cos((deg * Math.PI) / 180)
};

export const functionStrings = Object.keys(Functions);

export type FunctionStringsType = keyof typeof Functions;

export class Token {
  constructor(public type: Types, public value: string) {}

  static literal(ch: string) {
    return new this(Types.Literal, ch);
  }

  static variable(ch: string) {
    return new this(Types.Variable, ch);
  }

  static operator(ch: keyof typeof Operators) {
    return new this(Types.Operator, ch);
  }

  static function(ch: keyof typeof Functions) {
    return new this(Types.Function, ch);
  }

  static functionArgumentSeparator() {
    return new this(Types.FunctionArgumentSeparator, ",");
  }

  static leftParenthesis() {
    return new this(Types.LeftParenthesis, "(");
  }

  static rightParenthesis() {
    return new this(Types.RightParenthesis, ")");
  }

  get precedence() {
    this._checkType(Types.Operator);
    return Operators[this.value as keyof typeof Operators].precedence;
  }

  get associativity() {
    this._checkType(Types.Operator);
    return Operators[this.value as keyof typeof Operators].associativity;
  }

  get operation() {
    this._checkType(Types.Operator);
    return Operators[this.value as keyof typeof Operators].operation;
  }

  get function() {
    this._checkType(Types.Function);
    return Functions[this.value as keyof typeof Functions];
  }

  isLeftAssociative() {
    return this.associativity === Associativity.Left;
  }

  isLiteral() {
    return this.type === Types.Literal;
  }

  isVariable() {
    return this.type === Types.Variable;
  }

  isOperator() {
    return this.type === Types.Operator;
  }

  isFunction() {
    return this.type === Types.Function;
  }

  isFunctionArgumentSeparator() {
    return this.type === Types.FunctionArgumentSeparator;
  }

  isLeftParenthesis() {
    return this.type === Types.LeftParenthesis;
  }

  isRightParenthesis() {
    return this.type === Types.RightParenthesis;
  }

  private _checkType(type: Types) {
    if (this.type !== type) {
      throw new Error("Incorrect token type!");
    }
  }
}
