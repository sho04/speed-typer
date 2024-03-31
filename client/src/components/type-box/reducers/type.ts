type State = {
    targetText: string;
    targetWords: Array<string>;
    typedWords: Array<string>;
    currentWordIndex: number;
    currentCharIndex: number;
    mode: "default" | "book";
    complete: boolean;
    passed: boolean;
};

const defaultText =
    "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair. The Jarrow March (5–31 October 1936) was a protest against the unemployment and poverty suffered in the Tyneside town of Jarrow, in the north-east of England, during the 1930s. Around 200 men marched from Jarrow to London to petition the government to restore industry in the town after the closure in 1934 of Palmer's shipyard. Palmer's had launched more than 1,000 ships since 1852. In the 1920s, mismanagement and changed world trade conditions caused a decline which led to the yard's closure. When plans for its replacement by a steelworks were thwarted, the lack of any large-scale employment in the town led the borough council to organise the march. The House of Commons received the petition but took no action, and the march produced few immediate results. The Jarrovians went home believing that they had failed. In subsequent years the Jarrow March became recognised as a defining event of the 1930s and helped to prepare the way for wide social reform after the Second World War.";

export const initialState: State = {
    targetText: defaultText,
    targetWords: defaultText.split(" "),
    currentWordIndex: 0,
    currentCharIndex: 0,
    typedWords: [""],
    mode: "default",
    complete: false,
    passed: false,
};

type Action =
    // Reset the state to default
    | { type: "reset" }

    // Initialize the game based off of  a state
    | { type: "initialize-text"; payload: string }

    // Type a letter, payload is key typed
    | { type: "type-letter"; payload: string }

    // Type a space
    | { type: "type-space" }

    // Type a backspace
    | { type: "type-backspace" };

export const typeReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "reset": {
            return initialState;
        }

        case "initialize-text": {
            // If short just use default mode
            if (action.payload.length < 1500) {
                return {
                    ...initialState,
                    targetText: action.payload,
                    targetWords: action.payload.split(" "),
                };

                // If long use book mode so we know to turn pages instead of scrolling
            } else {
                return {
                    ...initialState,
                    targetText: action.payload,
                    targetWords: action.payload.split(" "),
                    mode: "book",
                };
            }
        }

        // Type letter
        case "type-letter": {
            if (state.complete) {
                return { ...state };
            }

            let newCharIndex = state.currentCharIndex;
            let newTypedWords = state.typedWords.map((word, index) => {
                //console.log(index);
                if (index === state.currentWordIndex) {
                    newCharIndex++;

                    return word.concat(action.payload);
                } else {
                    return word;
                }
            });

            let complete = false;
            let passed = false;

            // If we are at the last word and they equal then we are complete.
            if (
                newTypedWords[state.currentWordIndex] ===
                    state.targetWords[state.currentWordIndex] &&
                state.currentWordIndex === state.targetWords.length - 1
            ) {
                complete = true;
            }

            return {
                ...state,
                typedWords: newTypedWords,
                currentCharIndex: newCharIndex,
                complete: complete,
            };
        }

        // Type space
        case "type-space": {
            let newCurrentCharIndex = state.currentCharIndex;
            let newCurrentWordIndex = state.currentWordIndex;
            let newTypedWords = state.typedWords.map((word, index) => {
                return word;
            });

            if (state.currentCharIndex == 0) {
                return { ...state };
            }

            if (state.complete) {
                return { ...state };
            }

            if (
                state.currentWordIndex === state.targetWords.length - 1 &&
                state.currentCharIndex ===
                    state.targetWords[state.targetWords.length - 1].length
            ) {
                console.log("passed");
                return { ...state, complete: true };
            }

            if (state.currentWordIndex >= state.targetWords.length - 1) {
                return { ...state, complete: true };
            }

            // Go to the next word.
            newCurrentWordIndex++;
            newCurrentCharIndex = 0;
            newTypedWords = state.typedWords.concat("");

            return {
                ...state,
                typedWords: newTypedWords,
                currentCharIndex: newCurrentCharIndex,
                currentWordIndex: newCurrentWordIndex,
            };
        }

        // Type backspace
        case "type-backspace": {
            let newTypedWords = state.typedWords.map((word, index) => {
                if (index === state.currentWordIndex) {
                    return word.slice(0, -1);
                } else {
                    return word;
                }
            });

            let newCurrentCharIndex = state.currentCharIndex;
            let newCurrentWordIndex = state.currentWordIndex;

            // Delete the last word if we're at the beginning of the current word.
            if (state.currentCharIndex > 0) {
                newCurrentCharIndex--;
            } else if (state.currentWordIndex > 0) {
                newCurrentWordIndex--;
                newCurrentCharIndex =
                    state.typedWords[state.currentWordIndex - 1].length;
                newTypedWords = state.typedWords.slice(0, -1);
            }

            return {
                ...state,
                typedWords: newTypedWords,
                currentCharIndex: newCurrentCharIndex,
                currentWordIndex: newCurrentWordIndex,
            };
        }
    }

    throw Error("Unknown action.");
};
