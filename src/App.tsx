import * as React from "react";
import {
  clearButton,
  deleteButton,
  functionButtons,
  operatorButtons,
  equalsButton,
  digitButtons
} from "./constants";
import {
  initialState,
  reducer,
  addAC,
  addFunctionAC,
  clearAC,
  deleteAC,
  calculateAC
} from "./reducer";
import { Button } from "./components";

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div className="app">
      <div className="calculator">
        <div className="display">
          <p className="input">{state.inputTokens.join("")}</p>
          <p className="result">{state.result}</p>
        </div>
        <div className="keys">
          <div className="keys_left">
            {functionButtons.map(({ keyCap, inputToken }) => (
              <Button
                key={inputToken}
                keyCap={keyCap}
                onClick={() => {
                  dispatch(addFunctionAC(inputToken));
                }}
              />
            ))}
            {operatorButtons.map(({ keyCap, inputToken }) => (
              <Button
                key={inputToken}
                keyCap={keyCap}
                onClick={() => {
                  dispatch(addAC(inputToken));
                }}
              />
            ))}
          </div>
          <div className="keys_right">
            <Button
              {...clearButton}
              className="button__clear"
              onClick={() => {
                dispatch(clearAC());
              }}
            />
            <Button
              {...deleteButton}
              className="button__delete"
              onClick={() => {
                dispatch(deleteAC());
              }}
            />
            {digitButtons.map(({ keyCap, inputToken }) => (
              <Button
                key={inputToken}
                keyCap={keyCap}
                className={keyCap === "0" ? "button__zero" : ""}
                onClick={() => {
                  dispatch(addAC(inputToken));
                }}
              />
            ))}
            <Button
              {...equalsButton}
              className="button__equals"
              onClick={() => dispatch(calculateAC())}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
