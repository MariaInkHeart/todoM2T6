export const useAddTodo = (todoValue, setTodos, todos) => {
  const addTodo = () => {
    fetch("http://localhost:3005/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        name: todoValue,
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

  return { addTodo };
};
