import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal } from "flowbite-react";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    status: "",
  });

  // Function to handle edit button click
  const handleEdit = (project) => {
    setEditProject(project);
    setIsModalOpen(true);
  };

  // Function to handle cancel editing
  const cancelEdit = () => {
    // Clear the edit project
    setEditProject(null);
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

      // Make PUT request to update the project
      await axios.put(
        `http://localhost:5054/api/project/${editProject.id}`,
        editProject,
        config
      );

      // Fetch updated projects after successful update
      await fetchProjects();
      console.log("Project updated successfully");

      // Clear the edit project after successful update
      setEditProject(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

// Function to handle input changes in the modal
const handleInputChange = (e) => {
  // Check if we're in edit mode or create mode
  if (editProject !== null) {
    // Update the editProject state with the new value
    setEditProject({
      ...editProject,
      [e.target.name]: e.target.value,
    });
  } else {
    // Update the newProject state with the new value
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  }
};


  // Function to handle adding new task
  const addProject = async () => {
    // Clear any existing edit task
    setEditProject(null);
    // Open the modal for creating a new task
    setIsModalOpen("create");
  };

  const createProject = async () => {
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

      // Make POST request to create a new project
      await axios.post(
        "http://localhost:5054/api/project/",
        newProject, // Use newProject state here
        config
      );

      // Fetch updated projects after successful creation
      await fetchProjects();
      console.log("Project added successfully");

      // Close the modal after successful creation
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await axios.get("http://localhost:5054/api/project/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
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

      await axios.delete(
        `http://localhost:5054/api/project/${projectId}`,
        config
      );
      // Update projects after successful deletion
      setProjects(projects.filter((project) => project.id !== projectId));
      console.log("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Crear Proyecto button */}
      <div className="flex justify-end mb-4">
        <Button onClick={addProject} gradientDuoTone="greenToBlue">
          Crear nuevo Proyecto
        </Button>
      </div>
      {/* Projects table */}
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Id</Table.HeadCell>
          <Table.HeadCell>Título</Table.HeadCell>
          <Table.HeadCell>Descripción</Table.HeadCell>
          <Table.HeadCell>Estado</Table.HeadCell>
          <Table.HeadCell>Acciones</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-white">
          {projects.map((project) => (
            <Table.Row key={project.id} className="bg-white dark:bg-gray-800">
              <Table.Cell>{project.id}</Table.Cell>
              <Table.Cell>{project.title}</Table.Cell>
              <Table.Cell>{project.description}</Table.Cell>
              <Table.Cell>{project.status}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => handleEdit(project)}>Editar</Button>
                <Button
                  color="failure"
                  onClick={() => handleDelete(project.id)}
                >
                  Borrar
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {/* Edit project modal */}
      <Modal show={isModalOpen !== false} onHide={cancelEdit}>
        <div>
          <Modal.Header closeButton={false}>
            {isModalOpen === "create" ? "Crear Proyecto" : "Editar Proyecto"}
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-2">
                <label htmlFor="title" className="block">
                  Título:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editProject ? editProject.title : newProject.title}
                  onChange={handleInputChange}
                  className="border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="description" className="block">
                  Descripción:
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={
                    editProject
                      ? editProject.description
                      : newProject.description
                  }
                  onChange={handleInputChange}
                  className="border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block">
                  Estado:
                </label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={editProject ? editProject.status : newProject.status}
                  onChange={handleInputChange}
                  className="border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
            </form>
          </Modal.Body>
          <div className="buttonContainer">
            <Modal.Footer>
              <Button
                onClick={isModalOpen === "create" ? createProject : saveChanges}
                gradientDuoTone="greenToBlue"
              >
                {isModalOpen === "create"
                  ? "Guardar Proyecto"
                  : "Guardar Cambios"}
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
