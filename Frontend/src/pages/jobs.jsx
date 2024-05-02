import React, { Component } from "react";
import axios from "axios";

// Styles CSS directement dans le fichier JSX
const styles = {
  jobsContainer: {
    textAlign: "center", // Centrer le contenu
  },
  jobItem: {
    textAlign: "left", // Aligner le contenu à gauche
    margin: "20px auto", // Marge autour de chaque emploi, centrée horizontalement
    padding: "20px", // Remplissage à l'intérieur du cadre de chaque emploi
    border: "1px solid #ccc", // Ajouter une bordure autour de chaque emploi
    borderRadius: "5px", // Arrondir les coins du cadre
    maxWidth: "500px", // Largeur maximale pour chaque emploi
    position: "relative", // Position relative pour positionner le bouton "Plus d'informations"
  },
  jobName: {
    fontWeight: "bold", // Mettre le nom de l'emploi en gras
  },
  jobDescription: {
    fontSize: "14px", // Définir une taille de police plus petite pour la description de l'emploi
  },
  moreInfoButton: {
    position: "absolute", // Position absolue pour positionner le bouton
    top: "50%", // Centrer verticalement
    right: "10px", // Aligner à droite
    transform: "translateY(-50%)", // Centrer verticalement
    padding: "5px 10px", // Ajouter du rembourrage au bouton
    borderRadius: "5px", // Arrondir les coins du bouton
    backgroundColor: "#007bff", // Couleur de fond du bouton
    color: "#fff", // Couleur du texte du bouton
    cursor: "pointer", // Curseur pointer pour indiquer que le bouton est cliquable
  },
};

export default class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      loading: true,
      error: null,
      expandedJob: null, // État pour stocker l'offre d'emploi étendue
    };
  }

  componentDidMount() {
    // Effectuer une requête GET pour récupérer les emplois depuis votre API
    axios.get("http://localhost:8080/api/emploi")
      .then((response) => {
        // Mettre à jour l'état avec les données récupérées
        this.setState({
          jobs: response.data,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        // Gérer les erreurs en mettant à jour l'état avec un message d'erreur
        this.setState({
          jobs: [],
          loading: false,
          error: "Une erreur s'est produite lors du chargement des emplois.",
        });
      });
  }

  // Fonction pour gérer le clic sur le bouton "Plus d'informations"
  // Fonction pour gérer le clic sur le bouton "Plus d'informations"
// Fonction pour gérer le clic sur le bouton "Plus d'informations"
handleMoreInfoClick = (job) => {
    // Mettre à jour l'état pour stocker l'offre d'emploi étendue
    this.setState({ expandedJob: job });
  };
  
  render() {
    const { jobs, loading, error, expandedJob } = this.state;
  
    // Si la page est en cours de chargement, afficher un message de chargement
    if (loading) {
      return <div>Chargement en cours...</div>;
    }
  
    // Si une erreur s'est produite, afficher le message d'erreur
    if (error) {
      return <div>Erreur: {error}</div>;
    }
  
    // Si aucune erreur ne s'est produite et que les emplois sont disponibles, les afficher dans une liste
    return (
      <div style={styles.jobsContainer}>
        <h1>Liste des emplois</h1>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {jobs.map((emploi) => (
            <li key={emploi.id} style={styles.jobItem}>
              <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>{emploi.jobName}</h2>
              <p style={styles.jobDescription}>{emploi.jobDescription}</p>
              
              <button
                style={styles.moreInfoButton}
                onClick={() => this.handleMoreInfoClick(emploi)}
              >
                Plus d'informations
              </button>
            </li>
          ))}
        </ul>
        {/* Afficher les informations complètes de l'offre d'emploi étendue */}
        {expandedJob && (
          <div style={{ margin: "20px auto", maxWidth: "500px", textAlign: "left" }}>
            <h2 style={{ fontWeight: "bold", fontSize: "24px" }}>{expandedJob.jobName}</h2>
            <p>{expandedJob.jobDescription}</p>
            {/* Vous pouvez ajouter d'autres informations ici */}
          </div>
        )}
      </div>
    );
  }
}  