import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FiDelete } from "react-icons/fi";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoCheckmarkSharp } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";

const TodoDetailPage = () => {
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
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

      setTodo(responseData.data.todo);
      setIsLoading(false);
    };
    fetchTodo().catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  }, [todoId]);

  const handleDelete = (itemId) => async (event) => {
    const url = `https://t0doappli.herokuapp.com/api/todos/${itemId}`;
    const token = localStorage.getItem("tkn");
    const obj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    await fetch(url, obj);

    history.push(`/`);
  };

  const handleGoBack = () => {
    history.push(`/`);
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
        <div>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section>
        <div>
          <button className="btn btn-light m-3" onClick={handleGoBack}>
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
          <button className="btn btn-light m-3" onClick={handleGoBack}>
            <BiArrowBack color={"#2c3e50"} size={35} />
          </button>
        </div>

        <div className="d-flex justify-content-center my-5">
          <div className="card text-center" style={{ width: "30rem" }}>
            <div className="card-body bg-color rounded">
              <div className="card-header">
                <h2 className="card-title text-white">
                  {capitalize(todo.title)}
                </h2>
                <h6 className="card-subtitle my-2 text-white">
                  {date.toDateString()}
                </h6>
              </div>
              <p className="card-text my-5 text-white todo-text">
                {capitalize(todo.description)}
              </p>
              <div>
                <button className="btn m-3" onClick={handleGoBack}>
                  <BiArrowBack color={"white"} size={25} />
                </button>
                <button className="btn m-3" onClick={handleDelete(todo._id)}>
                  <IoCheckmarkSharp color={"white"} size={25} />
                </button>
                <a href={`/edit/${todo._id}`}>
                  <button className="btn m-3">
                    <AiTwotoneEdit color={"white"} size={25} />
                  </button>
                </a>
                <button className="btn m-3" onClick={handleDelete(todo._id)}>
                  <FiDelete color={"white"} size={25} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <p>"Something went wrong! Create"</p>
    </section>
  );
};

export default TodoDetailPage;
