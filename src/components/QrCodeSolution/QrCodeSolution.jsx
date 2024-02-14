/**
 * npm i react-qr-code
 */

import QRCode from "react-qr-code";
import "./QrCodeSolution.css";
import { useState } from "react";

export default function QrCodeSolution() {
    const [qrCode, setQrCode] = useState('');
    const [input, setInput] = useState('');

    function handleGenerateQrCode() {
        setQrCode(input);
        setInput('');
    }    

    return (
        <div>
            <h1>QR code generator</h1>
            <div>
                <input value={input} onChange={(e) => setInput(e.target.value)} type="text" name="qr-code" placeholder="Enter your value here" />
                <button disabled={input && input.trim() !== '' ? false : true} onClick={handleGenerateQrCode}>Generate</button>
            </div>
            <div>
                <QRCode
                    id="qr-code-value"
                    value={qrCode}
                    size={400}
                    bgColor="white"
                />
            </div>
        </div>
    );
}