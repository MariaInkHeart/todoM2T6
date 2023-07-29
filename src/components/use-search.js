import { useState, useEffect } from "react";

export const useSearch = (searchedTodoValue) => {
  const [searchedTodo, setSearchedTodo] = useState([]);

  const todoSearch = useEffect(() => {
    fetch(`http://localhost:3005/todos?name=${searchedTodoValue}`)
      .then((searchedData) => searchedData.json())
      .then((searchedTodos) => {
        setSearchedTodo(searchedTodos);
      });
  }, [searchedTodoValue]);

  return { searchedTodo, todoSearch };
};
