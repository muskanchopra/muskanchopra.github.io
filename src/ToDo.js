import React, { useState } from 'react'
import './App.css';

const ToDo = () => {

    const [toDoInput, setToDoInput] = useState();
    const [toDoListName, setToDoListName] = useState();
    const [finalToDoList, setFinalToDoList] = useState([]);

    const toDolistInputHandler = (event) => {
        setToDoListName(event.target.value)
    }
    const toDoInputHandler = (event) => {
        setToDoInput(event.target.value);
    }
    const toDoSumbitHandler = (event) => {
        event.preventDefault();
        console.log(toDoInput);
        let fetchToDoArray;
        let tempArr = [];
        const fetchToDo = localStorage.getItem(toDoListName);
        if(fetchToDo){
            fetchToDoArray = fetchToDo.split(',');
            console.log("Before fetchToDoArray: ", fetchToDoArray)
            fetchToDoArray.push(toDoInput);
            console.log("After fetchToDoArray: ", fetchToDoArray)
            localStorage.setItem(toDoListName, fetchToDoArray);
            setFinalToDoList(fetchToDoArray);
        } else{
            tempArr.push(toDoInput);
            localStorage.setItem(toDoListName, tempArr);
            setFinalToDoList(tempArr);
        }
        console.log(tempArr);
        console.log("finalTodolist: ", finalToDoList)
    }

    const deleteToDoHandler = (index) => {
        console.log('INdex', index);
        let fetchToDoArray;
        const fetchToDo = localStorage.getItem(toDoListName);
        fetchToDoArray = fetchToDo.split(',');
        fetchToDoArray.splice(index, 1);
        setFinalToDoList(fetchToDoArray);
        localStorage.setItem(toDoListName, fetchToDoArray);
    }
    return (
        <div className='App'>
            <h1 style={{textAlign: 'center'}}>Welcome to ToDoList App Using React</h1>
            <form className="form">
                <input type="text" placeholder='Name of your todo list....' onChange={toDolistInputHandler}/>
                <input type="text" placeholder='Add ToDo Activity Here....' onChange={toDoInputHandler}/>
                <button onClick={toDoSumbitHandler}>save ToDoList</button>
            </form>
            {(finalToDoList.length>0) &&
            <div>
            <h2>{toDoListName}</h2>
             <ul className='todo_items'>
                {finalToDoList.map((item, index) => {
                   return(
                     <li style={{marginBottom: '12px'}} key={index}>
                      {item}
                      <button className='delete-button' onClick={() => deleteToDoHandler(index)}>Delete</button>
                     </li>
                   )
                 })} 
               </ul>
               </div>
            }
        </div>
    )
}

export default ToDo;