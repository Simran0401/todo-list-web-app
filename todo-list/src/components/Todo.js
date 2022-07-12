import React, { useState, useEffect } from "react";
import todoImage from "../images/todo.png";
import "../App.css";

//getting items from local storage after page reload
const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editedItem, setEditedItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("Field data required");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((item) => {
          if (item.id === editedItem) {
            return { ...item, name: inputData };
          }
          return item;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setEditedItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => {
      return id !== item.id; //filters and returns all the items except the deleted one
    });
    setItems(updatedItems);
  };

  const editItem = (id) => {
    let newlyEditedItem = items.find((item) => {
      return item.id === id;
    });
    setToggleSubmit(false);
    setInputData(newlyEditedItem.name);
    setEditedItem(id);
  };

  const removeAll = () => {
    setItems([]);
  };

  //adding items to the local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

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
            {toggleSubmit ? (
              <i className="fa fa-plus" title="Add Item" onClick={addItem}></i>
            ) : (
              <i
                className="far fa-edit"
                title="Update Item"
                onClick={addItem}
              ></i>
            )}
          </div>

          <div className="showItems">
            {items.map((item) => {
              return (
                <div className="eachItem" key={item.id}>
                  <h3>{item.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit"
                      title="Edit Item"
                      onClick={() => editItem(item.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt"
                      title="Delete Item"
                      onClick={() => deleteItem(item.id)}
                    ></i>
                  </div>
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
