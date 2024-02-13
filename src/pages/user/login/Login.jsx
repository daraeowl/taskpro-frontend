import { useState } from "react";
import { Button,  Label, TextInput } from "flowbite-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5054/identity/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store access token in localStorage
        localStorage.setItem("accessToken", data.accessToken);
        // Set isLoggedIn to true
        setIsLoggedIn(true);
      } else {
        // Handle login error
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        (window.location.href = "http://localhost:5173/")
      ) : (
        <div className="loginContainer">
          <h2>Login</h2>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div className="flex justify-center items-start min-h-screen">
            <form
              onSubmit={handleLogin}
              className="formContainer flex flex-col gap-4 max-w-md"
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email:" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@outlook.com"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password:" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button className="loginButton" type="submit">Iniciar Sesión</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
