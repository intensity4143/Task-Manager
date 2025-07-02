import React, { useState, useContext } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { taskContext } from "../App";
import AddTask from "./AddTask";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { tasks, pendingTasks, completedTasks, loading } =
    useContext(taskContext);
  const [open, setOpen] = useState(false);

  const completionRate =
    tasks.length > 0
      ? ((completedTasks.length / tasks.length) * 100).toFixed(2)
      : "0.00";

return (
  <div className="flex min-h-screen bg-gray-200">
    {/* Fixed Sidebar */}
    <div>
      <SideBar />
    </div>

    {/* Main Content with left margin to avoid overlap */}
    <div className="lg:ml-64 flex-1">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Task Overview
          </h2>

          {/* Modal */}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button className="bg-green-800 text-white text-sm px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-green-700 transition">
                Add New Task <Plus size={16} />
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="bg-black/50 fixed inset-0" />
              <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl z-1000">
                <Dialog.Title className="text-lg font-semibold mb-2 text-center">
                  Add New Task
                </Dialog.Title>
                <Dialog.Description className="text-sm text-gray-600 mb-4 text-center">
                  {/* Fill in the details below to create a new task. */}
                </Dialog.Description>

                <AddTask setOpen={setOpen} />

                <Dialog.Close
                  className="absolute top-2 right-2 text-gray-500 hover:text-black"
                  aria-label="Close"
                >
                  ✕
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:gap-4 gap-2">
          <StatCard title="Total Tasks" value={loading ? "..." : tasks.length} />
          <StatCard title="Completed" value={loading ? "..." : completedTasks.length} />
          <StatCard title="Pending" value={loading ? "..." : pendingTasks.length} />
          <StatCard title="Completion Rate" value={`${completionRate}%`} />
        </div>
      </div>

      {/* Tasks layout*/}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  </div>
);

};

// Reusable Status Card component
const StatCard = ({ title, value }) => (
  <div className="bg-white lg:p-4 p-2.5 rounded-lg shadow-md shadow-slate-700 text-center ">
    <h3 className="text-sm text-gray-600">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

export default Dashboard;
