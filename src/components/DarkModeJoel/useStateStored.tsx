import { useEffect, useState } from "react";

/**
 * Custom hook: Use state PLUS local storage memory
 */

export default function useStateStored<T>(keyName : string, valueInit : T) : [T, (t : T | ((t : T) => T)) => void] {
    // read default from local storage
    let strValueStored : string | null = null;
    try {
        strValueStored = localStorage.getItem(keyName);
    } catch (error) {
        console.log(error);
    }
    const defaultValue : T = strValueStored != null
        ? JSON.parse(strValueStored)
        : valueInit;

    // create state
    const [value, setValue] = useState<T>(defaultValue);
    
    // setter side-effect to write into local storage
    useEffect(() => {
        try {
            localStorage.setItem(keyName, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    }, [keyName, value]);

    // override setter (NOTE: use side effect instead!)
    // const setValueStored : Dispatch<SetStateAction<T>> =
    //     (arg : T | ((prevValue : T) => T)) : void => {
    //         let newValue : T;
    //         if (typeof arg == "function") {
    //             const fun = arg as ((prevValue : T) => T);
    //             newValue = fun(value);
    //         } else {
    //             newValue = arg;
    //         }
    //         setValue(newValue);
    //         try {
    //             localStorage.setItem(keyName, JSON.stringify(newValue));
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    // return state pair
    return [value, setValue];
}
