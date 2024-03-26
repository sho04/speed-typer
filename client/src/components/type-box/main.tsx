import react from "react";
import { useState, useEffect } from "react";

import "./style.scss";

const TypeBox = () => {
    const [targetText, setTargetText] = useState(
        "This is the target text to type out."
    );

    const [targetWords, setTargetWords] = useState(targetText.split(" "));
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    const [typedWords, setTypedWords] = useState([""]);

    const [queue, setQueue] = useState("");

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

        return "char";
    };

    const getJunkText = (word: string, wordIndex: number) => {
        if (typedWords[wordIndex] === undefined) return "";
        if (typedWords[wordIndex].length > word.length) {
            console.log(typedWords[wordIndex].slice(word.length));
            return typedWords[wordIndex].slice(word.length);
        } else {
            return "";
        }
    };

    const handleKeyDown = (event: react.KeyboardEvent<HTMLInputElement>) => {
        let code = event.key.charCodeAt(0);
        let key = event.key;

        let newTypedWords: string[];

        switch (key) {
            case "Backspace":
                newTypedWords = typedWords.map((word, index) => {
                    if (index === currentWordIndex) {
                        return word.slice(0, -1);
                    } else {
                        return word;
                    }
                });
                setTypedWords(newTypedWords);

                if (currentCharIndex > 0) {
                    setCurrentCharIndex(currentCharIndex - 1);
                } else if (currentWordIndex > 0) {
                    setCurrentWordIndex(currentWordIndex - 1);
                    setCurrentCharIndex(typedWords[currentWordIndex - 1].length);
                }

                break;
            case "Shift":
                break;
            case " ":
                if (currentCharIndex == 0) {
                    break;
                }

                setCurrentWordIndex(currentWordIndex + 1);
                setCurrentCharIndex(0);
                newTypedWords = typedWords.concat("");
                setTypedWords(newTypedWords);

                break;
            default:
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

    useEffect(() => {
        console.log(typedWords);
    }, [typedWords]);


    return (
        <>
            <div className="type-box" onKeyDown={handleKeyDown} tabIndex={0}>
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

                            <span>&nbsp;</span>
                        </span>
                    );
                })}
            </div>
        </>
    );
};

export default TypeBox;
