import axios from "axios";

function AddTask({ newTask, setNewTask, tasks, setTasks }) {
  // Function to create a new task
  const createTask = async () => {
    if (newTask.trim() === "") {
      alert("Please enter a task.");
      return;
    }
    // Send a POST request to the API to create a new task
    await axios
      .post("https://site--backend-todolist--dh6xg2c5vy8x.code.run/tasks", {
        text: newTask,
        completed: false,
      })
      .then((response) => {
        console.log("Task created: ", response.data);
        // Update the tasks state with the new task
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error creating task: ", error);
      });
    // Clear the input field
    setNewTask("");
  };

  return (
    <div className="mt-14 flex w-2/3 flex-col justify-center gap-10 sm:flex-row">
      <input
        type="text"
        placeholder="Add a task..."
        className="flex-auto rounded border border-indigo-600 bg-slate-100 p-3"
        value={newTask}
        // Update the new task state on input change
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        className="flex-none rounded bg-indigo-600 p-3 text-white hover:bg-indigo-500 active:bg-indigo-300"
        // Call the createTask function on button click
        onClick={createTask}
      >
        Add Task
      </button>
    </div>
  );
}

export default AddTask;
