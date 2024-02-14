import { useState } from "react";
import "./AccordionJoel.css";

type dataItem = {
    id: number,
    title: string;
    text: string;
};

const DATA : Array<dataItem> = [1,2,3,4,5].map(i => ({
    id: i,
    title: `Item ${i}`,
    text: `This is Item ${i}. `.repeat(5),
}));

function Item(props : {
    dataItem: dataItem,
    isOpened: boolean,
    onClick: () => void,
}) {
    return (
        <div className="accordeon-item-container">
            <div className="accordeon-item-title-row">
                <span className="accordeon-item-title-caption">
                    {props.dataItem.title}
                </span>
                <button className="accordeon-item-title-togglebutton" onClick={props.onClick}>
                    {props.isOpened ? "-" : "+"}
                </button>
            </div>
            {props.isOpened && (
                <div className="accordeon-item-text">
                    {props.dataItem.text}
                </div>
            )}
        </div>
    );
}

function AccordionJoel() {
    const [onlyOneOpenedMax, setOnlyOneOpenedMax] = useState(false);
    const [openedItemsIds, setOpenedItemsIds] = useState<Array<number>>([]);

    return (
        <>
            <div className="accordeon-options">
                <label>
                    <input
                        type="checkbox"
                        checked={onlyOneOpenedMax}
                        onChange={e => {
                            const newOnlyOneOpenedMax : boolean = e.target.checked;
                            setOnlyOneOpenedMax(newOnlyOneOpenedMax);
                            if (newOnlyOneOpenedMax && openedItemsIds.length > 1) {
                                setOpenedItemsIds([openedItemsIds[0]]);
                            }
                        }}
                    />
                    Only one opened max
                </label>
            </div>
            <div className="accordeon-container">
                {DATA.map(dataItem => (
                    <Item
                        key={dataItem.id}
                        dataItem={dataItem}
                        isOpened={openedItemsIds.includes(dataItem.id)}
                        onClick={() => {
                            const newOpenedItemsIds : Array<number> = onlyOneOpenedMax ? [] : [...openedItemsIds];
                            if (openedItemsIds.includes(dataItem.id)) {
                                setOpenedItemsIds(newOpenedItemsIds.filter(i => i != dataItem.id));
                            } else {
                                setOpenedItemsIds([...newOpenedItemsIds, dataItem.id]);
                            }
                        }}
                    />
                ))}
            </div>
        </>
    );
}

export default AccordionJoel;