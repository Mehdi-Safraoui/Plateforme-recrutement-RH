import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const styles = {
  jobsContainer: {
    textAlign: "center",
  },
  jobItem: {
    textAlign: "left",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    maxWidth: "500px",
    position: "relative",
  },
  jobName: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  jobDescription: {
    fontSize: "14px",
  },
  moreInfoButton: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    padding: "5px 10px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/emploi")
      .then((response) => {
        this.setState({
          jobs: response.data,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        this.setState({
          jobs: [],
          loading: false,
          error: "Une erreur s'est produite lors du chargement des emplois.",
        });
      });
  }

  render() {
    const { jobs, loading, error } = this.state;

    if (loading) {
      return <div>Chargement en cours...</div>;
    }

    if (error) {
      return <div>Erreur: {error}</div>;
    }

    return (
      <div style={styles.jobsContainer}>
        <h1>Liste des emplois</h1>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {jobs.map((emploi) => (
            <li key={emploi.id} style={styles.jobItem}>
              <h2 style={styles.jobName}>{emploi.jobName}</h2>
              <p style={styles.jobDescription}>{emploi.jobDescription}</p>
              {emploi.id && ( // Vérification si emploi.id est défini et non null
                <Link to={`/job/${emploi.id}`} style={styles.moreInfoButton}>
                  Plus d'informations
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}