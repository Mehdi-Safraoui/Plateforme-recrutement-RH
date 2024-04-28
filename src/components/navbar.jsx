import { Link } from "react-router-dom";
import react, { Component } from "react";
import authService from "../services/auth-service";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showRhBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = authService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: authService.getCurrentUser(),
        showRhBoard: user.roles.includes("ROLE_RH"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    authService.logout();
  }

  render() {
    const { currentUser, showRhBoard, showAdminBoard } = this.state;
    return (
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <div className="font-medium flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse">
            <div>
              <Link
                className="flex items-center space-x-3 rtl:space-x-reverse"
                to="/"
              >
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8"
                  alt="Flowbite Logo"
                />
                <span className="text-2xl font-semibold dark:text-white">
                  Recrutini
                </span>
              </Link>
              <button
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-expanded="false"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 17 14"
                />
              </button>
            </div>

            {showRhBoard && (
              <div className="text-lg mt-1">
                <Link to="/rhboard">Espace RH</Link>
              </div>
            )}
            {showAdminBoard && (
              <div className="text-lg mt-1">
                <Link to="/adminboard">Espace Admin</Link>
              </div>
            )}
            {currentUser && (
              <div className="text-lg mt-1">
                <Link to="/user">Espace utilisateur</Link>
              </div>
            )}
          </div>
          {currentUser ? (
            <div className="hidden md:block">
              <ul className="font-medium flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse">
                <li>
                  <Link to="/profile">{currentUser.name}</Link>
                </li>
                <li>
                  <Link to="/login" onClick={this.logOut}>
                    Se deconnecter
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden md:block">
              <ul className="font-medium flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse">
                <li>
                  <Link to="/signup">S'inscrire</Link>
                </li>
                <li>
                  <Link to="/login">Se connecter</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    );
  }
}