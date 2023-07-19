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

  const reqUpdate = (id) => {
    fetch(`http://localhost:3005/todos/${id}`, {
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

  const deleteTodo = (id) => {
    fetch(`http://localhost:3005/todos/${id}`, {
      method: "DELETE",
    })
      .then((rawResp) => rawResp.json())
      .then((response) => {
        console.log("delete update", response);
        refreshTodos();
      });
  };

  //ПОИСК ДЕЛ
  const [searchedTodoValue, setSearchedTodoValue] = useState("");
  const [searchedTodo, setSearchedTodo] = useState([]);
  const todoSearch = useEffect(() => {
    fetch(`http://localhost:3005/todos?name=${searchedTodoValue}`)
      .then((searchedData) => searchedData.json())
      .then((searchedTodos) => {
        setSearchedTodo(searchedTodos);
      });
  }, [searchedTodoValue]);

  // ФИЛЬТР
  const [isTouched, setIsTouched] = useState(false);

  const filterTodos = useEffect(() => {
    fetch("http://localhost:3005/todos?_sort=name&_order=asc")
      .then((filteredData) => filteredData.json())
      .then((filteredTodos) => {
        setTodos(filteredTodos);
      })
      .finally(() => setIsTouched(true));
  }, [refresh]);

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
          onChange={(event) => {
            setSearchedTodoValue(event.target.value);
          }}
          value={searchedTodoValue}
        />
        <button onClick={todoSearch}>ПОИСК</button>
      </div>
      {[!isTouched] ? (
        <ul>
          {todos.map(({ id, name }) => (
            <div>
              <li key={id}>{name}</li>
              <button onClick={reqUpdate}>Отметить сделанным</button>
              <button onClick={deleteTodo}>Удалить</button>
            </div>
          ))}
        </ul>
      ) : (
        <ul>
          {searchedTodo.map(({ id, name }) => (
            <div>
              <li key={id}>{name}</li>
              <button onClick={reqUpdate(id)}>Отметить сделанным</button>
              <button onClick={deleteTodo(id)}>Удалить</button>
            </div>
          ))}
        </ul>
      )}

      <button onClick={filterTodos}>Фильтр</button>
    </div>
  );
};

export default App;
