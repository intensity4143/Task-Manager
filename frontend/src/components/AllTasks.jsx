import React, { useContext, useState } from "react";
import { taskContext } from "../App";
import { SquarePen, Trash2 } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import EditTask from "./EditTask";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteTask from "./DeleteTask";

const AllTasks = () => {
  const {
      tasks,
      error,
      loading,
      taskToEdit, 
      setTaskToEdit,
      open, 
      setOpen,
      setConfirmDelete,
      setTaskToDelete
    } = useContext(taskContext);


  //  if task not fetched yet
  if (loading)
    return (
      <div className="p-6 flex justify-center items-center h-[100vh]">
        Loading Tasks.....
      </div>
    );

  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="lg:p-8 md:p-6 p-3 mx-auto rounded-lg bg-white">
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
                <h2 className="text-2xl font-semibold">{task.title}</h2>
                <span
                  className={`text-md px-2 py-1 rounded-full ${
                    task.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </div>
              <p className="text-gray-700 text-lg">{task.description}</p>
              <div className="text-md mt-2">
                Priority:{" "}
                <p
                  className={`${
                    task.priority === "High"
                      ? "bg-red-400 text-white"
                      : task.priority === "Medium"
                      ? "bg-yellow-200 text-black"
                      : "bg-green-400"
                  } 
              inline-block px-1 py-0.5 rounded-lg text-sm`}
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
                    <Trash2 size={22} />
                  </button>

                  <button
                    className="text-gray-600 text-sm px-4 py-2 rounded-xl flex items-center gap-2 hover:text-blue-700 transition"
                    onClick={() => {
                      setTaskToEdit(task);
                      setOpen(true);
                    }}
                  >
                    <SquarePen size={22} />
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

      {/* delete task component */}
      <DeleteTask/>

    </div>
  );
};

export default AllTasks;
