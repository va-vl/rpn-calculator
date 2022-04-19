export type BasicButtonData = {
  keyCap: string;
};

type ButtonData = BasicButtonData & {
  inputToken: string;
};

export const clearButton: BasicButtonData = {
  keyCap: "C"
};

export const deleteButton: BasicButtonData = {
  keyCap: String.fromCodePoint(0x232b)
};

export const functionButtons: ButtonData[] = [
  { keyCap: "sin", inputToken: "sin" },
  { keyCap: "cos", inputToken: "cos" },
  { keyCap: String.fromCodePoint(0x221a), inputToken: "sqrt" }
];

export const digitButtons: ButtonData[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "."
].map((i) => ({
  keyCap: i,
  inputToken: i
}));

export const operatorButtons: ButtonData[] = [
  "+",
  "-",
  "/",
  "*",
  "^",
  "(",
  ")"
].map((i) => ({
  keyCap: i,
  inputToken: i
}));

export const equalsButton: BasicButtonData = {
  keyCap: "="
};
