import { assign, createMachine } from "xstate";

const getNumber = () => Math.floor(Math.random() * 10) + 1;

export type Step = "idle" | "started" | "end";
type GameResult = "unknown" | "win" | "lose";

interface Context {
  a?: number;
  b?: number;
  result: GameResult;
}

const initialContext: Context = {
  a: undefined,
  b: undefined,
  result: "unknown",
};

export const highLowMachine = createMachine(
  {
    id: "high-low",
    initial: "idle",
    context: initialContext,
    states: {
      idle: {
        on: {
          START: {
            actions: "clickStart",
            target: "started",
          },
        },
      },
      started: {
        on: {
          HIGHER: {
            actions: "clickHigher",
            target: "end",
          },
          LOWER: {
            actions: "clickLower",
            target: "end",
          },
        },
      },
      end: {
        on: {
          PLAY_AGAIN: {
            actions: "clickPlayAgain",
            target: "started",
          },
        },
      },
    },
  },
  {
    actions: {
      clickStart: assign((context) => ({ a: getNumber() })),
      clickHigher: assign((context) => {
        const { a } = context;
        const _b = getNumber();

        let _result: GameResult = "unknown";

        if (_b > a!) {
          _result = "win";
        } else {
          _result = "lose";
        }

        return { b: _b, result: _result };
      }),
      clickLower: assign((context) => {
        const { a } = context;
        const _b = getNumber();

        let _result: GameResult = "unknown";

        if (_b > a!) {
          _result = "win";
        } else {
          _result = "lose";
        }
        return { b: _b, result: _result };
      }),
      clickPlayAgain: assign((context) => ({ ...initialContext, a: getNumber() })),
    },
  },
);
