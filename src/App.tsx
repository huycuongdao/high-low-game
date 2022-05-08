import { Box, Flex, Center, Heading, Button, Stack } from "@chakra-ui/react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useMachine } from "@xstate/react";

import Header from "./components/Header";
import Number from "./components/Number";
import { highLowMachine, Step } from "./machine";

/*
----------------
## Requirements:
  - Complete the High-Low Game
    - Game flow
      1. Start a new game by pressing "Start Game" button, and then hide the button
      2. The "?" in the left card will become a randomly generated number A
      3. Two buttons: "Higher" and "Lower" will show underneath the right card for user to choose upon
      4. After user clicked the “Higher” or “Lower” button, the two buttons will disappear
      5. The "?" in the right card will become a randomly generated number B
      6. Show the game result and “Play Again” button under the cards after comparing the high or low of the two numbers (A & B) and user’s choice
      7. After user clicked the “Play Again” button, the number B in the right card will change back to "?"
      8. Number A in the left card will be regenerated, return to step 3 to continue a new game
    - Game rule
      - The number A and B are always randomly generated between 1~10
      - When B > A and user chose `Higher`，the game result is WIN
      - When B > A and user chose `Lower`，the game result is LOSE
      - When B < A and user chose `Higher`，the game result is LOSE
      - When B < A and user chose `Lower`，the game result is WIN
      - When B = A and user chose `Higher`，the game result is LOSE
      - When B = A and user chose `Lower`，the game result is LOSE

## Bonus:
  - Please refactor the components
  - Complete the game with XState
    - document：https://xstate.js.org/docs/
*/

const App = () => {
  const [state, send] = useMachine(highLowMachine);
  const { a, b, result } = state.context;
  const step = state.value as Step;

  return (
    <Box bgColor="#f3f3f3" h="100vh">
      <Center pt="120px">
        <Flex w="400px" px="64px" direction="column" align="center">
          <Header />

          <Flex w="full" justify="space-between" mb="32px">
            <Number value={a} />
            <Number value={b} />
          </Flex>

          {step === "started" && (
            <Flex maxW="120px" flex={1} direction="column">
              {/* `Higher` and `Lower` buttons UI */}
              <Button
                onClick={() => {
                  send("HIGHER");
                }}
                colorScheme="twitter"
                leftIcon={<RiArrowUpSLine />}
                mb="12px"
              >
                Higher
              </Button>
              <Button
                onClick={() => {
                  send("LOWER");
                }}
                colorScheme="facebook"
                leftIcon={<RiArrowDownSLine />}
              >
                Lower
              </Button>
            </Flex>
          )}

          {step === "idle" && (
            <Box mt="64px">
              <Button
                colorScheme="blue"
                onClick={() => {
                  send({ type: "START" });
                }}
              >
                Start Game
              </Button>
            </Box>
          )}

          {/* Game result UI */}
          {step === "end" && (
            <Stack mt="24px" spacing="16px">
              <Heading color={result === "win" ? "twitter.300" : "red.300"} align="center">
                {result === "win" ? "WIN!" : "LOSE!"}
              </Heading>

              <Button
                colorScheme="blue"
                onClick={() => {
                  send("PLAY_AGAIN");
                }}
              >
                Play Again
              </Button>
            </Stack>
          )}
        </Flex>
      </Center>
    </Box>
  );
};

export default App;
