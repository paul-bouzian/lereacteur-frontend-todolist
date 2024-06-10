import axios from "axios";
import { useState } from "react";

function DisplayTasks({ tasks, setTasks, darkMode, sortTasks }) {
  const [search, setSearch] = useState("");

  return (
    <div className="m-14 flex flex-col items-center">
      <input
        type="text"
        value={search}
        placeholder="Search tasks..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="mb-6 w-full rounded border border-indigo-600 bg-slate-100 p-3"
      />
      <ul className="flex flex-col gap-4">
        {tasks.map(
          (task, index) =>
            task.text.toLowerCase().includes(search.toLowerCase()) && (
              <li key={index} className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => {
                    axios
                      .put(
                        `https://site--backend-todolist--dh6xg2c5vy8x.code.run/tasks/${task.text}`,
                        {
                          completed: e.target.checked,
                        },
                      )
                      .then((response) => {
                        console.log("Task updated: ", response.data);
                        setTasks(sortTasks(response.data));
                      })
                      .catch((error) => {
                        console.error("Error updating task: ", error);
                      });
                  }}
                />
                <span
                  className={`text-lg ${task.completed ? "line-through" : ""} ${darkMode ? "text-white" : ""}`}
                >
                  {task.text}
                </span>
                <i
                  className="fa-solid fa-trash text-indigo-600 hover:cursor-pointer hover:text-indigo-500"
                  onClick={() => {
                    axios
                      .delete(
                        `https://site--backend-todolist--dh6xg2c5vy8x.code.run/tasks/${task.text}`,
                      )
                      .then((response) => {
                        console.log("Task deleted: ", response.data);
                        setTasks(sortTasks(response.data));
                      })
                      .catch((error) => {
                        console.error("Error deleting task: ", error);
                      });
                  }}
                ></i>
              </li>
            ),
        )}
      </ul>
    </div>
  );
}

export default DisplayTasks;
