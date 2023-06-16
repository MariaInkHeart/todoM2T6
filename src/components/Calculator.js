import React from "react";
import NumberButton from "./NumberButton";
import FunctionButton from "./FunctionButton";
import ClearButton from "./ClearButton";
import Display from "./Display";
// import EqualButton from "./EqualButton";

const Calculator = () => (
  <div>
    <div className="display">
      <h1>CALCULATOR</h1>
      <Display />
    </div>
    <div className="number-pad">
      <ClearButton />
      <div className="zero-button">
        <NumberButton buttonValue={0} />
      </div>
      <NumberButton buttonValue={1} />
      <NumberButton buttonValue={2} />
      <NumberButton buttonValue={3} />
      <NumberButton buttonValue={4} />
      <NumberButton buttonValue={5} />
      <NumberButton buttonValue={6} />
      <NumberButton buttonValue={7} />
      <NumberButton buttonValue={8} />
      <NumberButton buttonValue={9} />
      <FunctionButton buttonValue="+" />
      <FunctionButton buttonValue="-" />
      {/* <EqualButton /> */}
    </div>
  </div>
);

export default Calculator;
