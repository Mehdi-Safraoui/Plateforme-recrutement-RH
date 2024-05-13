import React, { useState, useEffect } from "react";
import axios from "axios";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Fetch candidates data from backend
    axios
      .get("http://localhost:8080/api/offre/candidates")
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching candidates:", error);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto mt-12">
        <table className="table-auto w-full border-2 border-black">
          <thead>
            <tr>
              <th className="border-2 border-black px-4 py-2">Nom</th>
              <th className="border-2 border-black px-4 py-2">Email</th>
              <th className="border-2 border-black px-4 py-2">Nom de l'emploi</th>
              <th className="border-2 border-black px-4 py-2">État</th>
              <th className="border-2 border-black px-4 py-2">Cv</th>
              <th className="border-2 border-black px-4 py-2">Numéro de téléphone</th>
              <th className="border-2 border-black px-4 py-2">Ville</th>
              <th className="border-2 border-black px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td className="border-2 border-black px-4 py-2">
                  {candidate.first_name} {candidate.last_name}
                </td>
                <td className="border-2 border-black px-4 py-2">{candidate.email}</td>
                <td className="border-2 border-black px-4 py-2">{candidate.jobName}</td>
                <td className="border-2 border-black px-4 py-2 text-white text-xs">
                  <div className="bg-blue-700 px-2 py-1 rounded">
                    {candidate.status || "Non traité"}
                  </div>
                </td>
                <td className="border-2 border-black px-4 py-2">
                  {candidate.cv && (
                    <a
                      href={`http://localhost:8080/assets/${candidate.cv.replace(
                        "uploads\\",
                        ""
                      )}`}
                      target="_blank"
                    >
                      Le CV de "{candidate.first_name} {candidate.last_name}"
                    </a>
                  )}
                </td>
                <td className="border-2 border-black px-4 py-2">{candidate.phone}</td>
                <td className="border-2 border-black px-4 py-2">{candidate.ville}</td>
                <td className="border-2 border-black px-4 py-2 ">
                  {candidate.status === "Accepted" ||
                  candidate.status === "Rejected" ? (
                    <span>{candidate.status}</span>
                  ) : (
                    <>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded w-25"
                      >
                        Accepter
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 w-30"
                      >
                        Rejeter
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateList;
