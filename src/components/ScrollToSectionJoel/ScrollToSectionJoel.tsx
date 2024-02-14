import { ChangeEvent, useRef, useState } from "react";
import css from "./ScrollToSectionJoel.module.css";

export default function ScrollToSectionJoel() {
    const [selectedSection, setSelectedSection] = useState('');
    const sectionsRefMap = useRef(new Map<string|undefined, HTMLElement|null>());

    function setRef(element: HTMLElement|null) {
        if (element) {
            sectionsRefMap.current.set(element?.id, element);
        }
    }

    function handleSelectedSectionChange(sectionId :string) {
        const section : HTMLElement|null|undefined = sectionsRefMap.current.get(sectionId);
        section?.scrollIntoView({behavior: 'smooth'});
        setSelectedSection('');
    }

    function handleScrollToTop() {
        window.scrollTo({
            top:0,
            left: 0,
            behavior: 'smooth',
        });
    }

    return (
        <>
            <select
                value={selectedSection}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectedSectionChange(e.target.value)}
            >
                <option value="">Scroll to section...</option>
                {Array.from(sectionsRefMap.current.keys()).map(key => (
                    <option key={key} value={key}>section {key}</option>
                ))}
            </select>
            <div id="pink" ref={setRef} className={css.section} style={{backgroundColor: 'pink'}}>
                <p>&gt; Section pink &lt;</p>
                <p><button onClick={handleScrollToTop}>Back to top</button></p>
            </div>
            <div id="green" ref={setRef} className={css.section} style={{backgroundColor: 'green'}}>
                <p>&gt; Section green &lt;</p>
                <p><button onClick={handleScrollToTop}>Back to top</button></p>
            </div>
            <div id="blue" ref={setRef} className={css.section} style={{backgroundColor: 'blue'}}>
                <p>&gt; Section blue &lt;</p>
                <p><button onClick={handleScrollToTop}>Back to top</button></p>
            </div>
            <div id="yellow" ref={setRef} className={css.section} style={{backgroundColor: 'yellow'}}>
                <p>&gt; Section yellow &lt;</p>
                <p><button onClick={handleScrollToTop}>Back to top</button></p>
            </div>
            <div id="red" ref={setRef} className={css.section} style={{backgroundColor: 'red'}}>
                <p>&gt; Section red &lt;</p>
                <p><button onClick={handleScrollToTop}>Back to top</button></p>
            </div>
        </>
    );
}