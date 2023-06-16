import React, { useContext } from "react";
import { NumberContext } from "./NumberProvider";
import styles from "./styles.module.css";
// import useState from "react";
// import EqualButton from "./EqualButton";

const Display = () => {
  const { number, storedNumber, functionType } = useContext(NumberContext);
  const { doMath } = useContext(NumberContext);
  // const [theme, setTheme] = useState("default");

  // const handleClick = () => {
  //   setTheme("red");
  //   // useContext(NumberContext);
  // };theme === "red" ? styles.red : styles.green

  return (
    <div>
      <p className={styles.red}>
        {!storedNumber
          ? `${number}`
          : `${storedNumber} ${functionType} ${number}`}
      </p>
      <button className="white-button" type="button" onClick={() => doMath()}>
        =
      </button>
    </div>
  );
};

export default Display;
