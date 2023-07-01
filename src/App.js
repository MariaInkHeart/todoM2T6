import { useStore } from "./useStore";
import { useRef, useState } from "react";

const sendFormData = (formData) => {
  console.log(formData);
};

function App() {
  // проверка пароля

  const [passFError, setPassFError] = useState(null);

  const handleClick = (event) => {
    let { name, value } = event.target;
    let newErrorPassF = null;

    if (!value) {
      newErrorPassF = "Введите пароль";
    } else if (name === "passF" || name === "passTrue") {
      if (!passF || passF !== passTrue) {
        newErrorPassF = "Пароли не совпадают";
      }
    }
    setPassFError(newErrorPassF);
  };

  const onPassFBlur = ({ target }) => {
    updateState("passF", target.value);
    if (target.value.length < 3) {
      setPassFError("Неверный пароль. Должно быть не меньше 3 символов");
    }
  };

  // проверка почты

  const [emailError, setEmailError] = useState(null);

  const onEmailChange = ({ target }) => {
    updateState("email", target.value);

    let newError = null;

    if (!/^[w_]*$/.test(target.value)) {
      newError =
        "Неверная почта. Проверьте наличие @ и имени почтового сервера";
    }

    setEmailError(newError);
  };

  const onEmailBlur = ({ target }) => {
    if (target.value.length < 1) {
      setEmailError("Введите почту");
    }
  };

  // ориг код
  const { getState, updateState } = useStore();

  const onSubmit = (event) => {
    event.preventDefault();
    sendFormData(getState());
  };

  const { email, passF, passTrue } = getState();

  //autoFocus
  const autoFocus = useRef(null);

  //отправка данных
  const sendAllData = () => {
    console.log(getState());
  };

  return (
    <div className="wrapper">
      <h1>REGISTRATION</h1>
      <form onSubmit={onSubmit}>
        {emailError && <div className="errorLabel">{emailError}</div>}
        <input
          className="input"
          name="email"
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
        />
        {passFError && <div className="errorLabel">{passFError}</div>}
        <input
          className="input"
          name="passF"
          type="password"
          placeholder="PASSWORD"
          value={passF}
          onBlur={onPassFBlur}
        />
        <input
          className="input"
          name="passTrue"
          type="password"
          placeholder="CONFIRM PASSWORD"
          value={passTrue}
          onChange={({ target }) => updateState("passTrue", target.value)}
          onBlur={handleClick}
        />
        <button
          type="submit"
          onClick={sendAllData}
          disabled={!!emailError || !!passFError}
          ref={autoFocus}
        >
          REGISTRATE
        </button>
      </form>
    </div>
  );
}

export default App;
