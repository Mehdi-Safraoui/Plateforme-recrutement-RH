import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      loading: true,
      error: null,
      expandedJob: null,
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

  handleMoreInfoClick = (job) => {
    this.setState({ expandedJob: job });
  };

  render() {
    const { jobs, loading, error, expandedJob } = this.state;

    if (loading) {
      return <div>Chargement en cours...</div>;
    }

    if (error) {
      return <div>Erreur: {error}</div>;
    }

    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Liste des emplois :</h1>
        <ul className="list-none mt-16">
          {jobs.map((emploi) => (
            <li key={emploi.id} className="text-left mx-auto my-5 p-5 border border-gray-300 rounded-lg max-w-md relative">
              <h2 className="font-bold">{emploi.jobName}</h2>
              <button className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md">
                <Link to={`/jobdetails/${emploi.id}`} className="no-underline text-white ">
                  Plus d'informations
                </Link>
              </button>
            </li>
          ))}
        </ul>
        {expandedJob && (
          <div className="text-left mx-auto my-5 p-5 border border-gray-300 rounded-lg max-w-md">
            <h2 className="font-bold text-2xl">{expandedJob.jobName}</h2>
          </div>
        )}
      </div>
    );
  }
}
