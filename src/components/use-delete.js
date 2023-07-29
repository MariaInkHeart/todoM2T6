export const useDeleteTodo = (setTodos, todos) => {
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

  return deleteTodo;
};
