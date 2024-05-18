import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

  const handleAccept = (candidateId, candidateEmail) => {
    // Mise à jour du candidat dans la base de données pour le marquer comme accepté
    axios
      .put(`http://localhost:8080/api/offre/candidates/${candidateId}/accept`)
      .then(() => {
        // Envoi de l'e-mail au candidat avec le contenu HTML construit
        axios
          .post("http://localhost:8080/api/email/send-email", {
            to: candidateEmail,
            subject: "Confirmation de candidature",
            html:
              '<h2>Bonjour</h2><p>Félicitations! Votre candidature a été acceptée.</p>',
          })
          .then(() => {
            console.log("Email sent successfully");
            // Affichage de la notification Toastify
            toast.success("Email envoyé avec succès", {
              position: "top-right",
              pauseOnHover: true,
              theme: "dark",
            });
            // Mise à jour de l'état du candidat dans le frontend
            setCandidates((prevCandidates) =>
              prevCandidates.map((candidate) => {
                if (candidate.id === candidateId) {
                  return { ...candidate, etat: "Accepted" };
                }
                return candidate;
              })
            );
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
      })
      .catch((error) => {
        console.error("Error accepting candidate:", error);
      });
  };
  

  const handleReject = (candidateId) => {
    axios
      .put(`http://localhost:8080/api/offre/candidates/${candidateId}/reject`)
      .then((response) => {
        // Update candidates state to reflect the change
        setCandidates((prevCandidates) =>
          prevCandidates.map((candidate) => {
            if (candidate.id === candidateId) {
              return { ...candidate, etat: "Rejected" };
            }
            return candidate;
          })
        );
      })
      .catch((error) => {
        console.error("Error rejecting candidate:", error);
      });
  };

  return (
    <>
      <ToastContainer />
    <div className="container mx-auto">
      <div className="overflow-x-auto mt-6 ml-6">
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
                  <div className={`px-2 py-1 rounded ${candidate.etat === 'Accepted' ? 'bg-green-500' : candidate.etat === 'Rejected' ? 'bg-red-500' : 'bg-blue-700'}`}>
                    {candidate.etat || "Non traité"}
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
                        onClick={() => handleAccept(candidate.id , candidate.email)}
                      >
                        Accepter
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 w-30"
                        onClick={() => handleReject(candidate.id)}

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
    </>
  );
};

export default CandidateList;
