import react from "react";
import { useState, useEffect, useRef } from "react";

import "./style.scss";

const TypeBox = () => {
    const [targetText, setTargetText] = useState(
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.The battle of New Carthage, part of the Second Punic War, took place in early 209 BC when a Roman army under Publius Scipio (bust pictured) assaulted New Carthage, held by a Carthaginian garrison under Mago. Late in 210 BC Scipio took command of Roman forces in Iberia (modern Spain and Portugal) and decided to strike at the regional centre of Carthaginian power: its capital, New Carthage. He marched on the city and immediately attacked it. After defeating a Carthaginian force outside the walls, he pressed attacks on the east gate and the walls. Both were repulsed, but later that day Scipio renewed them. "
    );

    // Constants
    const lines = 5;
    const lineOffset = 3;

    // Vars
    const [targetWords, setTargetWords] = useState(targetText.split(" "));
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [typedWords, setTypedWords] = useState([""]);
    const [complete, setComplete] = useState(false);
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
        if (wordIndex > currentWordIndex) {
            return "char";
        } else if (wordIndex == currentWordIndex) {
            if (charIndex >= currentCharIndex) {
                return "char";
            }
        }

        if (char === typedWords[wordIndex][charIndex]) {
            return "char-correct";
        } else {
            return "char-incorrect";
        }
    };

    // Get junk text to display after the current word if the space isn't typed.
    const getJunkText = (word: string, wordIndex: number) => {
        if (typedWords[wordIndex] === undefined) return "";
        if (typedWords[wordIndex].length > word.length) {
            //console.log(typedWords[wordIndex].slice(word.length));
            return typedWords[wordIndex].slice(word.length);
        } else {
            return "";
        }
    };

    // All key down and type event logic
    const handleKeyDown = (event: react.KeyboardEvent<HTMLInputElement>) => {
        let code = event.key.charCodeAt(0);
        let key = event.key;

        let newTypedWords: string[];

        switch (key) {
            case "Backspace":
                // Delete the letter from the current word.
                newTypedWords = typedWords.map((word, index) => {
                    if (index === currentWordIndex) {
                        return word.slice(0, -1);
                    } else {
                        return word;
                    }
                });
                setTypedWords(newTypedWords);

                // Delete the last word if we're at the beginning of the current word.
                if (currentCharIndex > 0) {
                    setCurrentCharIndex(currentCharIndex - 1);
                } else if (currentWordIndex > 0) {
                    setCurrentWordIndex(currentWordIndex - 1);
                    setCurrentCharIndex(
                        typedWords[currentWordIndex - 1].length
                    );
                    newTypedWords = typedWords.slice(0, -1);
                    setTypedWords(newTypedWords);
                }

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
                // If we're at the first letter of the word
                if (currentCharIndex == 0) {
                    break;
                }

                if (complete) {
                    break;
                }

                // Go to the next word.
                setCurrentWordIndex(currentWordIndex + 1);
                setCurrentCharIndex(0);
                newTypedWords = typedWords.concat("");
                setTypedWords(newTypedWords);

                break;
            default:
                if (complete) {
                    break;
                }

                // Add the letter to the current word.
                newTypedWords = typedWords.map((word, index) => {
                    if (index === currentWordIndex) {
                        setCurrentCharIndex(currentCharIndex + 1);
                        return word.concat(key);
                    } else {
                        return word;
                    }
                });
                setTypedWords(newTypedWords);

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

        let typeboxChar =
            typeboxWords[currentWordIndex].children[currentCharIndex];

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

    // Initialize variable styles of typebox
    const initializeTypebox = () => {
        let typebox = typeboxRef.current!;
        let wordRefRect = wordRef.current!.getBoundingClientRect();

        typebox.style.height = wordRefRect.height * lines + "px";

        // typebox.style.marginTop = wordRefRect.height + "px";
        // typebox.style.marginBottom = wordRefRect.height + "px";

        setTextHeight(wordRefRect.height);
    };

    // Scroll the div to the current line.
    const scrollText = () => {
        let typebox = typeboxRef.current!;
        let caret = caretRef.current!;

        typebox.scrollTo({
            top: textHeight * (lineCount - lineOffset + 1),
            behavior: "smooth",
        });

        console.log("scrolling to line " + lineCount);
    };

    // Refocus to input
    const refocus = () => {
        let input = inputRef.current!;
        input.focus();
    };

    // USE EFFECTS
    useEffect(() => {
        //moveCaret();
        initializeTypebox();
    }, []);

    // Run whenever the y position of the caret changes
    useEffect(() => {

        

        console.log(Math.round(caretPosition[1] / textHeight));
        //console.log(caretPosition[0] + " " + caretPosition[1]);
        setLineCount(Math.round(caretPosition[1] / textHeight));
    }, [caretPosition[1]]);

    useEffect(() => {


        if (Math.round(caretPosition[1] / textHeight) > lineOffset - 1) {
            scrollText();
        }
        
    }, [lineCount]);

    useEffect(() => {
        if (
            currentCharIndex == targetWords[currentWordIndex].length &&
            currentWordIndex == targetWords.length - 1
        ) {
            setComplete(true);
        }
    }, [currentCharIndex, currentWordIndex]);

    // Whenever the current character index changes
    useEffect(() => {
        moveCaret();
        //scrollText();
    }, [currentCharIndex]);

    // Whenever a character is typed
    useEffect(() => {
        // console.log(typedWords);
        // console.log(currentCharIndex);
    }, [typedWords]);

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

                    {targetWords.map((word, wordIndex) => {
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
