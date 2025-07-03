import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Layout from "./components/Layout";
import AllTasks from "./components/AllTasks";
import CompletedTasks from "./components/CompletedTasks"
import PendingTasks from  "./components/PendingTasks"
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState, createContext} from "react";
import axios from "axios";
import AddTask from "./components/AddTask";
import DeleteTask from "./components/DeleteTask";

const taskContext = createContext();

function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please wait.");
        // setLoading(false);
        fetchTasks();
        // return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:3000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const fetchedTasks = response.data.tasks;
          setTasks(fetchedTasks);
          setCompletedTasks(fetchedTasks.filter((task) => task.completed));
          setPendingTasks(fetchedTasks.filter((task) => !task.completed));
        }
      } catch (error) {
        setError("Error while fetching tasks");
        console.log("Error fetching tasks", error);
      }
      setLoading(false)
    };

    // added delay so that it runs when token is set to localStorage
    setTimeout(fetchTasks, 100);
  }, []);

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
        loading
      }}
    >
      <Routes>
        {/* Public Routes */}
        <Route path ="/" element={<Navigate to = "/login" replace />} />
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
          <Route path="pendingTasks" element={<PendingTasks/>} />
          <Route path="addTask" element={<AddTask/>} />
        </Route>
      </Routes>
      {/* <DeleteTask/> */}
    </taskContext.Provider>
  );
}

export default App;
export {taskContext};
