/**
 * Exercice component: Generate random colors, and format them using HEX or RGB notation.
 */

import { useState } from "react";
import "./GenerateRandomColorJoel.css";

/**
 * Types definition
 */

enum COLOR_TYPE {
    HEX = "HEX",
    RGB = "RGB",
}

/**
 * React component
 */

function GenerateRandomColorJoel() {
    // states
    const [colorType, setColorType] = useState<COLOR_TYPE>(COLOR_TYPE.RGB);
    const [color, setColor] = useState<[number, number, number]>([255, 255, 255]);

    // events handlers
    function handleTypeChange(e : React.ChangeEvent<HTMLInputElement>) {
        setColorType(e.target.value as COLOR_TYPE);
    }

    function handleGenerateRandomColorClick() {
        const rndInt255 = () => Math.floor(Math.random() * 256);
        setColor([ rndInt255(), rndInt255(), rndInt255()]);
    }

    // format color as string notation hex or rgb
    function formatColor(arrColor : [number, number, number]) : string {
        let strColor : string;
        switch (colorType) {
            case COLOR_TYPE.HEX:
                strColor = arrColor
                           .map(i => i.toString(16))
                           .map(str => (str.length < 2 ? "0" : "") + str)
                           .join("")
                           .toUpperCase();
                strColor = `#${strColor}`;
                break;
            case COLOR_TYPE.RGB:
                strColor = arrColor
                           .map(i => i.toString())
                           .join(", ");
                strColor = `RGB(${strColor})`;
                break;
        }
        return strColor;
    }
    const strColor = formatColor(color);

    // render component
    return (
        <>
            <div
                className="rndcolor-container"
                style={{backgroundColor: strColor}}
            >
                <div className="rndcolor-controls-container">
                    {
                        Object.keys(COLOR_TYPE).map((colorTypeKey : string) => (
                            <label key={colorTypeKey}>
                                <input
                                    type="radio"
                                    value={colorTypeKey}
                                    checked={colorType == colorTypeKey}
                                    onChange={handleTypeChange}
                                />
                                {colorTypeKey}
                            </label>
                        ))
                    }
                    <button onClick={handleGenerateRandomColorClick}>
                        Generate random color
                    </button>
                </div>
                <div className="rndcolor-label">
                    type = {colorType}
                </div>
                <div className="rndcolor-label">
                    {strColor}
                </div>
            </div>
        </>
    );
}

export default GenerateRandomColorJoel;