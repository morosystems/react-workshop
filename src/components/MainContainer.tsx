import React, { FunctionComponent } from "react";
import "../styles.css";

type MainContainerProps = { children: React.ReactNode };

const MainContainer: FunctionComponent<MainContainerProps> = ({ children }) => {
  return <div className="App">{children}</div>;
};

export default MainContainer;
