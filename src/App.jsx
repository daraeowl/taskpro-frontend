import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import User from "../src/pages/user/User";
import Task from "../src/pages/task/Task";
import Project from "../src/pages/project/Project";
import Home from "../src/pages/home/Home";
import Dashboard from "../src/pages/dashboard/Dashboard";
import Header from "./components/header/Header";
import Login from "./pages/user/login/Login";
import { ThemeModeScript } from "flowbite-react";

import SignIn from "./pages/user/signin/SignIn";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
        <ThemeModeScript />
      <Header>
      </Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/user/"
          element={isLoggedIn ? <User /> : <Navigate to="/user" />}
        />
        <Route
          path="/project/"
          element={isLoggedIn ? <Project /> : <Navigate to="/project" />}
        />
        <Route
          path="/task/"
          element={isLoggedIn ? <Task /> : <Navigate to="/task" />}
        />
        <Route
          path="/dashboard/"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/user/login" element={<Login />} />
        <Route
          path="/user/signin"
          element={isLoggedIn ? <SignIn /> : <Navigate to="/signin" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
