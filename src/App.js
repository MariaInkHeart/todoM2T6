import { useEffect, useState } from "react";

export const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((loadedList) => loadedList.json())
      .then((loadedTodos) => {
        setTodos(loadedTodos);
      });
  }, []);

  return (
    <div className="wrapper">
      <h2 className="header">To-do-do-dos</h2>
      {todos.map(({ id, title }) => (
        <div key={id}>
          {id}.{title}
        </div>
      ))}
    </div>
  );
};

export default App;
