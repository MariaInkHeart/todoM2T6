import { NavLink } from "react-router-dom";

export const useFuncNotFound = () => {
  const NotFound = () => (
    <div>
      <li>
        <NavLink to="/">Главная</NavLink>
      </li>
      <h3>Такой страницы не существует</h3>
    </div>
  );
  return { NotFound };
};
