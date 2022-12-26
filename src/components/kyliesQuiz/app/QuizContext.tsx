import type { Dispatch } from "react";
import { useContext } from "react";
import { createContext, useReducer } from "react";
import type { Question, Quiz } from "../../../types/core";

export interface QuizState {
  index: number;
  path: string | null;
  q: Question;
  userInput: Record<string, string | number>;
  activeValues: Record<string, string | number>;
}

export type QuizAction =
  | { type: "start"; payload: string }
  | { type: "back" }
  | { type: "next" }
  | { type: "handleInput"; payload: Record<string, string | number> };

export interface ProviderValues extends QuizState {
  dispatch: Dispatch<QuizAction>;
}

const QuizContext = createContext<ProviderValues | undefined>(undefined);

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "start":
      return {
        ...state,
        path: action.payload,
      };
    case "back":
      return { ...state, index: state.index - 1 };
    case "next":
      return { ...state, index: state.index + 1 };
    case "handleInput":
      return {
        ...state,
        userInput: {
          ...state.userInput,
          ...action.payload,
        },
      };
    default:
      throw new Error();
  }
}

interface QuizProviderProps {
  children: React.ReactNode;
  quiz: Quiz;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({
  children,
  quiz,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    q: quiz.opener,
    userInput: {},
    activeValues: {},
    index: 0,
    path: null,
  });

  return (
    <QuizContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const values = useContext(QuizContext);
  if (typeof values === "undefined") {
    throw new Error("Quiz has no provider");
  }
  return values;
};

export default QuizContext;
