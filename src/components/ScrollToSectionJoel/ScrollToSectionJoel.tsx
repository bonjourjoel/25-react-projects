import { ChangeEvent, useRef, useState } from "react";
import css from "./ScrollToSectionJoel.module.css";

const COLORS = [
  "pink",
  "green",
  "blue",
  "yellow",
  "red",
];

export default function ScrollToSectionJoel() {
    const [selectedSection, setSelectedSection] = useState('');
    const sectionsRefMap = useRef(new Map<string|undefined, HTMLElement|null>());

    function setRef(element: HTMLElement|null) {
        if (element) {
            sectionsRefMap.current.set(element.id, element);
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
                {COLORS.map(color => (
                    <option key={color} value={color}>section {color}</option>
                ))}
            </select>
            {COLORS.map(color => (
              <div id={color} ref={setRef} className={css.section} style={{backgroundColor: color}}>
                <p>&gt; Section {color} &lt;</p>
                <p><button onClick={handleScrollToTop}>Back to top</button></p>
              </div>
            ))}
        </>
    );
}