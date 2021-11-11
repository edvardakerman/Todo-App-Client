import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import EditTodoPage from "./pages/EditTodoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("tkn")) {
        const token = localStorage.getItem("tkn");
        const url = `https://t0doappli.herokuapp.com/api/users/getMe`;
        const obj = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(url, obj);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();
        setUser(responseData.data.user);
      }
    };
    fetchUser().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Switch>
          <Route exact path="/">
            <TodoListPage />
          </Route>
          <Route exact path="/Create">
            <CreateTodoPage />
          </Route>
          <Route exact path="/Edit/:id">
            <EditTodoPage />
          </Route>
          <Route exact path="/Todo/:id">
            <TodoDetailPage />
          </Route>
          <Route exact path="/Login">
            <LoginPage />
          </Route>
          <Route exact path="/Register">
            <RegisterPage />
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
};

export default App;
