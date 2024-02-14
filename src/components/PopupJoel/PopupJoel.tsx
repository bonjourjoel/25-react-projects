import { PopupContextProvider } from "./PopupContext";
import PopupApp from "./PopupApp";

export default function PopupJoel() {
    
    return (
        <PopupContextProvider>
            <PopupApp />
        </PopupContextProvider>
    );
}