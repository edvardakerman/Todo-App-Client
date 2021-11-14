import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { MdLibraryAdd } from "react-icons/md";
import { useHistory } from "react-router-dom";

const EditTodoPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [todo, setTodo] = useState({
    title: "Todo",
    description: "Do this todo",
  });
  const history = useHistory();

  const todoId = window.location.href.split("/")[4];

  useEffect(() => {
    const fetchTodo = async () => {
      const url = `https://t0doappli.herokuapp.com/api/todos/${todoId}`;
      const token = localStorage.getItem("tkn");

      const obj = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, obj);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      responseData.data.todo.datePlaced = new Date();

      setTodo(responseData.data.todo);
      setIsLoading(false);
    };
    fetchTodo().catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  }, [todoId]);

  const getHandleChange = (key) => (event) => {
    setTodo({ ...todo, [key]: event.target.value });
  };

  const handleUpdateTodo = async (event) => {
    event.preventDefault();
    const url = `https://t0doappli.herokuapp.com/api/todos/${todo._id}`;
    const token = localStorage.getItem("tkn");
    const obj = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(todo),
    };
    await fetch(url, obj);

    history.push(`/`);
  };

  const handleCancel = () => {
    history.push(`/`);
  };

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section>
        <div>
          <button className="btn btn-light m-3" onClick={handleCancel}>
            <BiArrowBack color={"#2c3e50"} size={35} />
          </button>
        </div>
        <div className="d-flex justify-content-center m-2">
          <p>{errorMessage}</p>
        </div>
      </section>
    );
  }

  if (todo) {
    const date = new Date(todo.datePlaced);
    return (
      <section>
        <div>
          <button className="btn btn-light m-3" onClick={handleCancel}>
            <BiArrowBack color={"#2c3e50"} size={35} />
          </button>
        </div>

        <div className="d-flex justify-content-center my-5">
          <div className="card text-center" style={{ width: "30rem" }}>
            <div className="card-body rounded bg-color">
              <form onSubmit={handleUpdateTodo}>
                <div className="card-header text-white">
                  <h1>Edit Your Todo</h1>
                  <h6 className="card-subtitle text-white my-2">
                    {date.toDateString()}
                  </h6>
                </div>
                <div className="card-text my-5">
                  <div className="text-white mt-3">
                    <input
                      required="required"
                      onChange={getHandleChange("title")}
                      name="title"
                      value={todo.title}
                      id="title"
                      type="text"
                      maxLength="40"
                      minLength="2"
                    />
                  </div>
                  <div className="mt-4 rounded">
                    <textarea
                      required="required"
                      className="rounded mt-4"
                      onChange={getHandleChange("description")}
                      value={todo.description}
                      name="description"
                      id="description"
                      type="text"
                      maxLength="1024"
                      minLength="2"
                    />
                  </div>
                </div>
                <div>
                  <button className="btn mx-3" onClick={handleCancel}>
                    <BiArrowBack color={"white"} size={25} />
                  </button>
                  <button className="btn mx-3">
                    <MdLibraryAdd size={25} color={"white"} />
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
    <section>
      <p>"Something went wrong!"</p>
    </section>
  );
};
export default EditTodoPage;
