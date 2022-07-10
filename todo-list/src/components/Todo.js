import React, { useState } from "react";
import todoImage from "../images/todo.png";
import "../App.css";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (inputData) {
      setItems([...items, inputData]);
      setInputData("");
    }
  };

  const deleteItem = (deletedId) => {
    const updatedItems = items.filter((item, idx) => {
      return idx !== deletedId; //filters and returns all the items except the deleted one
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todoImage} alt="todoLogo" />
            <figcaption>Todo's 💓</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="Add your todo's here ..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <i className="fa fa-plus" title="Add Item" onClick={addItem}></i>
          </div>

          <div className="showItems">
            {items.map((item, idx) => {
              return (
                <div className="eachItem" key={idx}>
                  <h3>{item}</h3>
                  <i
                    className="far fa-trash-alt"
                    title="Delete Item"
                    onClick={() => deleteItem(idx)}
                  ></i>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECKLIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
