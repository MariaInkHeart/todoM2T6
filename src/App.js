import { useStore } from "./useStore";
import { useState } from "react";

const sendFormData = (formData) => {
  console.log(formData);
};

function App() {
  // проверка пароля

  const [passFError, setPassFError] = useState(null);

  const verifyPasses = () => {
    let pass1 = document.getElementsByName("passF");
    let pass2 = document.getElementsByName("passTrue");
    let match = null;
    let newErrorPassF = null;

    if (pass1 !== pass2) {
      match = false;
      newErrorPassF = "Пароли не совпадают";
    } else if (pass1 === pass2) {
      match = true;
      newErrorPassF = "";
      console.log(getState());
    }
    setPassFError(newErrorPassF);
    return match;
  };

  // проверка почты

  const [emailError, setEmailError] = useState(null);

  const onEmailChange = ({ target }) => {
    updateState("email", target.value);

    let newError = null;

    if (target.value.length > 30) {
      newError = "Неверный логин. Должно быть не больше 30 символов";
    }

    setEmailError(newError);
  };

  const onEmailBlur = ({ target }) => {
    if (target.value.length < 3) {
      setEmailError("Неверный логин. Должно быть не меньше 3 символов");
    }
  };

  // ориг код
  const { getState, updateState } = useStore();

  const onSubmit = (event) => {
    event.preventDefault();
    sendFormData(getState());
  };

  const { email, passF, passTrue } = getState();

  return (
    <div className="wrapper">
      <h1>REGISTRATION</h1>
      <form onSubmit={onSubmit}>
        {emailError && <div className="errorLabel">{emailError}</div>}
        {passFError && <div className="errorLabel">{passFError}</div>}
        <input
          className="input"
          name="email"
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
        />

        <input
          className="input"
          name="passF"
          type="passF"
          placeholder="PASSWORD"
          value={passF}
          onChange={({ target }) => updateState("passF", target.value)}
        />
        <input
          className="input"
          name="passTrue"
          type="passTrue"
          placeholder="CONFIRM PASSWORD"
          value={passTrue}
          onChange={({ target }) => updateState("passTrue", target.value)}
        />
        <button type="submit" onClick={verifyPasses} disabled={!!emailError}>
          REGISTRATE
        </button>
      </form>
    </div>
  );
}

export default App;
