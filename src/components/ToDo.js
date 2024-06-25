import { useState } from "react";

function ToDo() {
  const [userInput, setUserInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('ALL');

  function handleUserInput(e) {
    const input = e.target.value;
    setUserInput(input);
  }

  function handleAddTasks() {
    const updatedTasks = [...tasks, { task: userInput, completed: false }]
    setTasks(updatedTasks);
    console.log(updatedTasks);
    setUserInput('');
  }

  function handleCheckBox(index) {
    const newTasks = tasks.map((item, i) => {
      return i === index ? { ...item, completed: !item.completed } : item
    });
    console.log(newTasks);
    setTasks(newTasks);
  }

  function handleFilterChange(filter) {
    setFilter(filter);
  }

  function handleFilteredTasks() {
    if (filter === "ACTIVE") {
      return tasks.filter(item => !item.completed)
    } else if (filter === "COMPLETED") {
      return tasks.filter(item => item.completed)
    }
    return tasks;  // ALL
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Write your task..."
          value={userInput}
          onChange={handleUserInput}
        />
        <button onClick={handleAddTasks}>Add</button>
      </div>

      <div>
        <button onClick={() => handleFilterChange("ALL")}>All</button>
        <button onClick={() => handleFilterChange("ACTIVE")}>Active</button>
        <button onClick={() => handleFilterChange("COMPLETED")}>Completed</button>
      </div>

      <div>
        {handleFilteredTasks().map((item, i) =>
          <div key={i}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleCheckBox(i)}
            />
            <span style={item.completed ? { textDecoration: "line-through" } : {}}>{item.task}</span>
          </div>
        )}
      </div>

    </div>
  )
}

export default ToDo;









/*
? The checked={task.completed} attribute inside the input element of type checkbox is used to control the checkbox's checked state based on the value of task.completed. This is an example of a controlled component in React, where the checkbox's state is determined by React state rather than the checkbox's own internal state.


! Controlled Components:

* In React, a controlled component is an input element whose value is controlled by the React state.This means that the state of the checkbox (checked property) is determined by the component's state (task.completed in this case).

!checked Attribute:

* The checked attribute of the input element is a boolean attribute.When checked={task.completed}, the checkbox will be checked if task.completed is true and unchecked if task.completed is false.Reflecting State Changes:

? When the state of task.completed changes, the checked attribute of the checkbox is updated automatically.

?This ensures that the UI is always in sync with the state.
*/

//! We are basically over-riding the completed property
/*
const task =
{
  task: "react",
  completed: false,
}


const newUser = { ...task, completed: !task.completed };
console.log(newUser);
*/



/*
! Currently, your filter buttons modify the tasks state directly, which removes todos permanently from the main list. Instead, you should maintain a separate state for the current filter and use it to determine which todos to display.

function handleAllButton() {
    console.log("clicked")
  }
  function handleActiveButton() {
    const activeTasks = tasks.filter((item) => (
      item.completed === false
    ))
    setTasks(activeTasks);
  }

  function handleCompletedButton() {
    const completedTasks = tasks.filter((item) => (
      item.completed === true
    ))
    setTasks(completedTasks);
  }
*/