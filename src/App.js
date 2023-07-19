import { useEffect, useState } from "react";
import {
  ref,
  onValue,
  push,
  set,
  remove,
  query,
  orderByValue,
} from "firebase/database";
import { db } from "./firebase";

export const App = () => {
  //ОСНОВНОЙ КОД
  const [todos, setTodos] = useState({});
  // const [refresh, setRefresh] = useState(false);
  // const refreshTodos = () => setRefresh(!refresh);
  const [todoValue, setTodoValue] = useState("");

  useEffect(() => {
    const todoDbRef = ref(db, "todos");
    return onValue(todoDbRef, (snapshot) => {
      const loadedTodos = snapshot.val() || {};
      console.log(loadedTodos);
      setTodos(loadedTodos);
    });
  }, []);

  const addTodo = () => {
    const pushDbRef = ref(db, "todos");
    push(pushDbRef, {
      name: todoValue,
    }).then((response) => {
      console.log("added", response);
    });
  };

  const reqUpdate = (id) => {
    const updateDbRef = ref(db, `todos/${id}`);

    set(updateDbRef, {
      name: "Выполнено",
    }).then((response) => {
      console.log("done update", response);
    });
  };

  const deleteTodo = (id) => {
    const deleteDbRef = ref(db, `todos/${id}`);

    remove(deleteDbRef).then((response) => {
      console.log("delete update", response);
    });
  };

  //ПОИСК ДЕЛ
  const [searchedTodoValue, setSearchedTodoValue] = useState("");
  const [searchedTodo, setSearchedTodo] = useState({});

  const todoSearch = useEffect((searchedTodoValue) => {
    const searchDbRef = ref(db, `${searchedTodoValue}`);
    return onValue(searchDbRef, (snapshot) => {
      const searchTodo = snapshot.val() || {};
      setSearchedTodo(searchTodo);
    });
  }, []);

  // ФИЛЬТР
  // const [isTouched, setIsTouched] = useState(false);

  const filterTodos = useEffect(() => {
    const filterDbRef = ref(db, "todos");
    const qFilter = query(filterDbRef, orderByValue("name"));

    return onValue(qFilter, (snapshot) => {
      const filteredTodos = snapshot.val() || {};
      setTodos(filteredTodos);
    });
    // .finally(() => setIsTouched(true));
  }, []);

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
      <ul>
        {Object.entries(searchedTodo).map(([id, { name }]) => (
          <div>
            <li key={id}>{name}</li>
            <button onClick={reqUpdate}>Отметить сделанным</button>
            <button onClick={deleteTodo}>Удалить</button>
          </div>
        ))}
      </ul>
      <ul>
        {Object.entries(todos).map(([id, { name }]) => (
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
