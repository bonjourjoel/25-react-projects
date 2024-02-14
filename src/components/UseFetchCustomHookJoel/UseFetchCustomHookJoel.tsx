import { useCallback } from "react";
import { useFetch } from "./useFetch";

export default function UseFetchCustomHookJoel() {
    const [productsTitles, isLoading, errorMessage] = useFetch(
        "https://dummyjson.com/products",
        useCallback((productsJson: any):string[] => productsJson.products.map((productJson: any) => productJson.title), []),
    );

    return (
        <div>
            <div>
                <strong>isLoading:</strong> {isLoading.toString()}
            </div>
            <div>
                <strong>errorMessage:</strong> {errorMessage != null ? errorMessage : "null"}
            </div>
            <div>
                <strong>Products:</strong>
                {productsTitles?.map((productTitle: string, index: number) => <p key={index}>{productTitle}</p>)}
            </div>
        </div>
    );
}