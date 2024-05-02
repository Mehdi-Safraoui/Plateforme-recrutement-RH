import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams(); // Récupérer l'id de l'emploi depuis l'URL
  const [emploi, setEmploi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/emploi/${id}`)
      .then(response => {
        setEmploi(response.data);
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        setLoading(false);
        setError("Une erreur s'est produite lors de la récupération des détails de l'emploi.");
      });
  }, [id]);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div>
      <h2>Détails de l'emploi {id}</h2>
      {emploi && (
        <div>
          <h3>Nom de l'emploi : {emploi.jobName}</h3>
          <p>Description de l'emploi : {emploi.jobDescription}</p>
        </div>
      )}
    </div>
  );
};

export default JobDetails;