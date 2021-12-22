{/*
  PLEASE BEGIN THIS BY READING THE README.md FILE
*/}
import "./styles.css";
import PieChart from "./components/PieChart";
import StyledTable from "./components/Table";
import Buttons from "./components/Buttons";
import { AppContextProvider } from "./Context";
import { compareDate } from "./utils.js"
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";

import React from "react";
import { useReducer, useEffect } from "react";
import axios from "axios";


/* 
  ACTIONS object specifies a list of actions in reducers.
    - To avoid hard coded strings of action names in code.
    - To easily change action name.
*/
export const ACTIONS = {
  SET_PERSON_INFO: "set-person-info",
  SET_CURRENT_DATE: "set-current-date",
  INCREMENT: "increment",
  DECREMENT: "decrement",
  TOGGLE_LOADING: "toggle-loading",
};

// Reducer Performs an appropriate action based in action.type
const reducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.SET_PERSON_INFO:
      return {...state, personInfo: action.payload.personInfo };
    case ACTIONS.SET_CURRENT_DATE:
      return {...state, currentDate: action.payload.currentDate };
    case ACTIONS.INCREMENT: {
      let date = new Date(state.currentDate);
      date.setDate(state.currentDate.getDate() + 1);
      return {...state, currentDate: date };
    }
    case ACTIONS.DECREMENT: {
      let date = new Date(state.currentDate);
      date.setDate(state.currentDate.getDate() - 1);
      return {...state, currentDate: date };
    }
    case ACTIONS.TOGGLE_LOADING: {
      const toggled = !state.loading;
      return {...state, loading: toggled };
    }
    default:
      return state;
  }
};

const initialState = {
  currentDate: new Date(),
  personInfo: [],
  loading: true,
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // To get the dummy data from json files when component is rendered.
  useEffect(() => {
    axios.get("../../data/current_date.json")
      .then((response) => {
        dispatch({ type: ACTIONS.SET_CURRENT_DATE, payload: { currentDate: new Date(response.data.current_date) } });
      })
      .catch((err) => {
        const error = err.response ? err.response.data.message : err.message;
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
      
      axios.get("../../data/vaccine_dates.json")
      .then((response) => {
        dispatch({ type: ACTIONS.SET_PERSON_INFO, payload: { personInfo: response.data } });
        dispatch({ type: ACTIONS.TOGGLE_LOADING });
      })
      .catch((err) => {
        // To inform the user about error using toaster
        const error = err.response ? err.response.data.message : err.message;
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, []);

  // stats array indicates number of people vaccinated and not vaccinated respectively.
  function getStats() {
    let stats = [0, 0];

    state.personInfo.forEach((person) => {
      if (compareDate(person.vaccination_date, state.currentDate))
        stats[0]++;
      else
        stats[1]++;
    });

    return stats;
  }

  // To get the context information, PieChart is wrapped with AppContextProvider.
  // Initially, loading=true -> It will display loading-spinner until data is loaded.
  // We can use setTimeout with some delay in useEffect to get the loading-spinner.
  return (
    <div className="App">
    { state.loading ? (
      <div className="loading-spinner">
        <ReactLoading type="spinningBubbles" height="100px" width="100px" color="teal" />
      </div>
    ) : (
      <>
        <ToastContainer />
        <div className="chart">
          <AppContextProvider>
            <PieChart data={getStats()} />
          </AppContextProvider>
        </div>
        <div className="buttons">
          <Buttons dispatch={dispatch} currentDate={state.currentDate} />
        </div>
        <div className="stats-info-wrapper">
          <b className="stats-info">
            {getStats()[0]} out of {state.personInfo.length} persons have been vaccinated.
          </b>
        </div>
        <div className="table">
          <StyledTable rows={state.personInfo} currentDate={state.currentDate} />
        </div>
      </>
    )}
    </div>
  );
}
