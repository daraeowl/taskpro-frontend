import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5054//identity/register", {
        email: email,
        password: password,
      });
      setSuccessMessage("Cuenta creada exitosamente");
      setEmail("");
      setPassword("");
      setIsLoggedIn(true); // Set isLoggedIn to true after successful account creation
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { errors } = error.response.data;
        if (errors && errors.DuplicateUserName) {
          setError("Email ya registrado, intenta con otro");
        } else {
          setError(
            "Se ha fallado al intentar crear la cuenta, intenta nuevamente"
          );
        }
      } else {
        setError(
          "Se ha fallado al intentar crear la cuenta, intenta nuevamente"
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
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
            placeholder="name@flowbite.com"
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
        <Button type="submit">Create Account</Button>
      </form>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      {/* Conditionally render the "Crear Usuario" button only if isLoggedIn is true */}
      {isLoggedIn && (
        <Link to="/user/signin">
          <Button gradientDuoTone="purpleToBlue" outline>
            Crear Usuario
          </Button>
        </Link>
      )}
    </div>
  );
}
