import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { MdLibraryAdd } from "react-icons/md";
import { UserContext } from "../contexts/UserContext";

const CreateTodoPage = () => {
  const history = useHistory();
  const [formFields, setFormFields] = useState(null);
  const { user } = useContext(UserContext);

  const handleChange = (value, fieldId) => {
    const payload = { ...formFields };
    payload[fieldId] = value;
    setFormFields(payload);
  };

  const changeHandler = (event) =>
    handleChange(event.target.value, event.target.id);

  const handleCreateTodo = async (event) => {
    event.preventDefault();
    const url = "https://t0doappli.herokuapp.com/api/todos";
    const token = localStorage.getItem("tkn");
    const obj = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(formFields),
    };
    await fetch(url, obj);

    history.push(`/`);
  };

  const handleCancel = () => {
    history.push(`/`);
  };

  if (user) {
    return (
      <section>
        <div>
          <button className="btn m-3" onClick={handleCancel}>
            <BiArrowBack color={"#2c3e50"} size={35} />
          </button>
        </div>
        <div className="d-flex justify-content-center my-5">
          <div className="card text-center" style={{ width: "30rem" }}>
            <div className="card-body rounded bg-color">
              <form onSubmit={handleCreateTodo} onChange={changeHandler}>
                <div className="card-header text-white p-3">
                  <h1>Your New Todo</h1>
                </div>
                <div className="card-text my-5">
                  <div className="">
                    <input
                      placeholder="Title..."
                      id="title"
                      type="text"
                      maxLength="40"
                      minLength="2"
                      required="required"
                    />
                  </div>
                  <div className="my-5">
                    <textarea
                      aria-label=""
                      placeholder="Description..."
                      className="rounded"
                      id="description"
                      type="text"
                      maxLength="1024"
                      minLength="2"
                      required="required"
                    />
                  </div>
                </div>
                <div>
                  <button className="btn mx-3" onClick={handleCancel}>
                    <BiArrowBack color={"white"} size={25} />
                  </button>
                  <button className="btn btn-success mx-3">
                    <MdLibraryAdd size={25} color={"white"} /> Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-center border-1 mt-5 border-bottom">
        <h2>Welcome, this is your todo app</h2>
      </div>
      <div className="d-flex justify-content-center my-2">
        <p>Please login or register to continue</p>
      </div>
      <div className="d-flex justify-content-center">
        <a href="/login">
          <button className="btn btn-primary mx-4">Login</button>
        </a>
        <a href="/register">
          <button className="btn btn-dark mx-4">Register</button>
        </a>
      </div>
    </div>
  );
};

export default CreateTodoPage;
