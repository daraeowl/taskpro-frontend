import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal } from "flowbite-react";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "",
  });

  // Function to handle edit button click
  const handleEdit = (task) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  // Function to handle cancel editing
  const cancelEdit = () => {
    // Clear the edit task
    setEditTask(null);
    setIsModalOpen(false);
  };

  // Function to handle save changes
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

      // Make PUT request to update the task
      await axios.put(
        `http://localhost:5054/api/task/${editTask.id}`,
        editTask,
        config
      );

      // Update the task in the tasks array
      setTasks(
        tasks.map((task) => (task.id === editTask.id ? editTask : task))
      );

      // Clear the edit task after successful update
      setEditTask(null);
      setIsModalOpen(false);
      console.log("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Function to handle input changes in edit mode
  const handleInputChange = (e) => {
    // Update the editTask state with the new value
    setEditTask({
      ...editTask,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle input changes for new task
  const handleNewTaskChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle adding new task
  const addTask = async () => {
    // Clear any existing edit task
    setEditTask(null);
    // Open the modal for creating a new task
    setIsModalOpen(true);
  };

  const createTask = async () => {
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

      // Make POST request to create a new task
      await axios.post("http://localhost:5054/api/task/", newTask, config);

      // Fetch updated tasks after successful creation
      await fetchTasks();
      console.log("Task added successfully");

      // Close the modal after successful creation
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:5054/api/task/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
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

      await axios.delete(`http://localhost:5054/api/task/${taskId}`, config);
      // Update tasks after successful deletion
      setTasks(tasks.filter((task) => task.id !== taskId));
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Tareas</h1>
      {/* Crear Tareas button */}
      <div className="flex justify-end mb-4">
        <Button onClick={addTask} gradientDuoTone="greenToBlue">
          Crear nueva Tarea
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Id</Table.HeadCell>
            <Table.HeadCell>Titulo</Table.HeadCell>
            <Table.HeadCell>Descripcion</Table.HeadCell>
            <Table.HeadCell>Estado</Table.HeadCell>
            <Table.HeadCell>Acciones</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-gray-200 bg-white">
            {tasks.map((task) => (
              <Table.Row key={task.id} className="bg-white dark:bg-gray-800">
                <Table.Cell>{task.id}</Table.Cell>
                <Table.Cell>{task.title}</Table.Cell>
                <Table.Cell>{task.description}</Table.Cell>
                <Table.Cell>{task.status}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleEdit(task)}>Editar</Button>
                  <Button color="failure" onClick={() => handleDelete(task.id)}>
                    Borrar
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {/* Edit task modal */}
      <Modal show={isModalOpen} onHide={cancelEdit}>
        <div>
          <Modal.Header closeButton={false}>
            {editTask ? "Editar Tarea" : "Crear Tarea"}
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-2">
                <label htmlFor="title" className="block">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editTask ? editTask.title : newTask.title}
                  onChange={editTask ? handleInputChange : handleNewTaskChange}
                  className="border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="description" className="block">
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={editTask ? editTask.description : newTask.description}
                  onChange={editTask ? handleInputChange : handleNewTaskChange}
                  className="border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block">
                  Status:
                </label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={editTask ? editTask.status : newTask.status}
                  onChange={editTask ? handleInputChange : handleNewTaskChange}
                  className="border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
            </form>
          </Modal.Body>
          <div className="buttonContainer">
            <Modal.Footer>
              <Button
                onClick={editTask ? saveChanges : createTask}
                gradientDuoTone="greenToBlue"
              >
                {editTask ? "Guardar Cambios" : "Crear Tarea"}
              </Button>
              <Button onClick={cancelEdit} color="gray">
                Cancelar
              </Button>
            </Modal.Footer>
          </div>
        </div>
      </Modal>
    </div>
  );
}
