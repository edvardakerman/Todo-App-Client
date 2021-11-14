import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { formValidateMessage } from "../utils/formValidateMessage";
import { UserContext } from "../contexts/UserContext";

export default function Form({ type, title }) {
  const [formFields, setFormFields] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateMessage = formValidateMessage(formFields, type);

    if (validateMessage === "validates") {
      const url = `https://t0doappli.herokuapp.com/api/users/${type}`;
      const { data } = await axios.post(url, formFields);
      localStorage.setItem("tkn", data.token);
      setUser(data.data.user);
      history.push("/");
    }
  };

  const handleChange = (value, fieldId) => {
    const payload = { ...formFields };
    payload[fieldId] = value;
    setFormFields(payload);
  };

  if (type === "signup") {
    return (
      <section>
        <div className="d-flex justify-content-center my-5">
          <div className="card text-center" style={{ width: "30rem" }}>
            <div className="card-body rounded bg-color">
              <form onSubmit={handleSubmit} className="" action="">
                <div className="card-header text-white p-3">
                  <h1>{title}</h1>
                </div>
                <div className="card-text my-5">
                  <div className="text-white mt-3 rounded">
                    <h5>Name</h5>
                    <input
                      minLength="2"
                      placeholder="John Doe"
                      required="required"
                      onChange={(e) =>
                        handleChange(e.target.value, e.target.id)
                      }
                      id="fullName"
                      type="text"
                    />
                  </div>
                  <div className="text-white mt-4">
                    <h5>Email</h5>
                    <input
                      placeholder="JohnDoe@mail.com"
                      required="required"
                      onChange={(e) =>
                        handleChange(e.target.value, e.target.id)
                      }
                      id="email"
                      type="email"
                      autoComplete="email"
                    />
                  </div>
                  <div className="text-white mt-4">
                    <h6>Password</h6>
                    <input
                      placeholder="********"
                      required="required"
                      onChange={(e) =>
                        handleChange(e.target.value, e.target.id)
                      }
                      id="password"
                      type="password"
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="text-white mt-4">
                    <h6>Confirm Password</h6>
                    <input
                      placeholder="********"
                      required="required"
                      onChange={(e) =>
                        handleChange(e.target.value, e.target.id)
                      }
                      id="passwordConfirm"
                      type="password"
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <button className="btn btn-dark rounded my-2 mx-4">
                    Register
                  </button>
                  <Link to="/login">
                    <button className="btn btn-primary rounded my-2 mx-4">
                      Login
                    </button>
                  </Link>
                </div>
                {submitStatus && <p>{submitStatus.message}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  } else if (type === "login") {
    return (
      <section>
        <div className="d-flex justify-content-center my-5">
          <div className="card text-center" style={{ width: "30rem" }}>
            <div className="card-body rounded bg-color">
              <form onSubmit={handleSubmit} action="">
                <div className="card-header text-white p-3">
                  <h1>{title}</h1>
                </div>
                <div className="card-text my-5 text-dark">
                  <div className="text-white my-5">
                    <h5>Email</h5>
                    <input
                      required="required"
                      placeholder="johndoe@mail.com"
                      onChange={(e) =>
                        handleChange(e.target.value, e.target.id)
                      }
                      id="email"
                      type="email"
                      autoComplete="email"
                    />
                  </div>
                  <div className="text-white my-5">
                    <h5>Password</h5>
                    <input
                      required="required"
                      placeholder="********"
                      onChange={(e) =>
                        handleChange(e.target.value, e.target.id)
                      }
                      id="password"
                      type="password"
                      autoComplete="password"
                    />
                  </div>
                </div>

                <div className="my-2">
                  <button className="btn btn-primary rounded my-2 mx-4">
                    Login
                  </button>
                  <Link to="/register">
                    <button className="btn btn-dark rounded my-2 mx-4">
                      Register
                    </button>
                  </Link>
                </div>
                {submitStatus && (
                  <p className="text-white">{submitStatus.message}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
