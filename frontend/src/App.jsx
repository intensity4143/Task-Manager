import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Layout from "./components/Layout";
import AllTasks from "./components/AllTasks";
import CompletedTasks from "./components/CompletedTasks";
import PendingTasks from "./components/PendingTasks";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState, createContext } from "react";
import axios from "axios";
import AddTask from "./components/AddTask";
import DeleteTask from "./components/DeleteTask";
import Profile from "./components/Profile/Profile";

const taskContext = createContext();

function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [userName, setUserName] = useState("user");
  const [userEmail, setUserEmail] = useState("user@gmail.com");
  const [image, setImage] = useState(null);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       setError("Please wait.");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const response = await axios.get("http://127.0.0.1:3000/api/tasks", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (response.data.success) {
  //         const fetchedTasks = response.data.tasks;
  //         setTasks(fetchedTasks);
  //         setCompletedTasks(fetchedTasks.filter((task) => task.completed));
  //         setPendingTasks(fetchedTasks.filter((task) => !task.completed));
  //       }
  //     } catch (error) {
  //       setError("Error while fetching tasks");
  //       console.log("Error fetching tasks", error);
  //     }
  //     setLoading(false);
  //   };

  //   // added delay so that it runs when token is set to localStorage
  //   setTimeout(fetchTasks, 200);
  // }, []);

  return (
    <taskContext.Provider
      value={{
        tasks,
        setTasks,
        pendingTasks,
        setPendingTasks,
        completedTasks,
        setCompletedTasks,
        error,
        setError,
        loading,
        setLoading,
        taskToEdit,
        setTaskToEdit,
        open,
        setOpen,
        confirmDelete,
        setConfirmDelete,
        taskToDelete,
        setTaskToDelete,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        image,
        setImage,
      }}
    >
      <DeleteTask />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />

        {/* Protected Layout Route */}
        <Route
          path="/layout"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllTasks />} />
          <Route path="allTasks" element={<AllTasks />} />
          <Route path="completedTasks" element={<CompletedTasks />} />
          <Route path="pendingTasks" element={<PendingTasks />} />
          <Route path="addTask" element={<AddTask />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </taskContext.Provider>
  );
}

export default App;
export { taskContext };
