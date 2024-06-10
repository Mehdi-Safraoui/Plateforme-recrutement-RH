import React, { PureComponent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class JobForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      jobName: "",
      jobDescription: "",
      motsclés: [
        {
          
        },
      ],
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleKeywordChange = (index, event) => {
    const { name, value } = event.target;
    const motsclés = [...this.state.motsclés];
    motsclés[index][name] = value;
    this.setState({ motsclés });
  };

  handleAddKeyword = () => {
    this.setState({
      motsclés: [...this.state.motsclés, { tag: "", score: 0 }],
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { jobName, jobDescription, motsclés } = this.state;

    try {
      const response = await axios.post("http://localhost:8080/api/emploi", {
        jobName,
        jobDescription,
        motsclés: JSON.stringify(motsclés),
      });
      if (response.status >= 200 && response.status < 300) {
        console.log("Emploi soumis avec succès !");
        toast.success("Formulaire soumis !", {
          position: "top-right",
          pauseOnHover: true,
          theme: "dark",
        });
        // Réinitialiser les champs du formulaire après soumission réussie
        this.setState({
          jobName: "",
          jobDescription: "",
          motsclés: [{ tag: "", score: 0 }],
        });
      } else {
        console.error(
          "Une erreur s'est produite lors de la soumission de l'emploi."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de l'emploi :", error);
    }
  };

  render() {
    return (
      <div className="max-w-2xl mx-auto p-8 ml-80 bg-white shadow-md rounded-lg">
        <ToastContainer />
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Ajouter une offre d'emploi</h2>
        <form onSubmit={this.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="jobName"
              className="block text-sm font-medium text-gray-700"
            >
              Nom de l'emploi:
            </label>
            <input
              type="text"
              id="jobName"
              name="jobName"
              value={this.state.jobName}
              onChange={this.handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Titre de l'emploi"
            />
          </div>

          <div>
            <label
              htmlFor="jobDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={this.state.jobDescription}
              onChange={this.handleInputChange}
              required
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Description de l'emploi"
            ></textarea>
          </div>

          <div className="space-y-4">
            {this.state.motsclés.map((el, i) => (
              <div key={i} className="flex space-x-4">
                <input
                  type="text"
                  name="tag"
                  value={el.tag}
                  onChange={(e) => this.handleKeywordChange(i, e)}
                  placeholder="Tag"
                  className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <input
                  type="number"
                  name="score"
                  value={el.score}
                  onChange={(e) => this.handleKeywordChange(i, e)}
                  placeholder="Score"
                  className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={this.handleAddKeyword}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Ajouter un mot-clé
            </button>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Soumettre
          </button>
        </form>
      </div>
    );
  }
}
