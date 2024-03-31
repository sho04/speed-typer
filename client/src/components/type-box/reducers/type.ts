type State = {
    targetText: string;
    targetWords: Array<string>;
    currentWordIndex: number;
    currentCharIndex: number;
    typedWords: Array<string>;
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

type Actiond = 
    | { type: 'type-letter'; paylod: string }
    | { type: 'type-space'; payload: string }
    | { type: 'type-backspace'};

export default function type(state = initialState, action: any) {
    
}
