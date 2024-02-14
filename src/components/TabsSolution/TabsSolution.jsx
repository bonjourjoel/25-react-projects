import { useState } from "react";
import "./TabsSolution.css";

function Tabs({tabsContent, onChange}) {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    function handleClick(getCurrentIndex) {
        setCurrentTabIndex(getCurrentIndex);
        onChange(getCurrentIndex);
    }

    return (
        <div className="wrapper">
            <div className="heading">
                {
                    tabsContent.map((tabItem, index) => (
                        <div className={`tab-item ${currentTabIndex == index ? 'active' : ''}`} key={tabItem.label} onClick={() => handleClick(index)}>
                            <span className="label">{tabItem.label}</span>
                        </div>
                    ))
                }
            </div>
            <div className="content" style={{color: 'red'}}>
                {
                    tabsContent[currentTabIndex] && tabsContent[currentTabIndex].content
                }
            </div>
        </div>
    );
}

function RandomComponent() {
    return <h1>Some random content.</h1>;
}

export default function TabsSolution() {
    const tabs = [
        {
            label: 'Tab 1',
            content: <div>This is content for tab 1.</div>,
        },
        {
            label: 'Tab 2',
            content: <div>This is content for tab 2.</div>,
        },
        {
            label: 'Tab 3',
            content: <RandomComponent />,
        },
    ];

    function handleChange(currentTabIndex) {
    }

    return <Tabs tabsContent={tabs} onChange={handleChange}/>;
}