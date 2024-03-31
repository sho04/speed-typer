type State = {
    targetText: string;
    targetWords: Array<string>;
    typedWords: Array<string>;
    currentWordIndex: number;
    currentCharIndex: number;
    mode: "default";
    complete: false;
};

const defaultText = "The quick brown fox jumps over the lazy dog";

const initialState: State = {
    targetText: defaultText,
    targetWords: defaultText.split(" "),
    currentWordIndex: 0,
    currentCharIndex: 0,
    typedWords: [],
    mode: "default",
    complete: false,
};

type Action = 
    // Type a letter, payload is key typed
    | { type: 'type-letter'; payload: string }

    // Type a space
    | { type: 'type-space' }

    // Type a backspace
    | { type: 'type-backspace'};

export default function type(state : State, action: any): State {
    switch (action.type) {
        case 'type-letter': {
            if (state.complete) {
                return {...state}
            }

            let newCharIndex = state.currentCharIndex;
            let newTypedWords = state.typedWords.map((word, index) => {
                if (index === state.currentWordIndex) {
                    newCharIndex++;
                    return word.concat(action.payload);
                } else {
                    return word;
                }
            });
            
            return {...state, typedWords : newTypedWords, currentCharIndex: newCharIndex};
        }

    }

    throw Error('Unknown action.');
}
