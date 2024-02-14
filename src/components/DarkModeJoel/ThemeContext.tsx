/* eslint-disable react-refresh/only-export-components */

import { Dispatch, SetStateAction, createContext, useContext } from "react";
import useStateStored from "./useStateStored";

/**
 * Types definition
 */

export enum THEME {
    LIGHT = "LIGHT",
    DARK = "DARK",
}

const THEME_DEFAULT = THEME.LIGHT;

export function nextTheme(theme: THEME) {
    return theme == THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
}

/**
 * Create context statically
 */

const initialState: {
    theme: THEME,
    setTheme: Dispatch<SetStateAction<THEME>>,
} = {
    theme: THEME_DEFAULT,
    setTheme: () => {},
};
const ThemeContext = createContext<typeof initialState | null>(null);

/**
 * Context provider
 */

export function ThemeContextProvider(props: {
    children : React.JSX.Element[],
}) {
    // create state
    const [theme, setTheme] = useStateStored<THEME>("#THEME", THEME_DEFAULT);

    // create context provider
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    );
}

/**
 * Custom hook: get/set theme context
 */

export function useTheme() {
    const themeContext = useContext(ThemeContext);
    if (themeContext == null) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return themeContext;
}