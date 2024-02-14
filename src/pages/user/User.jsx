import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal, TextInput, Label } from "flowbite-react";

export default function User() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "", // Add password field if needed
  });

  const handleEdit = (user) => {
    setEditUser(user);
    // Update the modal to show edit mode
    setIsModalOpen(true);
  };

  const addUser = async () => {
    // Clear any existing edit user
    setEditUser(null);
    // Open the modal for creating a new user
    setIsModalOpen("create");
  };

  const cancelEdit = () => {
    setEditUser(null);
    setIsModalOpen(false);
  };

  const saveChanges = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      await axios.put(
        `http://localhost:5054/api/user/${editUser.id}`,
        editUser,
        config
      );

      setUsers(
        users.map((user) => (user.id === editUser.id ? editUser : user))
      );

      setEditUser(null);
      setIsModalOpen(false);
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Function to handle input changes in the modal
  const handleInputChange = (e) => {
    // Check if we're in edit mode or create mode
    if (editUser !== null) {
      // Update the editProject state with the new value
      setEditUser({
        ...editUser,
        [e.target.name]: e.target.value,
      });
    } else {
      // Update the newProject state with the new value
      setNewUser({
        ...newUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await axios.get("http://localhost:5054/api/user/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      // Use newUser state directly for creating a new user
      await axios.post(
        "http://localhost:5054/identity/register",
        newUser,
        config
      );

      await fetchUsers();
      console.log("User added successfully");

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.delete(`http://localhost:5054/api/user/${userId}`, config);

      setUsers(users.filter((user) => user.id !== userId));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-4">
        <Button onClick={addUser} gradientDuoTone="greenToBlue">
          Crear nuevo Usuario
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Acciones</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-gray-200 bg-white">
            {users.map((user) => (
              <Table.Row key={user.id} className="bg-white dark:bg-gray-800">
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleEdit(user)}>Editar</Button>
                  <Button color="failure" onClick={() => handleDelete(user.id)}>
                    Eliminar
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <Modal show={isModalOpen} onClose={cancelEdit}>
        <div>
          {/* Dynamically change modal header based on editUser state */}
          <Modal.Header>
            {editUser ? "Editar Usuario" : "Crear nuevo Usuario"}
          </Modal.Header>
          <Modal.Body>
            <form>
              {/* Input fields for email and password */}
              <div className="mb-2 block">
                <Label htmlFor="email" >
                  Email:
                </Label>
                <TextInput
                  type="email"
                  id="email"
                  name="email"
                  value={editUser ? editUser.email : newUser.email}
                  onChange={handleInputChange}
                />
              </div>
              {/* Render the password input field only in "create" mode */}
              {editUser === null && (
                <div className="mb-2 block">
                  <Label htmlFor="password" className="block">
                    Contraseña:
                  </Label>
                  <TextInput
                    type="password"
                    id="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </form>
          </Modal.Body>
          {/* Buttons to save changes or cancel action */}
          <Modal.Footer>
            <Button
              onClick={editUser ? saveChanges : createUser}
              gradientDuoTone="greenToBlue"
            >
              {editUser ? "Guardar Cambios" : "Registrar Usuario"}
            </Button>
            <Button onClick={cancelEdit} color="gray">
              Cancelar
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}
