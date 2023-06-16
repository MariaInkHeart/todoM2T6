import React, { useContext } from "react";
import { NumberContext } from "./NumberProvider";
import styles from "./styles.module.css";
import useState from "react";
// import EqualButton from "./EqualButton";

const Display = () => {
  const { number, storedNumber, functionType } = useContext(NumberContext);
  const { doMath } = useContext(NumberContext);
  const [theme, setTheme] = useState(true);

  const handleClick = () => {
    setTheme(!theme);
    doMath();
  };

  return (
    <div>
      <p className={theme ? styles.red : styles.green}>
        {!storedNumber
          ? `${number}`
          : `${storedNumber} ${functionType} ${number}`}
      </p>
      <button className="white-button" type="button" onClick={handleClick}>
        =
      </button>
    </div>
  );
};

export default Display;
