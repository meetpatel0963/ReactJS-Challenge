import { useState } from "react";
import { ACTIONS } from "../App.js";

// call dispatch (coming in props) to handle increment and decrement operations
export default function ({ dispatch, currentDate }) {
  return (
    <>
      <button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>+</button>
      <div className="date-info-wrapper">
        <p className="date-info"> {currentDate.toDateString()} </p>
      </div>
      <button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>-</button>
    </>
  );
}
