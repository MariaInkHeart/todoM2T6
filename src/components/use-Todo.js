import { useGetTodoFunc } from "./use-get-todo-func";
import { useReqUpdate } from "./use-update";
import { useDeleteTodo } from "./use-delete";
import { useGetTodo } from "./use-get";
import { useMainPage } from "./use-main-page";
import { useParams, NavLink, Navigate } from "react-router-dom";

export const useToDo = () => {
  const { isSorted } = useMainPage();
  const { todos, setTodos } = useGetTodo(isSorted);
  const { getTodoFunc, gotTodo } = useGetTodoFunc();
  const { reqUpdate } = useReqUpdate(setTodos, todos);
  const { deleteTodo } = useDeleteTodo(setTodos, todos);

  const ToDo = () => {
    const params = useParams();
    const todoById = getTodoFunc(params.id);

    if (!todoById) {
      return <Navigate to="/404" />;
    }

    // const { id, name } = todoById;

    return (
      <div>
        {gotTodo.map((id, name) => (
          <div>
            <li>
              <NavLink to="/">Главная</NavLink>
            </li>
            <li key={id}>
              {id}-{name}
            </li>
            <button onClick={() => reqUpdate(id)}>Отметить сделанным</button>
            <button onClick={() => deleteTodo(id)}>Удалить</button>
          </div>
        ))}
      </div>
    );
  };
  return { ToDo };
};
