import React, { useContext } from "react";
import { NumberContext } from "./NumberProvider";
// import styles from './styles.module.css';

const EqualButton = () => {
  const { doMath } = useContext(NumberContext);
  return (
    <button className="white-button" type="button" onClick={() => doMath()}>
      =
    </button>
  );
};

export default EqualButton;
