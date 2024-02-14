/**
 * Must change stars visually on hover but restore value on mouse out, and save it on click
 */

import { useState } from "react";
import "./StarsJoel.css";
import star_gray from "./star_gray.png";
import star_yellow from "./star_yellow.png";

const STARS_COUNT : number = 10;
const DEFAULT_VALUE : number = 0;

function range(start : number, end : number) : Array<number> {
    return " ".repeat(end - start + 1).split("").map((_ : string, i : number) => start + i);
}

function Star(props : {
    isLit : boolean,
    onMouseEnter : () => void,
    onMouseLeave : () => void,
    onClick : () => void,
}) {
    return (
        <img
            src={props.isLit ? star_yellow : star_gray}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            onClick={props.onClick}
            alt="star"
        />
    );
}

export default function StarsJoel() {
    const [valueHover, setValueHover] = useState(DEFAULT_VALUE);
    const [valueSaved, setValueSaved] = useState(DEFAULT_VALUE);

    function handleMouseEnter(idx : number) {
        setValueHover(idx + 1);
    }
    function handleMouseLeave(_idx : number) {
        setValueHover(valueSaved);
    }
    function handleClick(idx : number) {
        setValueSaved(idx + 1);
    }

    return (
        <div className="stars-container">
            {range(0, STARS_COUNT).map(idx => (
                <Star
                    key={idx}
                    isLit={valueHover > idx}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={() => handleMouseLeave(idx)}
                    onClick={() => handleClick(idx)}
                />
            ))}
        </div>
    )
}