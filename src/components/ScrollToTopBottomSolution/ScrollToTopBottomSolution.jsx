import { useRef } from "react";
import useFetch from "../UseFetchCustomHookSolution/useFetch";

export default function ScrollToTopBottomSolution() {
    const {data, error, pending} = useFetch("https://dummyjson.com/products?limit=100");
    const bottomRef = useRef(null);

    function handleScrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }

    function handleScrollToBottom() {
        bottomRef.current.scrollIntoView({
            behavior: 'smooth',
        });
    }

    if (pending) {
        return <h1>Loading please wait</h1>
    }
    if (error) {
        return <h1>Error: {error}</h1>
    }

    return (
        <div>
            <h1>Scroll to top and bottom feature</h1>
            <h3>This is the top section</h3>
            <button onClick={handleScrollToBottom}>Scroll to bottom</button>
            <ul style={{listStyle: 'none'}}>
                {
                    data && data.products && data.products.length ?
                    data.products.map(item => <li key={item.id}>{item.title}</li>)
                    : null
                }
            </ul>
            <button onClick={handleScrollToTop}>Scroll to top</button>
            <div ref={bottomRef}></div>
            <h3>This is the bottom of the page</h3>
        </div>
    );
}