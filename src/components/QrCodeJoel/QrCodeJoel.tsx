/**
 * QR code generator
 * uses https://github.com/soldair/node-qrcode
 *      npm install --save qrcode
 */

import { useRef, useState } from "react";
import classes from "./QrCodeJoel.module.css";
import QRCode from "qrcode";

export default function QrCodeJoel() {
    const [errorMessage, setErrorMessage] = useState<string | null | undefined>(null);
    const [value, setValue] = useState("");
    const [valueGenerated, setValueGenerated] = useState<string | null>(null);
    const refCanvas = useRef<HTMLCanvasElement>(null);

    function handleSubmit(e : React.MouseEvent<HTMLInputElement, MouseEvent>) {
        e.preventDefault();
        QRCode.toCanvas(
            refCanvas.current,
            value,
            {
                width: 400,
            },
            (error: Error | null | undefined) : void => {
                setErrorMessage(error?.message);
            }
        );
        setValueGenerated(value);
    }

    return (
        <div className={classes.container}>
            <h1>QR code generator</h1>
            <form className={classes.form}>
                <input
                    type="text"
                    placeholder="Enter your value here"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <input
                    type="submit"
                    value="Generate"
                    onClick={e => handleSubmit(e)}
                />
            </form>
            {errorMessage && <div>Error: {errorMessage}</div>}
            <canvas ref={refCanvas} />
            <div>{valueGenerated}</div>
        </div>
    );
}