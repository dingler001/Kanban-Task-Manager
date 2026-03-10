import Board from "./components/Board"

function App() {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      background: "#f0f2f5",
      minHeight: "100vh",
      padding: "30px"
    }}>
      
      <h1 style={{
        textAlign: "center",
        marginBottom: "30px"
      }}>
        Kanban Task Manager
      </h1>

      <Board />

    </div>
  )
}

export default App