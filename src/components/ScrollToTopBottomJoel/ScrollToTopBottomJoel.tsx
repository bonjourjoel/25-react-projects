import { useRef } from "react";

export default function ScrollToTopBottomJoel() {
    const refBtnTop = useRef<HTMLButtonElement>(null);
    const refBtnBottom = useRef<HTMLButtonElement>(null);

    function handleScrollToBottom() {
        refBtnBottom.current?.scrollIntoView({ behavior: "smooth" });
    }
    function handleScrollToTop() {
        refBtnTop.current?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <>
            <div>
                <button ref={refBtnTop} onClick={handleScrollToBottom}>Scroll to bottom</button>
            </div>
            <div>
                {Array(100).fill(null).map((_: any, index: number) => <p key={index}>This is line {index + 1}.</p>)}
            </div>
            <div>
                <button ref={refBtnBottom} id="bottom" onClick={handleScrollToTop}>Scroll to top</button>
            </div>
        </>
    );
}