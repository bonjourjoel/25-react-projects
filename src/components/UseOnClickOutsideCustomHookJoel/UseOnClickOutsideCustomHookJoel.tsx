import css from "./UseOnClickOutsideCustomHookJoel.module.css";
import { useOnClickOutside } from "./useOnClickOutside";

export default function UseOnClickOutsideCustomHookJoel() {
    const [elementRef, isOpened, open, _close] = useOnClickOutside<HTMLParagraphElement>(true);

    function handleClick() {

    }

    return (
        <div className={css.container}>
            <p className={css.outside}>
                This is some text outside of the special paragraph.
            </p>
            <p className={css.outside}>
                This is some text outside of the special paragraph.
            </p>
            <p className={css.inside} ref={elementRef} onClick={handleClick}>
                { 
                    isOpened
                        ? "Please click outside of this to close this. It won't close if you click inside this content."
                        : <button onClick={open}>Show content</button>
                }
            </p>
            <p className={css.outside}>
                This is some text outside of the special paragraph.
            </p>
            <p className={css.outside}>
                This is some text outside of the special paragraph.
            </p>
        </div>
    );
}