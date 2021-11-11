import React, { useContext } from "react";
import { MdLibraryAdd, MdChecklist } from "react-icons/md";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("tkn");
    setUser(null);
    history.push("/");
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <nav className="navbar bg-color-reverse navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid my-2">
        <a href="/" className="navbar-brand text-white my-3 mx-5">
          TODO <MdChecklist size={30} color={"white"} />
        </a>
        <div className="">
          <div className="navbar-nav ms-auto">
            {user ? (
              <div className="navbar-nav">
                <a className="" href="/create">
                  <button className="btn mx-5 my-3 btn-success text-center">
                    <MdLibraryAdd size={20} /> New Todo
                  </button>
                </a>
                <p className="navbar-nav my-4 text-center mx-5">
                  {capitalize(user.fullName)}
                </p>
                <button
                  className="btn btn-dark my-3 text-white mx-5"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="navbar-nav">
                <button className="btn btn-primary my-3 text-white mx-5">
                  <a
                    className="nounderline text-decoration-none text-white"
                    href="/login"
                  >
                    Login
                  </a>
                </button>
                <button className="btn btn-dark my-3 text-white mx-5">
                  <a
                    className="nounderline text-decoration-none text-white"
                    href="/register"
                  >
                    Register
                  </a>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
