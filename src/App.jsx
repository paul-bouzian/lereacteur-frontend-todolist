import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import DisplayTasks from "./components/DisplayTasks";
import Header from "./components/Header";

function App() {
  // State to hold the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to hold the value of the new task being added
  const [newTask, setNewTask] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios
      .get("https://site--backend-todolist--dh6xg2c5vy8x.code.run/tasks")
      .then((response) => {
        setTasks(sortTasks(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
    console.log("Tasks: ", tasks);
  }, []);

  const sortTasks = (tasks) => {
    const completedTasks = tasks.filter((task) => task.completed);
    const incompletedTasks = tasks.filter((task) => !task.completed);

    return [...incompletedTasks, ...completedTasks];
  };

  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main
        className={`flex h-full flex-col items-center ${darkMode ? "bg-slate-900" : ""}`}
      >
        {/* Component to display the list of tasks */}
        <DisplayTasks
          tasks={tasks}
          setTasks={setTasks}
          darkMode={darkMode}
          sortTasks={sortTasks}
        />

        {/* Component to add a new task */}
        <AddTask
          newTask={newTask}
          setNewTask={setNewTask}
          tasks={tasks}
          setTasks={setTasks}
        />
      </main>
    </>
  );
}

export default App;
