import react from "react";
import { useState, useEffect, useRef, useReducer } from "react";
import { typeReducer, initialState as initialTypeState } from "./reducers/type";
import { Article } from "../../hooks/useFetchArticle";

import "./style.scss";

type typeBoxProps = {
    article: Article | null;
    loading: boolean;
    error: string | null;
    fetchArticle: () => Promise<void>;
};

const TypeBox = (props: typeBoxProps) => {
    // Typebox State
    // This isn't used now but will be eventually so our state is nicer organized.
    // Eventually we can seperate out the type state and the dom state.
    const [targetText, setTargetText] = useState(
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair. The Jarrow March (5–31 October 1936) was a protest against the unemployment and poverty suffered in the Tyneside town of Jarrow, in the north-east of England, during the 1930s. Around 200 men marched from Jarrow to London to petition the government to restore industry in the town after the closure in 1934 of Palmer's shipyard. Palmer's had launched more than 1,000 ships since 1852. In the 1920s, mismanagement and changed world trade conditions caused a decline which led to the yard's closure. When plans for its replacement by a steelworks were thwarted, the lack of any large-scale employment in the town led the borough council to organise the march. The House of Commons received the petition but took no action, and the march produced few immediate results. The Jarrovians went home believing that they had failed. In subsequent years the Jarrow March became recognised as a defining event of the 1930s and helped to prepare the way for wide social reform after the Second World War."
    );

    const [loadingText, setLoadingText] = useState("Loading Text...");

    const [typeState, typeDispatch] = useReducer(typeReducer, initialTypeState);

    // Constants
    const lines = 8;
    const lineOffset = 3;

    // Will be reduced to dom state eventually
    const [textHeight, setTextHeight] = useState(0);
    const [caretPosition, setCaretPosition] = useState([0, 0]);
    const [lineCount, setLineCount] = useState(0);

    // Refs
    const caretRef = useRef<HTMLDivElement>(null);
    const typeboxRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const wordRef = useRef<HTMLSpanElement>(null);

    // Get character calss from the current word and character index.
    const getCharClass = (
        char: string,
        charIndex: number,
        wordIndex: number
    ) => {
        if (wordIndex > typeState.currentWordIndex) {
            return "char";
        } else if (wordIndex === typeState.currentWordIndex) {
            if (charIndex >= typeState.currentCharIndex) {
                return "char";
            }
        }

        if (char === typeState.typedWords[wordIndex][charIndex]) {
            return "char-correct";
        } else {
            if (typeState.typedWords[wordIndex][charIndex] === undefined)
                return "char";
            //console.log(char + " " + typeState.typedWords[wordIndex][charIndex])
            return "char-incorrect";
        }
    };

    // Get junk text to display after the current word if the space isn't typed.
    const getJunkText = (word: string, wordIndex: number) => {
        if (typeState.typedWords[wordIndex] === undefined) return "";
        if (typeState.typedWords[wordIndex].length > word.length) {
            //console.log(typedWords[wordIndex].slice(word.length));
            return typeState.typedWords[wordIndex].slice(word.length);
        } else {
            return "";
        }
    };

    // All key down and type event logic
    const handleKeyDown = (event: react.KeyboardEvent<HTMLInputElement>) => {
        //let code = event.key.charCodeAt(0);
        let key = event.key;

        //let newTypedWords: string[];

        switch (key) {
            case "Backspace":
                typeDispatch({ type: "type-backspace" });

                break;
            case "Shift":
                break;
            case "Enter":
                break;
            case "Control": // this is fucking disugsting but its optimal
                break;
            case "Alt":
                break;
            case "Delete":
                break;
            case "Tab":
                break;
            case "CapsLock":
                break;
            case "Escape":
                break;
            case "ArrowLeft":
                break;
            case "ArrowRight":
                break;
            case "ArrowUp":
                break;
            case "ArrowDown":
                break;
            case " ":
                typeDispatch({ type: "type-space" });

                break;
            default:
                typeDispatch({ type: "type-letter", payload: key });

                break;
        }
    };

    // Move the caret to the current character using refs.
    const moveCaret = () => {
        let typebox = typeboxRef.current!;
        let typeboxWords = [];

        for (let i = 1; i < typebox.children.length; i++) {
            typeboxWords.push(typebox.children[i]);
        }

        let typeboxChar;
        if (typeState.currentWordIndex < typeboxWords.length) {
            typeboxChar =
                typeboxWords[typeState.currentWordIndex].children[
                    typeState.currentCharIndex
                ];
        } else {
            return;
        }

        let caret = caretRef.current!;

        let currentCharRect = typeboxChar.getBoundingClientRect();
        let typeboxRect = typebox.getBoundingClientRect();

        // Top needs to offset by the position of the typebox div and the scroll offset
        let top = currentCharRect.top - (typeboxRect.top - typebox.scrollTop);

        caret.style.left = currentCharRect.left - typeboxRect.left + "px";
        caret.style.top = top + "px";
        caret.style.height = currentCharRect.height + "px";

        setCaretPosition([currentCharRect.left - typeboxRect.left, top]);
    };

    // Initialize the STYLES of the typebox nothing more
    const initializeTypebox = () => {
        let typebox = typeboxRef.current!;
        let wordRefRect = wordRef.current!.getBoundingClientRect();

        typebox.style.maxHeight = wordRefRect.height * lines + "px";

        setTextHeight(wordRefRect.height);
    };

    // Scroll the div to the current line.
    const scrollText = () => {
        let typebox = typeboxRef.current!;

        //typebox.scrollTop = textHeight * (lineCount - lineOffset + 1);
        //typebox.scrollTop = textHeight * (lineCount);

        typebox.scroll({
            top: textHeight * lineCount,
            left: 0,
            behavior: "smooth",
        });
    };

    // Refocus to input
    const refocus = () => {
        let input = inputRef.current!;
        input.focus();
    };

    //

    // USE EFFECTS
    useEffect(() => {
        props.fetchArticle();
        initializeTypebox();
    }, []);

    useEffect(() => {
        if (props.loading) {
            typeDispatch({
                type: "reset",
            });
            typeDispatch({
                type: "initialize-text",
                payload: loadingText,
            });
        }

        if (props.article) {
            typeDispatch({
                type: "reset",
            });
            typeDispatch({
                type: "initialize-text",
                payload: props.article.extract,
            });
        }
    }, [props.loading, props.article, loadingText])

    // Run whenever the y position of the caret changes
    useEffect(() => {
        //console.log(Math.round(caretPosition[1] / textHeight));
        //console.log(caretPosition[0] + " " + caretPosition[1]);
        setLineCount(Math.round(caretPosition[1] / textHeight));
    }, [caretPosition[1]]);

    useEffect(() => {
        if (Math.round(caretPosition[1] / textHeight) > lines - 1) {
            scrollText();
        }
    }, [lineCount]);

    // Whenever the current character index changes
    useEffect(() => {
        moveCaret();
    }, [typeState.currentCharIndex]);

    useEffect(() => {
        // debug print
        console.log(typeState);
    }, [typeState]);

    return (
        <>
            <input onKeyDown={handleKeyDown} ref={inputRef}></input>
            <div className="type-box-container">
                <div
                    className="type-box"
                    ref={typeboxRef}
                    onClick={() => refocus()}
                >
                    <div className="caret" ref={caretRef}></div>

                    {typeState.targetWords.map((word, wordIndex) => {
                        let junkText = getJunkText(word, wordIndex);

                        return (
                            <span
                                key={wordIndex}
                                className="word"
                                ref={wordRef}
                            >
                                {word.split("").map((char, charIndex) => {
                                    let className = getCharClass(
                                        char,
                                        charIndex,
                                        wordIndex
                                    );

                                    return (
                                        <span
                                            key={charIndex}
                                            className={className}
                                        >
                                            {char}
                                        </span>
                                    );
                                })}
                                {junkText.split("").map((char, charIndex) => {
                                    return (
                                        <span
                                            key={charIndex}
                                            className={"char-junk"}
                                        >
                                            {char}
                                        </span>
                                    );
                                })}

                                <span className="space">&nbsp;</span>
                            </span>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default TypeBox;
