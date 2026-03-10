import { useState, useEffect } from "react"

function Board() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  function addTask() {
    const title = prompt("Enter task name")

    if (!title) return

    const newTask = {
      id: Date.now(),
      title: title,
      status: "todo"
    }

    setTasks([...tasks, newTask])
  }

  function moveTask(id, newStatus) {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    )
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  function editTask(id) {
    const newTitle = prompt("Edit task name")

    if (!newTitle) return

    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    )
  }

  return (
    <div>

      {/* Add Task Button */}
      <button
  onClick={addTask}
  style={{
    padding: "14px 24px",
    fontSize: "17px",
    borderRadius: "10px",
    border: "none",
    background: "#4285F4",
    color: "white",
    cursor: "pointer",
    marginBottom: "40px",
    marginTop: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transition: "0.2s"
  }}
  onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
>
  ➕ Add Task
</button>

      {/* Board Layout */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          marginTop: "20px",
          alignItems: "flex-start"
          
        }}
      >

        {/* TODO COLUMN */}
        <div
          style={{
  background: "#e6e6e6",
  padding: "15px",
  width: "260px",
  borderRadius: "10px",
  minHeight: "320px",
  boxShadow: "0 0 10px rgba(255,255,255,0.5)",
  transition: "all 0.3s ease"
}}
onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 25px rgba(255,255,255,0.8)"}
onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 0 10px rgba(255,255,255,0.5)"}
        >
          <h2 style={{ textAlign: "center" }}>📝 Todo</h2>

          {tasks
            .filter(task => task.status === "todo")
            .map(task => (
              <div
                key={task.id}
                style={{
                  background: "white",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "6px",
                  border: "1px solid #ccc"
                }}
              >
                {task.title}

                <div style={{ marginTop: "8px" }}>
                  <button onClick={() => moveTask(task.id, "progress")}>🚀 Start</button>{" "}
                  <button onClick={() => editTask(task.id)}>✏ Edit</button>{" "}
                  <button onClick={() => deleteTask(task.id)}>🗑 Delete</button>
                </div>
              </div>
            ))}
        </div>

        {/* IN PROGRESS COLUMN */}
        <div
         style={{
  background: "#e6e6e6",
  padding: "15px",
  width: "260px",
  borderRadius: "10px",
  minHeight: "320px",
  boxShadow: "0 0 10px rgba(255,255,255,0.5)",
  transition: "all 0.3s ease"
}}
onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 25px rgba(255,255,255,0.8)"}
onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 0 10px rgba(255,255,255,0.5)"}
        >
          <h2 style={{ textAlign: "center" }}>⚡ In Progress</h2>

          {tasks
            .filter(task => task.status === "progress")
            .map(task => (
              <div
                key={task.id}
                style={{
                  background: "white",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "6px",
                  border: "1px solid #ccc"
                }}
              >
                {task.title}

                <div style={{ marginTop: "8px" }}>
                  <button onClick={() => moveTask(task.id, "done")}>✅ Complete</button>{" "}
                  <button onClick={() => editTask(task.id)}>✏ Edit</button>{" "}
                  <button onClick={() => deleteTask(task.id)}>🗑 Delete</button>
                </div>
              </div>
            ))}
        </div>

        {/* DONE COLUMN */}
        <div
          style={{
  background: "#e6e6e6",
  padding: "15px",
  width: "260px",
  borderRadius: "10px",
  minHeight: "320px",
  boxShadow: "0 0 10px rgba(255,255,255,0.5)",
  transition: "all 0.3s ease"
}}
onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 25px rgba(255,255,255,0.8)"}
onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 0 10px rgba(255,255,255,0.5)"}
        >
          <h2 style={{ textAlign: "center" }}>🎉 Done</h2>

          {tasks
            .filter(task => task.status === "done")
            .map(task => (
              <div
                key={task.id}
                style={{
                  background: "white",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "6px",
                  border: "1px solid #ccc"
                }}
              >
                {task.title}

                <div style={{ marginTop: "8px" }}>
                  <button onClick={() => editTask(task.id)}>✏ Edit</button>{" "}
                  <button onClick={() => deleteTask(task.id)}>🗑 Delete</button>
                </div>
              </div>
            ))}
        </div>

      </div>
    </div>
  )
}

export default Board