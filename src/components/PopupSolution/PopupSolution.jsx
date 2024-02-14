import { useState } from "react";
import "./PopupSolution.css";

function Popup({id, header, body, footer, onClose}) {
    return (
        <div id={id || 'Modal'} className="modal">
            <div className="modal-content">
                <div className="header">
                    <span className="close-modal-icon" onClick={onClose}>&times;</span>
                    <div>{header ? header : 'Header'}</div>
                </div>
                <div className="body">
                    {
                        body ? body :
                        <div>
                            <p>This is our modal body.</p>
                        </div>
                    }
                </div>
                <div className="footer">
                    {
                        footer ? footer :
                        <div>
                            <h2>This is our modal body.</h2>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default function PopupSolution() {
    const [showModalPopup, setShowModalPopup] = useState(false);

    function handleToggleModalPopup() {
        setShowModalPopup(!showModalPopup);
    }

    function onClose() {
        setShowModalPopup(false);
    }

    return (
        <div>
            <button onClick={handleToggleModalPopup}>Open modal popup</button>
            {
                showModalPopup && <Popup
                    header={<h1>Customized header</h1>}
                    body={<div>Customized body</div>}
                    footer={<h2>Customized footer</h2>}
                    onClose={onClose}
                />
            }
        </div>
    );
}