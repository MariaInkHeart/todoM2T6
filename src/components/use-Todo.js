import { useEffect, useState } from "react";
import { useGetTodo } from "./use-get";
import { useMainPage } from "./use-main-page";
import { useParams, NavLink, useNavigate } from "react-router-dom";

export const useToDo = () => {
  const { isSorted } = useMainPage();
  const { todos, setTodos } = useGetTodo(isSorted);

  const reqUpdate = (id) => {
    fetch(`http://localhost:3005/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        name: "Выполнено",
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

  const deleteTodo = (id) => {
    fetch(`http://localhost:3005/todos/${id}`, {
      method: "DELETE",
    })
      .then((rawResp) => rawResp.json())
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ToDo = () => {
    const { id: taskId } = useParams();
    const [gotTodo, setGotTodo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
      fetch(`http://localhost:3005/todos/${taskId}`)
        .then((gotTodoData) => gotTodoData.json())
        .then((newTask) => {
          if (!newTask.id) {
            navigate("/404");
          }
          setGotTodo(newTask);
        });
    }, [taskId, navigate]);

    const { id, name } = gotTodo;
    return (
      <div>
        {/* {gotTodo.map((name, id) => ( */}
        <div>
          <li>
            <NavLink to="/">Главная</NavLink>
          </li>
          <li key={id}>
            <li> id: {id}</li>
            <li>Задача: {name}</li>
          </li>
          <button onClick={() => reqUpdate(id)}>Отметить сделанным</button>
          <button onClick={() => deleteTodo(id)}>Удалить</button>
        </div>
        {/* ))} */}
      </div>
    );
  };
  return { ToDo };
};
