import react from "react";
import { useState, useEffect, useRef } from "react";

import "./style.scss";

const TypeBox = () => {
    const [targetText, setTargetText] = useState(
        "This is the target text to type out."
    );

    // Vars
    const [targetWords, setTargetWords] = useState(targetText.split(" "));
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [typedWords, setTypedWords] = useState([""]);

    // Refs
    const caretRef = useRef<HTMLDivElement>(null);
    const typeboxRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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
            console.log(typedWords[wordIndex].slice(word.length));
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

                // If we're complete with the entire text don't do anything.
                if (typedWords.length == targetText.length && currentCharIndex == typedWords[currentWordIndex].length) {
                    break;
                }

                // Go to the next word.
                setCurrentWordIndex(currentWordIndex + 1);
                setCurrentCharIndex(0);
                newTypedWords = typedWords.concat("");
                console.log(newTypedWords);
                setTypedWords(newTypedWords);

                break;
            default:

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
        //console.log(currentCharRect.right);
        caret.style.left = currentCharRect.left + "px";
        caret.style.top = currentCharRect.top + "px";
        caret.style.height = currentCharRect.height + "px";
        //caret.style.left = "100px";
    };

    // Refocus to input
    
    const refocus = () => {
        let input = inputRef.current!;
        input.focus();
    };

    // USE EFFECTS
    useEffect(() => {}, []);

    useEffect(() => {
        moveCaret();
    }, [currentCharIndex]);

    useEffect(() => {
        // console.log(typedWords);
        // console.log(currentCharIndex);
    }, [typedWords]);


    return (
        <>
            <input onKeyDown={handleKeyDown} ref={inputRef}></input>

            <div
                className="type-box"
                ref={typeboxRef}
                onClick={() => refocus()}
            >
                <div className="caret" ref={caretRef}></div>

                {targetWords.map((word, wordIndex) => {
                    let junkText = getJunkText(word, wordIndex);

                    return (
                        <span key={wordIndex}>
                            {word.split("").map((char, charIndex) => {
                                let className = getCharClass(
                                    char,
                                    charIndex,
                                    wordIndex
                                );

                                return (
                                    <span key={charIndex} className={className}>
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
        </>
    );
};

export default TypeBox;
