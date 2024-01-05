import React from "react";
import "../../css/listGroup.css";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            (index === 0 && !selectedItem) || item === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
