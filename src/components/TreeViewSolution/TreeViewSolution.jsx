import MenuList from "./MenuList";
import "./TreeViewSolution.css";
import menus from "./data";

function TreeView({menus = []}) {
    return <div className="tree-view-container">
        <MenuList list={menus} />
    </div>;
}

export default function TreeViewSolution() {
    return <TreeView menus={menus} />;
}