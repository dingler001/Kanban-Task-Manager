import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

function Board() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  function handleDragEnd(result) {

    if (!result.destination) return

    const taskId = Number(result.draggableId)
    const newStatus = result.destination.droppableId

    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

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

  const columnStyle = {
    background: "#e6e6e6",
    padding: "15px",
    width: "260px",
    borderRadius: "10px",
    minHeight: "320px",
    boxShadow: "0 0 10px rgba(255,255,255,0.5)",
    transition: "all 0.3s ease"
  }

  const cardStyle = {
    background: "white",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  }

  return (

    <DragDropContext onDragEnd={handleDragEnd}>

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
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }}
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

          {["todo", "progress", "done"].map((status, columnIndex) => (

            <Droppable droppableId={status} key={status}>
              {(provided) => (

                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={columnStyle}
                >

                  <h2
  style={{
    textAlign: "center",
    background: "#ffffff",
    padding: "8px",
    borderRadius: "6px",
    marginBottom: "10px",
    fontSize: "18px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
  }}
>
                    {status === "todo" && "📝 Todo"}
                    {status === "progress" && "⚡ In Progress"}
                    {status === "done" && "🎉 Done"}
                  </h2>

                  {tasks
                    .filter(task => task.status === status)
                    .map((task, index) => (

                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (

                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
  ...cardStyle,
  ...provided.draggableProps.style,
  transition: "transform 0.2s ease",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
}}
                          >

                            {task.title}

                            <div style={{ marginTop: "8px" }}>

                              <button onClick={() => editTask(task.id)}>
                                ✏ Edit
                              </button>{" "}

                              <button onClick={() => deleteTask(task.id)}>
                                🗑 Delete
                              </button>

                            </div>

                          </div>

                        )}
                      </Draggable>

                    ))}

                  {provided.placeholder}

                </div>

              )}
            </Droppable>

          ))}

        </div>

      </div>

    </DragDropContext>

  )
}

export default Board