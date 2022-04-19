import { RPNSolver } from "./solver";

export type State = {
  inputTokens: string[];
  result: string;
};

export const initialState: State = {
  inputTokens: [],
  result: "0"
};

enum ActionType {
  Add = "ADD",
  Clear = "CLEAR",
  Delete = "DELETE",
  Calculate = "CALCULATE"
}

type Action = {
  type: ActionType;
  payload?: string;
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.Add: {
      return {
        ...state,
        inputTokens: [...state.inputTokens, action.payload as string]
      };
    }
    case ActionType.Delete: {
      return {
        ...state,
        inputTokens: state.inputTokens.slice(0, -1)
      };
    }
    case ActionType.Clear: {
      return initialState;
    }
    case ActionType.Calculate: {
      let result: string;
      try {
        result = String(RPNSolver(state.inputTokens.join("")));
      } catch (error) {
        result = (error as Error).message;
      }
      return {
        result,
        inputTokens: []
      };
    }
    default:
      return state;
  }
}

export const addAC = (char: string) => ({
  type: ActionType.Add,
  payload: char
});

export const addFunctionAC = (char: string) => ({
  type: ActionType.Add,
  payload: `${char}(`
});

export const deleteAC = () => ({
  type: ActionType.Delete
});

export const clearAC = () => ({
  type: ActionType.Clear
});

export const calculateAC = () => ({
  type: ActionType.Calculate
});
