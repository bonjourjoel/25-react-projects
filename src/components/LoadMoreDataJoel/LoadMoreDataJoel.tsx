/**
 * Load more data component
 */

import { useEffect, useState } from "react";
import classes from "./LoadMoreDataJoel.module.css";

/**
 * Types definition
 */

type product = {
    id: number;
    title: string;
    imageUrl: string;
}

/**
 * Product card
 */

function ProductCard(props : {
    product: product,
}) {
    return (
        <div className={classes.productCard}>
            <img
                className={classes.productCardImage}
                src={props.product.imageUrl}
                alt={props.product.title}
            />
            <div className={classes.productCardTitle}>
                {props.product.title}
            </div>
        </div>
    );
}

/**
 * Load more data component
 */

function LoadMoreData(props : {
    dataUrl: string,
    skipInit: number,
    pageSize: number,
    maxItems: number,
}) {
    // declare states
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [requestedProductsLength, setRequestedProductsLength] = useState(props.pageSize);
    const [products, setProducts] = useState<product[]>([]);

    // load data
    useEffect(() => {
        if (requestedProductsLength > products.length) {
            try {
                (async () => {
                    const url : string = `${props.dataUrl}?skip=${products.length}&limit=${requestedProductsLength - products.length}`;
                    const response : Response = await fetch(url);
                    const jsonProductsList : any = await response.json();
                    setProducts([
                        ...products,
                        ...jsonProductsList.products.map((jsonProduct: any) => ({
                            id: jsonProduct.id,
                            title: jsonProduct.title,
                            imageUrl: jsonProduct.thumbnail,
                        })
                    )]);
                })();
            } catch (error: any) {
                setErrorMessage(`Data loading error: ${error.message}`);
            }
        }
    }, [props, requestedProductsLength, products]);

    // handle error
    if (errorMessage != null) {
        return <div>{errorMessage}</div>;
    }

    // render component
    return (
        <div className={classes.container}>
            <div className={classes.table}>
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
            <button
                className={classes.btnLoadMore}
                disabled={products.length >= props.maxItems}
                onClick={() => setRequestedProductsLength(Math.min(requestedProductsLength + props.pageSize, props.maxItems))}
            >
                {products.length >= props.maxItems
                    ? `Reached maximum of ${props.maxItems} products`
                    : "Load more data"
                }
            </button>
        </div>
    );
}

/**
 * Test component
 */

export default function LoadMoreDataJoel() {
    return <LoadMoreData
                dataUrl="https://dummyjson.com/products"
                skipInit={0}
                pageSize={3}
                maxItems={10}
            />
}