import { React, useState, useEffect, useContext } from "react";
import { FiDelete } from "react-icons/fi";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdLibraryAdd } from "react-icons/md";
import { UserContext } from "../contexts/UserContext";
export default function TodoListPage() {
  const [todos, setTodos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchTodos = async () => {
      const url = "https://t0doappli.herokuapp.com/api/todos";
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

      setTodos(responseData.data.todos.reverse());
      setIsLoading(false);
    };
    fetchTodos().catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  }, []);

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

    setTodos((pp) => pp.filter((p) => p._id !== itemId));
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (errorMessage || !user) {
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
  }

  if (user) {
    return (
      <div>
        <div className="">
          <div className="d-flex justify-content-center border-1 mt-5 border-bottom">
            <h2>Welcome, this is your Todo list</h2>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 mx-2 my-4">
          {todos.map((todo) => {
            const date = new Date(todo.datePlaced);
            return (
              <div key={todo._id} className="col mb-4">
                <div className="card text-center h-100">
                  <div className="card-body bg-color rounded">
                    <a
                      className="nounderline text-decoration-none"
                      href={`/todo/${todo._id}`}
                    >
                      <div className="card-header p-3">
                        <h2 className="card-title text-white">
                          {capitalize(todo.title)}
                        </h2>
                        <h6 className="card-subtitle mt-1 text-white">
                          {date.toDateString()}
                        </h6>
                      </div>
                    </a>

                    <div>
                      <button
                        className="btn m-3"
                        onClick={handleDelete(todo._id)}
                      >
                        <IoCheckmarkSharp color={"white"} size={25} />
                      </button>
                      <a href={`/edit/${todo._id}`}>
                        <button className="btn m-3">
                          <AiTwotoneEdit color={"white"} size={25} />
                        </button>
                      </a>
                      <button
                        className="btn m-3"
                        onClick={handleDelete(todo._id)}
                      >
                        <FiDelete color={"white"} size={25} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-center my-5">
          <a className="" href="/create">
            <button className="btn mx-5 my-3 btn-success text-center">
              <MdLibraryAdd size={20} /> New Todo
            </button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <section>
      <p>"Something went wrong! Create"</p>
    </section>
  );
}
