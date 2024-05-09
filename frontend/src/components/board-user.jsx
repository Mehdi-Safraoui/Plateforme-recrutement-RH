import React, { useState, useEffect } from "react";
import userService from "../services/user-service";
import Jobs from "../pages/jobs";

const UserBoard = () => {
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState("");

  useEffect(() => {
    const fetchUserBoard = async () => {
      try {
        const response = await userService.getUserBoard();
        setContent(response.data);
      } catch (error) {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(errorMessage);
      }
    };

    fetchUserBoard();
  }, []); // Empty dependency array ensures it only runs once when the component mounts.

  return (
    <div className="container flex flex-column space-x-32">
      <header>
        <aside
          id="logo-sidebar"
          className="top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  onClick={() => setShowForm(1)}
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H6a2 2 0 0 0-2 2h14v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z" />
                    <path d="M14 4H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM2 16v-6h12v6H2Z" />{" "}
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Offres d'emploi
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </aside>
      </header>
      <div className="pt-5 w-full">{showForm === 1 && <Jobs />}</div>
    </div>
  );
};

export default UserBoard;
