import { useEffect, useState } from "react";
import "./ScrollIndicatorSolution.css";

function ScrollIndicator({url}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        async function fetchData(getUrl) {
            try {
                setLoading(true);
                const response = await fetch(getUrl);
                const responseData = await response.json();

                if (responseData && responseData.products && responseData.products.length > 0) {
                    setData(responseData.products);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setErrorMessage(error.message);
            }
        }
        fetchData(url);
    }, [url]);

    useEffect(() => {
        function handleScrollPercentage() {
            const howMuchScrolled = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setScrollPercentage(howMuchScrolled / height * 100);
        }
        window.addEventListener("scroll", handleScrollPercentage);

        return () => {
            window.removeEventListener("scroll", () => {}); // NOTE: bug
        }
    }, []);

    if (loading) {
        return <div>Loading please wait</div>
    }
    if (errorMessage) {
        return <div>Error {errorMessage}</div>
    }

    return (
        <div>
            <div className="top-container">
                <h1>Custom scroll indicator</h1>
                <div className="scroll-progress-tracking-container">
                    <div className="current-progress-bar" style={{width: `${scrollPercentage}%`}}>
                    </div>
                </div>
            </div>
            <div className="data-container">
                {
                    data && data.length > 0 ?
                    data.map(dataItem => <p key={dataItem.id}>{dataItem.title}</p>)
                    :null
                }
            </div>
        </div>
    );
}

export default function ScrollIndicatorSolution() {
    return (
        <ScrollIndicator url="https://dummyjson.com/products?limit=100"/>
    );
}