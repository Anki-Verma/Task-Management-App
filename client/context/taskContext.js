import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";

const TasksContext = createContext();

const serverUrl = "http://localhost:8000/api/v1";

export const TasksProvider = ({ children }) => {
  const userId = useUserContext().user._id;

  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState({});
  const [isEditing, setIsEditing] = React.useState(false);
  const [activeTask, setActiveTask] = React.useState(null);
  const [modalMode, setModalMode] = React.useState("");
  const [profileModal, setProfileModal] = React.useState(false);

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(false);
    setTask({});
  };

  const openModalForEdit = (task) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(task);
  };

  const openProfileModal = () => setProfileModal(true);
  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask({});
  };

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/tasks`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.log("Error getting tasks", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (newTask) => {
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/task/create`, newTask);
      setTasks((prev) => [...prev, res.data]);
      toast.success("Task created successfully");
    } catch (error) {
      console.log("Error creating task", error);
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (updatedTask) => {
    setLoading(true);
    try {
      const res = await axios.patch(`${serverUrl}/task/${updatedTask._id}`, updatedTask);
      setTasks((prev) => prev.map((tsk) => (tsk._id === res.data._id ? res.data : tsk)));
      toast.success("Task updated successfully");
    } catch (error) {
      console.log("Error updating task", error);
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/task/${taskId}`);
      setTasks((prev) => prev.filter((tsk) => tsk._id !== taskId));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log("Error deleting task", error);
      toast.error("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (name) => (e) => {
    setTask((prev) => ({ ...prev, [name]: e.target.value }));
  };

  useEffect(() => {
    getTasks();
  }, [userId]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        task,
        createTask,
        updateTask,
        deleteTask,
        handleInput,
        isEditing,
        openModalForAdd,
        openModalForEdit,
        closeModal,
        activeTask,
        modalMode,
        profileModal,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => React.useContext(TasksContext);
