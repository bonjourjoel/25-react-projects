import { useEffect, useState } from "react";
import "./ImageSliderSolution.css";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs'

function ImageSlider({url, page=1, limit=5}) {
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchImages(getUrl) {
            try {
                setLoading(true);
                const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
                const data = await response.json();
                if (data) {
                    setLoading(false);
                    setImages(data);
                }
            } catch(e) {
                setLoading(false);
                setErrorMsg(e.message);
            }
        }
        if (url != '') fetchImages(url);
    }, [url, page, limit]);

    function handlePrevious() {
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    }

    function handleNext() {
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    }

    if (loading) {
        return <div>Loading data. Please wait.</div>
    }

    if (errorMsg != null) {
        return <div>Error occured: {errorMsg}</div>
    }

    return <div className="container">
        <BsArrowLeftCircleFill onClick={handlePrevious} className="arrow arrow-left" />
        {
            images && images.length ?
            images.map((imageItem, index) => 
                <img
                    key={imageItem.id}
                    src={imageItem.download_url}
                    alt={imageItem.download_url}
                    className={currentSlide === index ? "current-image" : "current-image hide-current-image"}
                />
            )
            : null
        }
        <BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right" />
        <span className="circle-indicators">
        {
            images && images.length ?
            images.map((_, index) => <button
                key={index}
                className={currentSlide === index ? "current-indicator" : "current-indicator inactive-indicator"}
                onClick={() => setCurrentSlide(index)}
            ></button>
            )
            : null
        }
        </span>
    </div>;
}

export default function ImageSliderSolution() {
    return <ImageSlider
        url={'https://picsum.photos/v2/list'}
        page={1}
        limit={10}
    />;
}
