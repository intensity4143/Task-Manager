import React, { useEffect, useState } from "react";
// import { resolvePath } from 'react-router-dom';
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import AddTask from "./AddTask";
import { Plus } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { taskContext } from "../App";

const HomePage = () => {
  // using context provided from App.js
  const { tasks, pendingTasks, completedTasks, error, loading } = useContext(taskContext); 
  const [open, setOpen] = useState(false);


  return (
    <div className="bg-gray-200 p-4">
      {/* Header with Add Task */}
      <div className="flex justify-evenly items-center mb-4 py-1.5">
        <h2 className="text-xl font-semibold text-gray-800">Task Overview</h2>
        <div>
          {/* Trigger Button , modal for add task to appear over layout acting as translucent using radix modal*/}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button className="bg-green-800 text-white text-sm px-4 py-1 rounded-xl flex items-center gap-2 hover:bg-green-700 transition cursor-pointer"
              onClick={() =>setOpen(true)}>
                Add New Task <Plus size={16} />
              </button>
            </Dialog.Trigger>

            {/* Modal Content */}
            <Dialog.Portal>
              <Dialog.Overlay className="bg-black/50 fixed inset-0" />
              <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 shadow-lg">
                <Dialog.Title className="text-lg font-semibold mb-2">
                  Add New Task
                </Dialog.Title>
                <Dialog.Description className="text-sm text-gray-600 mb-4 text-center">
                  Fill in the details below to create a new task.
                </Dialog.Description>

                <AddTask setOpen={setOpen}/>

                <Dialog.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={()=>setOpen(false)}>
                  ✕
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      {/* Task Stats */}
      <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-2shadow-md shadow-slate-400 p-2">
        <div className="bg-white p-2 rounded-md shadow-md text-center w-40">
          <h3 className="text-slate-600 text-sm">Total Task</h3>
          <p className="text-xl font-semibold text-slate-700">
            {loading ? "loading" : tasks.length}
          </p>
        </div>
        <div className="bg-white p-2 rounded-md shadow-md text-center w-40">
          <h3 className="text-slate-600 text-sm">Completed Task</h3>
          <p className="text-xl font-semibold text-slate-700">
            {loading ? "loading" : completedTasks.length}
          </p>
        </div>
        <div className="bg-white p-2 rounded-md shadow-md text-center w-40">
          <h3 className="text-slate-600 text-sm">Pending Task</h3>
          <p className="text-xl font-semibold text-slate-700">
            {loading ? "loading" : pendingTasks.length}
          </p>
        </div>
        <div className="bg-white p-2 rounded-md shadow-md text-center w-40">
          <h3 className="text-slate-600 text-sm">Completion Rate</h3>
          <p className="text-xl font-semibold text-slate-700">
            {((completedTasks.length / tasks.length) * 100).toFixed(2)} %
          </p>
        </div>
      </div>

      {/* Task Type Filters */}
      <div className="flex justify-center">
        <div className="flex gap-2 bg-slate-300 p-2 rounded-md shadow-lg">
          <NavLink
            to="/layout/allTasks"
            className="bg-white text-sm px-3 py-1 rounded-md hover:bg-slate-100"
          >
            All Tasks
          </NavLink>
          <NavLink
            to="/layout/completedTasks"
            className="bg-white text-sm px-3 py-1 rounded-md hover:bg-slate-100"
          >
            Completed
          </NavLink>
          <NavLink
            to="/layout/pendingTasks"
            className="bg-white text-sm px-3 py-1 rounded-md hover:bg-slate-100"
          >
            Pending
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
