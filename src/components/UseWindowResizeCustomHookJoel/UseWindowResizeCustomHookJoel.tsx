import { useWindowResize } from "./useWindowResize";

export default function UseWindowResizeCustomHookJoel() {
    const [width, height] = useWindowResize();

    return (
        <div>
            <p>Window width: {width}</p>
            <p>Window height: {height}</p>
        </div>
    );
}