import { useEffect, useState } from "react";

export const useGetTodo = (isSorted) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!isSorted) {
      fetch("http://localhost:3005/todos")
        .then((loadedData) => loadedData.json())
        .then((loadedTodos) => {
          setTodos(loadedTodos);
        });
    } else {
      fetch("http://localhost:3005/todos?_sort=name&_order=asc")
        .then((filteredData) => filteredData.json())
        .then((filteredTodos) => {
          setTodos(filteredTodos);
        });
    }
  }, [isSorted]);

  return { todos, setTodos };
};
