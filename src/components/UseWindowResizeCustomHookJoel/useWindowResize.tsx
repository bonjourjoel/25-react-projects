import { useEffect, useState } from "react";

export function useWindowResize() {
    const [width, setWidth] = useState<number>();
    const [height, setHeight] = useState<number>();

    useEffect(() => {
        function resizeListener(_ev: Event) {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }
        window.addEventListener("resize", resizeListener);
        resizeListener(null as any);

        return () => window.removeEventListener("resize", resizeListener);
    }, []);

    return [width, height];
}