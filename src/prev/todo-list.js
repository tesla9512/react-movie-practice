import { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (todo === "") {
      return;
    }
    setTodos((current) => [todo, ...current]);
    setTodo("");
  };
  useEffect(() => {
    console.log(todos);
  }, [todos]);
  const onClick = () => setTodos([]);
  return (
    <div>
      <h1>MY TODOS : {todos.length}</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={todo}
          type="text"
          placeholder="Write TODO..."
        />
        <button>Add TODO</button>
        <button onClick={onClick}>CLEAR</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
