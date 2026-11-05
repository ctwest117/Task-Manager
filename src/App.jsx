import { useImperativeHandle, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    { task: "Finish this Project", completed: false, id: 0 },
  ]);

  let bigId = Math.max(0, ...tasks.map((task) => task.id)) + 1;

  const addTask = (tsk) => {
    const task = { task: tsk, completed: false, id: bigId++ };
    setTasks([...tasks, task]);
  };
  const delTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const clearTasks = () => {
    setTasks([]);
  };

  const toggleComplete = (id) => {
    const res = tasks.map((task) =>
      task.id === id
        ? { task: task.task, completed: !task.completed, id: task.id }
        : task,
    );
    setTasks(res);
  };

  return (
    <>
      <Header />
      <TaskInput addTask={addTask} tasks={tasks} />
      <TaskLIst
        tasks={tasks}
        delTask={delTask}
        toggleComplete={toggleComplete}
        clearTasks={clearTasks}
      />
      <Stats tasks={tasks} />
    </>
  );
}

function Header() {
  return (
    <header>
      <h1>Task Manager</h1>
    </header>
  );
}

function TaskInput({ addTask, tasks }) {
  const [input, setInput] = useState("");
  const [canSub, setCansub] = useState(true);

  const taskList = tasks.map((tsk) => tsk.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(input);
    setInput("");
    setCansub(true);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        name="addTask"
        value={input}
        onChange={(e) => {
          const inpt = e.target.value;
          setInput(inpt);
          if (inpt < 1 || taskList.includes(inpt)) {
            setCansub(true);
          } else {
            setCansub(false);
          }
        }}
        type="text"
        placeholder="Task"
      />
      <button type="submit" disabled={canSub}>
        Add
      </button>
    </form>
  );
}

function TaskLIst({ tasks, delTask, toggleComplete, clearTasks }) {
  const [sort, setSort] = useState("all");

  const sortBy = () => {
    switch (sort) {
      case "all":
        return tasks;
      case "byComplete":
        return tasks.filter((task) => task.completed);
      case "byUncomplete":
        return tasks.filter((task) => !task.completed);
    }
  };
  return (
    <>
      <div id="list-options">
        <select name="sort" id="sort" onChange={(e) => setSort(e.target.value)}>
          <option value="all">All</option>
          <option value="byComplete">Completed</option>
          <option value="byUncomplete">Incomplete</option>
        </select>
        <button onClick={() => clearTasks()}>Clear all</button>
      </div>
      <ul>
        {sortBy().map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            delTask={delTask}
            toggleComplete={toggleComplete}
          />
        ))}
      </ul>
    </>
  );
}

function TaskItem({ task, delTask, toggleComplete }) {
  return (
    <li
      id={task.id}
      onClick={(e) => !e.target.closest("button") && toggleComplete(task.id)}
      className={task.completed ? "complete" : "notcomplete"}
    >
      <p>{task.task}</p>
      <button onClick={() => delTask(task.id)}>delete</button>
    </li>
  );
}

function Stats({ tasks }) {
  const total = tasks.length;
  return (
    <div id="stats">
      <div id="total">{total} tasks</div>
      <div id="comp">
        completed: {tasks.filter((task) => task.completed).length}/{total}
      </div>
      <div id="uncomp">
        Incomplete: {tasks.filter((task) => !task.completed).length}
      </div>
    </div>
  );
}

export default App;
