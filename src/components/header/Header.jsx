import {
  Button,
  Navbar,
  TextInput,
  DarkThemeToggle,
  Flowbite,
} from "flowbite-react";

import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const path = useLocation().pathname;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Remove the access token from local storage
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    // Redirect to the login page
    window.location.href = "/user/login";
  };

  const handleNavItemClick = (path) => {
    if (!isLoggedIn && path !== "/user/login") {
      // If user is not logged in and tries to access other pages, redirect to signin
      path = "/user/login";
    }
    // Redirect to the specified path
    window.location.href = path;
  };

  return (
    <div className="headerContainer">
      <Navbar className="border-b-2">
        <Link
          to={isLoggedIn ? "/" : "/user/login"}
          onClick={() => handleNavItemClick("/")}
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            TaskPro
          </span>
          App
        </Link>
        <form>
          <TextInput
            type="text"
            placeholder="Buscar..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          />
        </form>

        <div className="flex gap-2 md:order-2">
          <Flowbite>
            <DarkThemeToggle />
          </Flowbite>
          {isLoggedIn && (
            <Button
              gradientDuoTone="purpleToBlue"
              outline
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link
            active={path === "/"}
            as={"div"}
            onClick={() => handleNavItemClick("/")}
          >
            <span>Inicio</span>
          </Navbar.Link>
          <Navbar.Link
            active={path === "/user"}
            as={"div"}
            onClick={() => handleNavItemClick("/user")}
          >
            <span>Usuarios</span>
          </Navbar.Link>
          <Navbar.Link
            active={path === "/project"}
            as={"div"}
            onClick={() => handleNavItemClick("/project")}
          >
            <span>Proyectos</span>
          </Navbar.Link>
          <Navbar.Link
            active={path === "/task"}
            as={"div"}
            onClick={() => handleNavItemClick("/task")}
          >
            <span>Tareas</span>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
