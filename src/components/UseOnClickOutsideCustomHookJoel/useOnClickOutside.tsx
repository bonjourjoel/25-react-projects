import { useEffect, useRef, useState } from "react";

export function useOnClickOutside<T extends HTMLElement>(isOpenedInit?: boolean)
:[React.RefObject<T>, boolean, () => void, () => void] {
    const elementRef = useRef<T>(null);
    const [isOpened, setIsOpened] = useState<boolean>(isOpenedInit ? isOpenedInit : false);

    useEffect(() => {
        function onClickListener(ev : MouseEvent) {
            const targetElement = ev.target as HTMLElement;
            if (elementRef.current != ev.target
                && ! elementRef.current?.contains(targetElement)
                && targetElement.parentElement != null
            ) {
                setIsOpened(false);
            }
        }
        document.addEventListener("click", onClickListener);

        return () => document.removeEventListener("click", onClickListener);
    }, []);

    function open() {
        setIsOpened(true);
    }

    function close() {
        setIsOpened(false);
    }

    return [elementRef, isOpened, open, close];
}