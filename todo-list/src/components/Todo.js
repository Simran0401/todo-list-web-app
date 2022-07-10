import React from "react";
import todoImage from "../images/todo.png";

const Todo = () => {
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todoImage} alt="todoLogo" />
          </figure>
        </div>
      </div>
    </>
  );
};

export default Todo;
