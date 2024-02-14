import classes from "./DarkModeJoel.module.css";
import classNames from "classnames";
import { THEME, useTheme } from "./ThemeContext";
import ThemedLabel from "./ThemedLabel";
import ThemeSwitchButton from "./ThemeSwitchButton";

export default function ThemedApp() {
    const {theme} = useTheme();

    return (
        <div className={classNames(
            classes.container,
            {
                [classes.lightMode]: theme == THEME.LIGHT,
                [classes.darkMode]: theme == THEME.DARK,
            }
        )}>
            <div>In "ThemedApp": Theme={theme}</div>
            <ThemedLabel/>
            <ThemeSwitchButton/>
        </div>
    );
}