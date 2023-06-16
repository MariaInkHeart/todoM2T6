import React, { useContext } from "react";
import { NumberContext } from "./NumberProvider";
import styles from "./styles.module.css";
// import useState from "react";
// import EqualButton from "./EqualButton";

const Display = () => {
  const { number, storedNumber, functionType } = useContext(NumberContext);
  const { doMath } = useContext(NumberContext);
  // const [theme, setTheme] = useState(true);

  // const handleClick = () => {
  //   setTheme(!theme);
  //   doMath();
  // };theme ? styles.red : styles.green

  return (
    <div>
      <p className={styles.green}>
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
