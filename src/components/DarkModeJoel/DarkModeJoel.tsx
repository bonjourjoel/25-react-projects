import { ThemeContextProvider } from "./ThemeContext";
import ThemedApp from "./ThemedApp";

export default function DarkModeJoel() {
    return (
        <ThemeContextProvider>
            <ThemedApp/>
        </ThemeContextProvider>
    );
}