import React, { useContext, useState } from "react";
import { taskContext } from "../App";
import { SquarePen, Trash2 } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import EditTask from "./EditTask";
import axios from "axios";
import { toast } from "react-toastify";

const AllTasks = () => {
  const {
    tasks,
    setTasks,
    setPendingTasks,
    setCompletedTasks,
    error,
    loading,
  } = useContext(taskContext);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // delete Task functionality
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("You can't Delete task . please Login");
    const task = taskToDelete;
    if (!task) return toast.error("No task to Delete !!");

    try {
      const taskId = task._id;
      const response = await axios.delete(
        `http://127.0.0.1:3000/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("task Deleted Successfully!");

      //  updating all tasks, completeTasks, pendingTasks
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      setPendingTasks((prev) => prev.filter((t) => t._id !== taskId));
      setCompletedTasks((prev) => prev.filter((t) => t._id !== taskId));

      setConfirmDelete(false);
      setTaskToDelete([]);
      console.log(response.data.title);
    } catch (error) {
      toast.error("Error while deleting Task!");
      setConfirmDelete(false);
      setTaskToDelete(null);
      console.log(error.message);
    }
  };

  const handleCancelDelete = async () => {
    setConfirmDelete(false);
    setTaskToDelete(null);
  }
  //  if task not fetched yet
  if (loading)
    return (
      <div className="p-4 flex justify-center items-center h-[100vh]">
        Loading Tasks.....
      </div>
    );

  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="lg:p-8 p-6 max-w-4xl mx-auto rounded-lg bg-white">
      <h1 className="text-2xl text-red-600 mb-4">Your Tasks</h1>

      {tasks.length === 0 ? (
        <p className="text-center text-lg text-gray-500 italic mt-4">
          You have no tasks yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="p-4 rounded shadow-md shadow-slate-700 border border-slate-600"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    task.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </div>
              <p className="text-gray-600">{task.description}</p>
              <div className="text-xs mt-2">
                Priority:{" "}
                <p
                  className={`${
                    task.priority === "High"
                      ? "bg-red-400 text-white"
                      : task.priority === "Medium"
                      ? "bg-yellow-200 text-black"
                      : "bg-green-400"
                  } 
              inline-block px-1 py-0.5 rounded-lg text-xs`}
                >
                  {task.priority}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500 ">
                  Created At: {new Date(task.createdAt).toLocaleString()}
                </p>

                <div className="flex">
                  {/*  task deletion button */}
                  <button
                    className="hover:text-red-600 text-slate-600"
                    onClick={() => {
                      setTaskToDelete(task);
                      setConfirmDelete(true);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>

                  <button
                    className="text-gray-600 text-sm px-4 py-2 rounded-xl flex items-center gap-2 hover:text-blue-700 transition"
                    onClick={() => {
                      setTaskToEdit(task);
                      setOpen(true);
                    }}
                  >
                    <SquarePen size={18} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Dialog rendered outside loop to avoid aria-hidden/focus bugs */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/50 fixed inset-0 z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl z-50">
            <Dialog.Title className="text-lg font-semibold mb-2 text-center">
              Edit Task
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600 mb-4 text-center">
              {/* Modify the details of your task below. */}
            </Dialog.Description>

            {taskToEdit && (
              <EditTask setOpen={setOpen} taskToEdit={taskToEdit} />
            )}

            <Dialog.Close
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              aria-label="Close"
            >
              ✕
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* delete confirmation dialogue box*/}
      {confirmDelete && taskToDelete && (
        <div className="fixed inset-0  bg-black/50 flex justify-center items-center z-40">
          <div className="bg-white p-4 rounded-lg shadow-lg z-50">
            <h2 className="text-lg font-bold mb-4 bg-gray-100 pl-2 rounded-lg">Confirm Delete</h2>
            <p className="mb-1">Are you sure you want to delete this task?</p>
            <p className="text-center font-semibold mb-4">
              {taskToDelete?.title ? `"${taskToDelete.title}"` : "?"}
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-400"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-3  rounded-lg hover:bg-red-600 ring-2"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
