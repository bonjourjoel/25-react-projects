import "./DarkModeSolution.css";
import useLocalStorage from "./useLocalStorage";

export default function DarkModeSolution() {
    const [theme, setTheme] = useLocalStorage('theme', 'dark')

    function handleToggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <div className="light-dark-mode" data-theme={theme}>
            <div className="container">
                <p>Hello world !</p>
                <button onClick={handleToggleTheme}>Change theme</button>
            </div>
        </div>
    );
}