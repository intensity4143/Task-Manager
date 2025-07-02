import React, { useContext } from "react";
import { taskContext } from "../App";

const HomePage = () => {
  const { tasks, error, loading } = useContext(taskContext);

  if (loading)
    return (
// till task is not fetched
      <div className="p-4 flex justify-center items-center h-[100vh]">  
        Loading Tasks.....
      </div>
    );

  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl text-red-600 mb-4">Your Tasks</h1>

      {/*  if task length is zero => means no task */}
      {tasks.length === 0 ? (
        <p className="text-center text-lg text-gray-500 italic mt-4">
          You have no tasks yet.
        </p>
      ) : (
        <ul className="space-y-4">
            
            {/* using map to show all task */}
          {tasks.map((task) => (
            <li key={task._id} className="p-4 rounded shadow-lg shadow-slate-400">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.completed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </div>
              <p className="text-gray-600">{task.description}</p>
             <div className="text-xs mt-2">
              Priority:{" "} 
               <p className={`${task.priority === "High"? "bg-red-400 text-white": 
              task.priority === "Medium"? "bg-yellow-200 text-black" : "bg-green-400"} 
              inline-block px-1 py-0.5 rounded-lg text-xs`}>{task.priority}</p>
             </div>
              <p className="text-sm text-gray-500 ">
                Created At: {new Date(task.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
