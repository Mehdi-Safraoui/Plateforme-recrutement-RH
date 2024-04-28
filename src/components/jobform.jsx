import React, { PureComponent } from "react";
import axios from "axios";

export default class JobForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      jobName: "",
      jobDescription: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { jobName, jobDescription } = this.state;
  
    try {
      const response = await axios.post(
        "http://localhost:8080/api/emploi",
        {
          jobName,
          jobDescription
        }
      );
  
      if (response.status >= 200 && response.status < 300) { // Vérifiez si le statut de la réponse est dans la plage des codes de statut de succès
        console.log('Emploi soumis avec succès !');
        // Réinitialiser les champs du formulaire après soumission réussie
        this.setState({
          jobName: '',
          jobDescription: '',
        });
      } else {
        console.error('Une erreur s\'est produite lors de la soumission de l\'emploi.');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission de l\'emploi :', error);
    }
  };

  render() {
    return (
      <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <form onSubmit={this.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="jobName" className="block text-sm font-medium text-gray-700">Nom de l'emploi:</label>
            <input
              type="text"
              id="jobName"
              name="jobName"
              value={this.state.jobName}
              onChange={this.handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Titre de l'emploi"
            />
          </div>

          <div>
            <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={this.state.jobDescription}
              onChange={this.handleInputChange}
              required
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Description de l'emploi"
            ></textarea>
          </div>

          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Soumettre
          </button>
        </form>
      </div>
    );
  }
}

