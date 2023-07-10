import {CSSProperties} from "react";

type Button = {
    handleStart?: () => void,
    buttonText: string;
    style: {
        div: CSSProperties,
        button: CSSProperties
    };
}

export function Button({handleStart, buttonText, style}: Button) {

    return (
        <div style={style.div}>
            <button style={style.button} onClick={handleStart}>
                {buttonText}
            </button>
        </div>
    );
}
