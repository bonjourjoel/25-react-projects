import { useState } from "react";
import classes from "./TabsJoel.module.css";
import classNames from "classnames";

function Tabs(props : {
    tabsDef: Array<{
        id: number,
        tabLabel: string,
        tabContent: React.JSX.Element,
    }>,
}) {
    const [selectedTab, setSelectedTab] = useState(props.tabsDef[0]);

    return (
        <div className={classes.container}>
            <h1>Tabs</h1>
            <div className={classes.tabsHeadersRow}>
                {props.tabsDef.map(tabDef => (
                    <span
                        key={tabDef.id}
                        className={classNames(
                            classes.tabHeader,
                            {
                                [classes.selected]: tabDef.id == selectedTab.id,
                            }
                        )}
                        onClick={() => setSelectedTab(tabDef)}
                    >
                        {tabDef.tabLabel}
                    </span>
                ))}
            </div>
            {selectedTab.tabContent}
        </div>
    );
}

export default function TabsJoel() {
    return <Tabs tabsDef={[
        {
            id: 0,
            tabLabel: 'Tab 1',
            tabContent: <div>This is the content for tab 1.</div>
        },
        {
            id: 1,
            tabLabel: 'Tab 2',
            tabContent: <div>This is the content for tab 2.</div>
        },
        {
            id: 2,
            tabLabel: 'Tab 3',
            tabContent: <div>This is the content for tab 3.</div>
        },
    ]} />;
}