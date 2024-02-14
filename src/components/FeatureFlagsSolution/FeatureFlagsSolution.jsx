
import { useContext } from "react";
import AccordionSolution from "../AccordionSolution/AccordionSolution";
import DarkModeSolution from "../DarkModeSolution/DarkModeSolution";
import GenerateRandomColorSolution from "../GenerateRandomColorSolution/GenerateRandomColorSolution";
import TicTacToeSolution from "../TicTacToeSolution/TicTacToeSolution";
import TreeViewSolution from "../TreeViewSolution/TreeViewSolution";
import "./FeatureFlagsSolution.css";
import FeatureFlagGlobalState, { FeatureFlagsContext } from "./context";

function FeatureFlags() {
    const {loading, enabledFlags} = useContext(FeatureFlagsContext);

    const componentsToRender = [
        { key: 'showLightAndDarkMode', component: <DarkModeSolution/>},
        { key: 'showTicTacToeBoard', component: <TicTacToeSolution/>},
        { key: 'showRandomColorGenerator', component: <GenerateRandomColorSolution/>},
        { key: 'showAccordion', component: <AccordionSolution/>},
        { key: 'showTreeView', component: <TreeViewSolution/>},
    ];

    function checkEnabledFlags(getCurrentKey) {
        return enabledFlags[getCurrentKey];
    }

    if (loading) {
        return <h1>Loading data. Please wait.</h1>
    }

    return (
        <div>
            <h1>Feature flags</h1>
            {
                componentsToRender.map(componentItem => checkEnabledFlags(componentItem.key) ? componentItem.component : null)
            }
        </div>
    );
}

export default function FeatureFlagsSolution() {
    return (
        <FeatureFlagGlobalState>
            <FeatureFlags/>
        </FeatureFlagGlobalState>
    );
}