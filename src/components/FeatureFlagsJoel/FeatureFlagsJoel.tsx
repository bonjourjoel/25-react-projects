import AccordionJoel from "../AccordionJoel/AccordionJoel";
import AutocompleteJoel from "../AutocompleteJoel/AutocompleteJoel";
import TicTacToeJoel from "../TicTacToeJoel/TicTacToeJoel";
import ScrollIndicatorJoel from "../ScrollIndicatorJoel/ScrollIndicatorJoel";
import DarkModeJoel from "../DarkModeJoel/DarkModeJoel";
import { FeatureFlagsContextProvider, useFeatureFlagsContext } from "./FeatureFlagsContext";
import PopupJoel from "../PopupJoel/PopupJoel";
// import css from "./FeatureFlagsJoel.module.css";

function FeatureFlagsForm() {
    const {flags, setFlags} = useFeatureFlagsContext();

    function handleFlagChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFlags({
            ...flags,
            [e.target.name]: e.target.checked,
        });
    }

    return (
        <div>
        <div>
            Please select the features to simulate a features API response:
        </div>
        <div>
            {Object.keys(flags).map(key => (
                <label key={key}>
                    <input type="checkbox" name={key} checked={(flags as any)[key]} onChange={handleFlagChange}/>
                    {key}
                </label>
            ))}
        </div>
    </div>
)
}

function FeatureFlagsApp() {
    const {flags} = useFeatureFlagsContext();

    return (
        <div>
            {flags.hasAutoComplete && <><AutocompleteJoel /><hr/></>}
            {flags.hasAccordion && <><AccordionJoel /><hr/></>}
            {flags.hasPopup && <><PopupJoel /><hr/></>}
            {flags.hasDarkMode && <><DarkModeJoel /><hr/></>}
            {flags.hasTicTacToe && <><TicTacToeJoel /><hr/></>}
            {flags.hasScrollIndicator && <><ScrollIndicatorJoel /><hr/></>}
        </div>
    );
}

export default function FeatureFlagsJoel() {
    return (
        <FeatureFlagsContextProvider>
            <FeatureFlagsForm/>
            <hr/>
            <FeatureFlagsApp/>
        </FeatureFlagsContextProvider>
    );
}