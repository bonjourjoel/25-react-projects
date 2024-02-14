import { useRef } from "react";
import "./ScrollToSectionSolution.css";

export default function ScrollToSectionSolution() {
    const ref = useRef();

    const data = [
        {
            label: 'First card',
            style: {
                width: '100%',
                height: '600px',
                background: 'red',
            },
        },
        {
            label: 'Second card',
            style: {
                width: '100%',
                height: '600px',
                background: 'yellow',
            },
        },
        {
            label: 'Third card',
            style: {
                width: '100%',
                height: '600px',
                background: 'green',
            },
        },
        {
            label: 'Fourth card',
            style: {
                width: '100%',
                height: '600px',
                background: 'blue',
            },
        },
        {
            label: 'Fifth card',
            style: {
                width: '100%',
                height: '600px',
                background: 'orange',
            },
        },
    ];

    function handleScrollToSection() {
        let pos = ref.current.getBoundingClientRect().top;
        window.scrollTo({
            top: pos,
            behavior: 'smooth',
        });
    }

    return (
        <div>
            <h1>Scroll to a particular section</h1>
            <button onClick={handleScrollToSection}>Click to scroll</button>
            {
                data.map((dataItem, index) => (
                    <div ref={index == 3 ? ref : null} key={dataItem.label} style={dataItem.style}>
                        <h3>{dataItem.label}</h3>
                    </div>
                ))
            }
        </div>
    );
}