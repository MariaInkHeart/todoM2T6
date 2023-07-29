export const useReqUpdate = (setTodos, todos) => {
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

  return reqUpdate;
};
