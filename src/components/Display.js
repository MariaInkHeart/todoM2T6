import React, { useContext } from "react";
import { NumberContext } from "./NumberProvider";
import styles from "./styles.module.css";
// import useState from "react";
// import EqualButton from "./EqualButton";

const Display = () => {
  const { number, storedNumber, functionType } = useContext(NumberContext);
  const { doMath } = useContext(NumberContext);
  // const { setTheme } = useState(false);

  const handleClick = () => {
    doMath();
  };

  return (
    <div>
      <p className={handleClick === true ? styles.red : styles.green}>
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
