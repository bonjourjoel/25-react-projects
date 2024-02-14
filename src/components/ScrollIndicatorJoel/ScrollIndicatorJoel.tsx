import { useEffect, useState } from "react";
import classes from "./ScrollIndicatorJoel.module.css";

const LOREM_IPSUM : string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const REPEAT_COUNT : number = 50;

// https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript
function getScrollPercent() {
    const h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

export default function ScrollIndicatorJoel() {
    const [scrollYPercent, setScrollYPercent] = useState(0);
    useEffect(() => {
        const handleScroll = (_ev : Event) => {
            setScrollYPercent(getScrollPercent());
        };
        document.addEventListener("scroll", handleScroll);

        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className={classes.scrollIndicator}>
                <div
                    className={classes.thumb}
                    style={{
                        width: `${scrollYPercent}%`,
                    }}
                />
            </div>
            {[...Array(REPEAT_COUNT)].map((_: any, i: number) => (
                <div key={i}>{LOREM_IPSUM}</div>
            ))}
        </>
    );
}