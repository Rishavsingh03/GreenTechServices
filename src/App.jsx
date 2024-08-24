import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { React, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./Redux/store";
import { Provider, useSelector } from "react-redux";

function App() {
  
  return (
    <Provider store={store}>
      <Navbar />
      <Outlet />
      {/* ToastContainer should be here, not wrapping other components */}
      <ToastContainer />
    </Provider>
  );
}

export default App;
