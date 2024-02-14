/**
 * Image slider component
 */

import classes from "./ImageSliderJoel.module.css";
import { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import classNames from "classnames";

/**
 * Types definition
 */

interface Item {
    id: number;
    imageUrl: string;
}

/**
 * Arrow button
 */

function ArrowButton(props: {
    iconComponent: React.ElementType,
    positionClassName: string,
    enabled: boolean,
    onClick: () => void,
}) {
    return (
        <div
            className={classNames({
                [classes.arrow]: true,
                [props.positionClassName]: true,
                [classes.arrowDisabled]: !props.enabled,
            })}
            onClick={props.onClick}
        >
            <props.iconComponent className={classes.arrowIcon} />
        </div>
    );
}

/**
 * Scroll view
 */

function ScrollViewItem(props : {
    active: boolean,
    onClick: () => void,
}) {
    return (
        <div
            className={classNames({
                [classes.scrollviewItem]: true,
                [classes.scrollviewItemActive]: props.active,
            })}
            onClick={props.onClick}
        />
    );
}

function ScrollView(props: {
    currentItemIdx: number,
    itemsCount: number,
    onItemClick: (itemIdx : number) => void,
}) {
    return (
        <div className={classes.scrollview}>
            {[...Array(props.itemsCount)].map((_: any, idx: number) => (
                <ScrollViewItem
                    key={idx}
                    active={props.currentItemIdx == idx}
                    onClick={() => props.onItemClick(idx)}
                />
            ))}
        </div>
    );
}

/**
 * Image slider
 */

function ImageSlider(props : {
    width: number,
    height: number,
    imageListUrl: string,
    funFetchItemId: (item : any) => number,
    funFetchItemImageUrl: (item : any) => string,
}) {
    // declare states
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [currentItemIdx, setCurrentItemIdx] = useState(0);
    const [items, setItems] = useState<Item[]>([]);

    // fetch data
    const {imageListUrl, funFetchItemId, funFetchItemImageUrl} = props;
    useEffect(() => {
        (async function loadData() {
            setIsLoading(true);
            try {
                const response : Response = await fetch(imageListUrl);
                const jsonList : any[] = await response.json();
                const items : Item[] = jsonList.map((jsonListItem : any) => ({
                    id: funFetchItemId(jsonListItem),
                    imageUrl: funFetchItemImageUrl(jsonListItem),
                }));
                setItems(items);
            } catch (error: any) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [imageListUrl, funFetchItemId, funFetchItemImageUrl]);

    // render special states
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (errorMessage != null) {
        return <div>Error: {errorMessage}</div>;
    }

    // render component
    return (
        <div
            className={classes.container}
            style={{
                width: `${props.width}px`,
                height: `${props.height}px`,
            }}
        >
            {items.length > 0 &&
                <img
                    className={classes.image}
                    src={items[currentItemIdx].imageUrl}
                />}
            <ArrowButton
                iconComponent={BsArrowLeft}
                positionClassName={classes.arrowLeft}
                enabled={items.length > 0 && currentItemIdx > 0}
                onClick={() => setCurrentItemIdx(currentItemIdx - 1)}
            />
            <ArrowButton
                iconComponent={BsArrowRight}
                positionClassName={classes.arrowRight}
                enabled={items.length > 0 && currentItemIdx < items.length - 1}
                onClick={() => setCurrentItemIdx(currentItemIdx + 1)}
            />
            <ScrollView
                currentItemIdx={currentItemIdx}
                itemsCount={items.length}
                onItemClick={(itemIdx: number) => setCurrentItemIdx(itemIdx)}
            />
        </div>
    );
}

/**
 * Default call
 */

export default function ImageSliderJoel() {
    return <ImageSlider
        width={500}
        height={333}
        imageListUrl={'https://picsum.photos/v2/list?page=1&limit=10'}
        funFetchItemId={(item : any) => parseInt(item.id)}
        funFetchItemImageUrl={(item : any) => item.download_url}
    />
}
