import react from "react";
import { useState, useEffect } from "react";

import './style.scss';

const TypeBox = () => {

    const [targetText, setTargetText] = useState(
        "This is the target text to type out."
    );
    const [targetTextArray, setTargetTextArray] = useState(targetText.split(""));
    const [targetTextState, setTargetTextState] = useState(targetTextArray.map((char, index) => {
        return {
            char: char,
            accepted: false,
        }
    }))

    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [typedText, setTypedText] = useState("");

    

    const [queue, setQueue] = useState("");

    const handleKeyDown = (event: react.KeyboardEvent<HTMLInputElement>) => {

        let code = event.key.charCodeAt(0);
        let key = event.key;

        switch (key) {
            case "Backspace":
                setTypedText(typedText.slice(0, typedText.length - 1));
                setCurrentCharIndex(currentCharIndex - 1);
                break;
            case "Enter":
                setTypedText("");
                break;
            case "Shift":
                setQueue("Shift");
                break;
            default:
                if (code >= 32 && code <= 126) {

                    if (queue === "Shift") {
                        key = key.toUpperCase();
                        setTypedText(typedText + key);
                        setQueue("");
                    } else {
                        setTypedText(typedText + key);
                    }
                    
                    if (key === targetText[currentCharIndex]) {
                        console.log("correct");
                    } else {
                        if (key === " ") {
                            setCurrentCharIndex(currentCharIndex - 1);
                        }
                    }
                    setCurrentCharIndex(currentCharIndex + 1);
                    
                }
        }
        
        // console.log("wow");
    };

    useEffect(() => {
        console.log(typedText);
    }, [typedText]);

    return (
        <>

            <div className="type-box" onKeyDown={handleKeyDown} tabIndex={0}>
                {targetText.split("").map((char, index) => {

                    if (index >= currentCharIndex) {
                        return (
                            <span key={index} className="char">
                                {char}
                            </span>
                        )
                    }

                    if (char === " " && typedText[currentCharIndex] != " ") {
                        return (
                            <span key={index} className="char-incorrect">
                                {typedText[index]}
                                {char}
                            </span>
                        )
                    }

                    if (typedText[index] === char) {
                        return (
                            <span key={index} className="char-correct">
                                {char}
                            </span>
                        )
                    } 
                    
                    if (typedText[index] !== char) {
                        return (
                            <span key={index} className="char-incorrect">
                                {char}
                            </span>
                        )
                    
                    }

                    
                })}

            </div>
        </>
    );
};

export default TypeBox;
