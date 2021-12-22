import { createContext } from "react";
export const Context = createContext();

export const AppContextProvider = (props) => {
  const value = ["#ff8f66", "#00cccc"];
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
