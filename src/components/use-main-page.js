import { useGetTodo } from "./use-get";
import { useAddTodo } from "./use-addTodo";
import { useSearch } from "./use-search";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const useMainPage = () => {
  //ОСНОВНОЙ КОД
  // const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  const { todos, setTodos } = useGetTodo(isSorted);
  const { addTodo } = useAddTodo(todoValue, setTodos, todos);

  //ПОИСК ДЕЛ
  const [searchedTodoValue, setSearchedTodoValue] = useState("");

  const { searchedTodo, todoSearch } = useSearch(searchedTodoValue);

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
              <NavLink to={`/task/${id}`}>{name}</NavLink>
            </li>
          </div>
        ))}
      </ul>
      <ul>
        {todos.map(({ id, name }) => (
          <div>
            <li key={id}>
              <NavLink to={`/task/${id}`}>{name}</NavLink>
            </li>
          </div>
        ))}
      </ul>

      <button onClick={() => setIsSorted(!isSorted)}>Фильтр</button>
    </div>
  );

  return { MainPage, isSorted };
};
