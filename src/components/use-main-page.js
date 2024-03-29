import { useGetTodo } from "./use-get";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export const useMainPage = () => {
  //ОСНОВНОЙ КОД
  // const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  const { todos, setTodos } = useGetTodo(isSorted);

  const addTodo = () => {
    fetch("http://localhost:3005/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        name: todoValue,
        isCompleted: false,
      }),
    })
      .then((rawResp) => rawResp.json())
      .then(() => {
        setTodos(todos);
      })
      .catch((error) => {
        console.log(error);
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
  const length = 10;

  const MainPage = () => (
    <div>
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
      <ul>
        {searchedTodo.map(({ id, name }) => (
          <div>
            <li key={id}>
              <NavLink to={`/task/${id}`}>
                {name.length > length ? name.substring(0, 10) + "..." : name}
              </NavLink>
            </li>
          </div>
        ))}
      </ul>
      <ul>
        {todos.map(({ id, name }) => (
          <div>
            <li key={id}>
              <NavLink to={`/task/${id}`}>
                {name.length > length ? name.substring(0, 10) + "..." : name}
              </NavLink>
            </li>
          </div>
        ))}
      </ul>

      <button onClick={() => setIsSorted(!isSorted)}>Фильтр</button>
    </div>
  );

  return { MainPage, isSorted };
};
