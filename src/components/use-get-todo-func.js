import { useState } from "react";

export const useGetTodoFunc = () => {
  const [gotTodo, setGotTodo] = useState({});

  const getTodoFunc = (id) => {
    fetch(`http://localhost:3005/todos/${id}`)
      .then((gotTodoData) => gotTodoData.json())
      .then((gotTodos) => {
        setGotTodo(gotTodos);
      })
      .finally(console.log(gotTodo));
  };
  return { getTodoFunc, gotTodo };
};
