import classes from "./DarkModeJoel.module.css";
import { nextTheme, useTheme } from "./ThemeContext";

export default function ThemeSwitchButton() {
    const {theme, setTheme} = useTheme();

    function handleSwitchModeClick() {
        setTheme(nextTheme(theme));
    }
    
    return (
        <button className={classes.button} onClick={handleSwitchModeClick}>
            Switch theme to: {nextTheme(theme)}
        </button>
    );
}