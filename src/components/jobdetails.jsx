import React, { useState, useEffect } from "react";
import axios from "axios";

const JobDetails = ({ emploiId }) => {
  const [emploi, setEmploi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("ID de l'emploi reçu :", emploiId); // Vérifiez que l'ID est bien reçu
    // Effectuez une requête pour récupérer les détails de l'emploi à partir de la table "emploi"
    axios.get(`http://localhost:8080/${emploiId}`)
      .then((response) => {
        setEmploi(response.data);
        setLoading(false); // Mettre à jour l'état de chargement une fois que les données sont récupérées
        // Effacer les erreurs précédentes
        setError(null);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des détails de l'emploi :", error);
        setLoading(false); // Mettre à jour l'état de chargement en cas d'erreur
      });
  }, [emploiId]); // Assurez-vous de spécifier emploiId dans les dépendances pour exécuter l'effet à chaque changement de emploiId

  // Afficher un message de chargement si les données sont en cours de chargement
  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  // Afficher un message d'erreur si une erreur s'est produite
  if (error) {
    return <div>Erreur: {error}</div>;
  }

  // Afficher les détails de l'emploi une fois qu'ils sont disponibles
  return (
    <div style={{ textAlign: "left", maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={{ fontWeight: "bold", fontSize: "24px" }}>{emploi.jobName}</h2>
      <p>{emploi.jobDescription}</p>
    </div>
  );
};

export default JobDetails;
