import React, { useState } from "react";
import authService from "../services/auth-service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    authService
      .login(email, password)
      .then((response) => {
        toast.success("Connexion réussie !", {
          position: "top-right",
          pauseOnHover: true,
          theme: "dark",
        });
        // Autres actions après une connexion réussie, par exemple, redirection
      })
      .catch((error) => {
        // Afficher une notification en cas d'erreur
        toast.error("Veuillez vérifier votre email et votre mot de passe!", {
          position: "top-right",
          pauseOnHover: true,
          theme: "dark",
        });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20">
        <div class="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white focus:outline-none hover:text-blue-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:border-2"
            placeholder="nom@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div class="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white focus:outline-none hover:text-blue-600"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:border-2"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </>
  );
}
