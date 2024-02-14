import { useTheme } from "./ThemeContext";

export default function ThemedLabel() {
    const {theme} = useTheme();

    return (
        <div>
            In "ThemedLabel": Theme={theme}
        </div>
    );
}