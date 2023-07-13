import { useEffect, useState } from "react";

export const App = () => {
  //ОСНОВНОЙ КОД
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const refreshTodos = () => setRefresh(!refresh);
  const [todoValue, setTodoValue] = useState("");

  useEffect(() => {
    fetch("http://localhost:3005/todos")
      .then((loadedData) => loadedData.json())
      .then((loadedTodos) => {
        setTodos(loadedTodos);
      });
  }, [refresh]);

  const addTodo = () => {
    fetch("http://localhost:3005/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        name: todoValue,
      }),
    })
      .then((rawResp) => rawResp.json())
      .then((response) => {
        console.log("added", response);
        refreshTodos();
      });
  };

  const reqUpdate = () => {
    fetch("http://localhost:3005/todos/001", {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        name: "Выполнено",
      }),
    })
      .then((rawResp) => rawResp.json())
      .then((response) => {
        console.log("done update", response);
        refreshTodos();
      });
  };

  const deleteTodo = () => {
    fetch("http://localhost:3005/todos/001", {
      method: "DELETE",
    })
      .then((rawResp) => rawResp.json())
      .then((response) => {
        console.log("delete update", response);
        refreshTodos();
      });
  };

  //ПОИСК ДЕЛ
  const [searchTodo, setSearchTodo] = useState("");
  const [filteredTodos, setFilteredTodos] = useState(todos);

  const todoSearch = (event) => {
    setSearchTodo(event.target.value);
    refreshTodos();
  };

  useEffect(() => {
    setFilteredTodos((todos) => todos.filter.includes(searchTodo));
  }, [searchTodo]);

  // ФИЛЬТР
  const filterTodos = () => {
    //код фильтра
  };

  return (
    <div className="wrapper">
      <h2 className="header">To-do-do-dos</h2>
      <div className="add-line">
        <input
          className="add-input"
          variant="outlined"
          placeholder="Добавьте дело"
          onChange={(event) => {
            setTodoValue(event.target.value);
          }}
          value={todoValue}
        />
        <button onClick={addTodo}>Добавить</button>
      </div>
      <div className="search-line">
        <input
          className="search-input"
          variant="outlined"
          placeholder="SEARCH"
          onChange={todoSearch}
          value={searchTodo}
        />
        {/* {filteredTodos.map(({ id, name }) => (
          <div>
            <li key={id}>{name}</li>
            <button onClick={reqUpdate}>Отметить сделанным</button>
            <button onClick={deleteTodo}>Удалить</button>
          </div>
        ))} */}
        {/* <button>SEARCH</button> */}
      </div>
      <ul>
        {todos.map(({ id, name }) => (
          <div>
            <li key={id}>{name}</li>
            <button onClick={reqUpdate}>Отметить сделанным</button>
            <button onClick={deleteTodo}>Удалить</button>
          </div>
        ))}
      </ul>
      <button onClick={filterTodos}>Фильтр</button>
    </div>
  );
};

export default App;
