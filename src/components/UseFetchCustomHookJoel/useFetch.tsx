
/**
 * Load the url's data, optionally transform it, and return the triple react state variables:
 *     [data: T|null, isLoading: boolean, errorMessage: string|null]
 * Note: if the formatter is passed, it MUST be wrapped in useCallback()
 */

import { useEffect, useState } from "react";

export function useFetch<T>(getUrl : string, formatterWrappedInUseCallback?: (jsonData: any) => T) : [T | null, boolean, string | null] {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const response : Response = await fetch(getUrl);
                if (!response.ok) {
                    throw new Error(`Response status ${response.status}: ${response.statusText}`);
                }
                const jsonData : any = await response.json();
                if (! jsonData) {
                    throw new Error(`JSON parsing error "${getUrl}"`);
                } else if (formatterWrappedInUseCallback != null) {
                    const formattedData : T = formatterWrappedInUseCallback(jsonData);
                    setData(formattedData);
                } else {
                    setData(jsonData);
                }
                setErrorMessage(null);
            } catch (error: any) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [getUrl, formatterWrappedInUseCallback]);

    return [data, isLoading, errorMessage];
}