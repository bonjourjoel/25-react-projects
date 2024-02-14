import "./LoadMoreDataSolution.css";
import { useEffect, useState } from "react";

function LoadMoreData() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disableButton, setDisableButton] = useState(false);

    // note joel: prevData => doesn't work in a useEffect in strict mode
    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`);
                const result = await response.json();
                if (result && result.products && result.products.length) {
                    setProducts(prevData => [...prevData, ...result.products]);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchProducts()
    }, [count]);

    // note joel: the instructor is mistaken to use useEffect; he should compute this variable directly
    useEffect(() => {
        if (products && products.length === 100) setDisableButton(true);
      }, [products]);
    
    if (loading) {
        return <div>Loading data. Please wait</div>;
    }

    return (
        <div className="load-more-container">
            <div className="product-container">
                {
                    products && products.length
                        ? products.map(item => (
                            <div key={item.id} className="product">
                                <img
                                    src={item.thumbnail}
                                    alt={item.title} />
                                <p>{item.title}</p>
                            </div>
                        ))
                    : null
                }
            </div>
            <div className="button-container">
                <button disabled={disableButton} onClick={() => setCount(count + 1)}>
                    Load More Products
                </button>
                {disableButton ? <p>You have reached to 100 products</p> : null}
            </div>
        </div>
    );
}

export default function LoadMoreDataSolution() {
    return <LoadMoreData />
}