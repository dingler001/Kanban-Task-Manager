import Board from "./components/Board"

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1446776877081-d282a0f896e2')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          border: "4px solid white",
          borderRadius: "15px",
          padding: "20px",
          width: "fit-content",
          margin: "0 auto 50px auto",
          background: "rgba(0,0,0,0.6)",
          color: "white",
        }}
      >
        <h1
  style={{
    padding: "10px 25px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(5px)",
    display: "inline-block",
    boxShadow: "0 0 20px #ffffff, 0 0 40px #6ea8ff"
  }}
>
   Kanban Task Manager
</h1>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Board />
      </div>
    </div>
  )
}

export default App