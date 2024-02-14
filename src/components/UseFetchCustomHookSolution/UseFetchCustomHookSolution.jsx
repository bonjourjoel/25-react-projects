import useFetch from "./useFetch";

export default function UseFetchCustomHookSolution() {
    const {data, error, pending} = useFetch("https://dummyjson.com/products");

    return (
        <div>
            <h1>Use fetch hook</h1>
            {
                pending ? <h3>Pending ! Please wait.</h3> : null
            }
            {
                error ? <h3>Error</h3> : null
            }
            {
                data && data.products && data.products.length ?
                data.products.map(productItem => <p key={productItem.id}>{productItem.title}</p>)
                : null
            }
        </div>
    );
}