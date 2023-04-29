import React, { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

//  get local storage function for not only setting items but also getting

const getlocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  //  console.log(JSON.parse(lists));
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getlocalData());
  const [isEditItem, setIsEditItem] = useState("")
  const [toggleButton, setToggleButton] = useState(false)

  const addItem = () => {
    if (!inputData) {
      alert("please fill somethhing");
    }
    else if(inputData &&  toggleButton ) {
      setItems(
        items.map((curElem) => {
          if(curElem.id === isEditItem) {
            return {...curElem , name : inputData}
          }
          return curElem
        })
      )
      setInputData([])
      setIsEditItem(null)
      setToggleButton(false)
    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  // editing the items 
  const editItem = (index) => {
    const todo_items_ = items.find((curElem) => {
      return (curElem.id === index)
    })
    setInputData(todo_items_.name)
    setIsEditItem(index)
    setToggleButton(true)
  }

  // deleting todos by clicking trash button

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  //  for removing all items

  const removeAll = () => {
    setItems([]);
  };
  // adding local storage usiing useeffect
  useEffect(() => {
    // if(items.length)
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main">
        <br />
        <h1>TODO'S</h1>
        <div className="add-item">
          <input
            type="text"
            placeholder= "   📝   Add Items here"
            value={inputData}
            onChange={(event) => setInputData(event.target.value)}
          />
          {toggleButton ? <FontAwesomeIcon
            icon={faEdit}
            className="plus-btn"
            style={{color:"black" , height:"1.4em" }}
            onClick={addItem}
          ></FontAwesomeIcon> : <FontAwesomeIcon
            icon={faPlus}
            className="plus-btn"
            onClick={addItem}
          />
          }
        </div>
        <div className="showItem">
          {items.map((curElem) => {
            return (
              <div className="eachItem" key={curElem.id}>
                <h3>{curElem.name}</h3>

                <div className="todo-btn">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="edit"
                    onClick={() => editItem(curElem.id)}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className="trash"
                    icon={faTrash}
                    onClick={() => deleteItem(curElem.id)}
                  ></FontAwesomeIcon>
                </div>
              </div>
            );
          })}
        </div>

        <div className="btn">
          <button className="checklist-btn" onClick={() => removeAll()}>
            <span>CHECKLIST</span>{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
