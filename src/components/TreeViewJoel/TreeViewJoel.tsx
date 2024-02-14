
/**
 * Tree view component
 */

import { useState } from "react";
import classes from "./TreeViewJoel.module.css";

/**
 * Types definition
 */

type tree<T> = {
    item: T;
    children: tree<T>[];
}

type menuItem = {
    id: number;
    name: string;
}

type menuTree = tree<menuItem>;

/**
 * Tree view component
 */

function TreeView(props: {
    // Component typing here doesn't work because of vsc/typescript bug https://github.com/chakra-ui/chakra-ui/issues/7459
    // nodeItemComponent: React.ElementType<{
    //     prefixElement: React.ReactElement | null,
    //     menuItem: menuItem,
    //     childrenLength: number,
    //     onClick: () => void,
    // }>,
    nodeItemComponent: React.ElementType,
    indentLevel: number,
    menuTree: menuTree,
}) {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div className={classes.treeNodeContainer}>
            {props.indentLevel > 0 &&
            <props.nodeItemComponent
                prefixElement={props.menuTree.children.length > 0 ? <span>{isOpened ? "-" : "+"}&nbsp;</span> : null}
                menuItem={props.menuTree.item}
                childrenLength={props.menuTree.children.length}
                onClick={() => setIsOpened(!isOpened)}
            />}
            {(props.indentLevel == 0 || isOpened) && <div
                className={classes.nodeChildrenContainer}
                style={{
                    marginLeft: `${props.indentLevel * 20}px`,
                }}
            >
                {props.menuTree.children.map(childMenuTree => (
                    <TreeView
                        key={childMenuTree.item.id}
                        nodeItemComponent={props.nodeItemComponent}
                        indentLevel={props.indentLevel + 1}
                        menuTree={childMenuTree}
                    />
                ))}
            </div>}
        </div>
    );
}

function NodeMenuItem(props: {
    prefixElement: React.ReactElement | null,
    menuItem: menuItem,
    childrenLength: number,
    onClick: () => void,
}) {
    return (
        <div
            className={classes.nodeItemContainer}
            onClick={props.onClick}
        >
            {props.prefixElement != null && props.prefixElement}
            {props.menuItem.name}
        </div>
);
}

/**
 * Test
 */

export default function TreeViewJoel() {
    let seqId: number = 0;
    return <TreeView
        nodeItemComponent={NodeMenuItem}
        indentLevel={0}
        menuTree={{
            item: {id: seqId++, name: 'root'},
            children: [
                {
                    item: {id: seqId++, name: 'home'},
                    children: [],
                },
                {
                    item: {id: seqId++, name: 'food'},
                    children: [
                        {
                            item: {id: seqId++, name: 'fruit'},
                            children: [
                                {
                                    item: {id: seqId++, name: 'apple'},
                                    children: [],
                                },
                                {
                                    item: {id: seqId++, name: 'orange'},
                                    children: [
                                        
                                    ],
                                },
                            ],
                        },
                        {
                            item: {id: seqId++, name: 'veggie'},
                            children: [
                                {
                                    item: {id: seqId++, name: 'potatoe'},
                                    children: [],
                                },
                            ],
                        },
                        {
                            item: {id: seqId++, name: 'meat'},
                            children: [
                                {
                                    item: {id: seqId++, name: 'chicken'},
                                    children: [],
                                },
                                {
                                    item: {id: seqId++, name: 'pork'},
                                    children: [
                                        
                                    ],
                                },
                                {
                                    item: {id: seqId++, name: 'beef'},
                                    children: [
                                        
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    item: {id: seqId++, name: 'place'},
                    children: [
                        {
                            item: {id: seqId++, name: 'kitchen'},
                            children: [
                                
                            ],
                        },
                    ],
                },
            ],
        }}
    />
}