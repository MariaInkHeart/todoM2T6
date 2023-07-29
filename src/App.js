import { Routes, Route, Navigate } from "react-router-dom";
import { useMainPage, useFuncNotFound, useToDo } from "./components";

export const App = () => {
  //Route
  const { MainPage } = useMainPage();

  const { ToDo } = useToDo();
  const { NotFound } = useFuncNotFound();
  return (
    <div className="wrapper">
      <h2 className="header">To-do-do-dos</h2>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/task/:id" element={<ToDo />} />

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
};

export default App;
