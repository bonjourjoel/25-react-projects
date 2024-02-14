import { usePopup } from "./PopupContext";

export default function PopupApp() {
    const {openPopup} = usePopup();

    function handleOpenPopupClick() {
        openPopup({
            header: <h1>Customized header</h1>,
            body: <div>Customized body</div>,
            footer: <h4>Customized footer</h4>,
        });
    }

    return (
        <>
            <br/>
            <br/>
            <button onClick={handleOpenPopupClick}>Open popup</button>
        </>
    );
}