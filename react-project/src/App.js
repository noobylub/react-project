import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AllUsers } from "./users/pages/AllUsers/Users";
import Header from "./shared/pages/Heading/Header";
import NewPlaces from "./places/pages/newplaces/NewPlaces";
import UserPlaces from "./places/pages/UserPlaces/UserPlaces";
import DataContext from "./data/DataContext";
import "mapbox-gl/dist/mapbox-gl.css";
import EditPlace from "./places/pages/newplaces/EditPlace";
import { AuthContext } from "./data/auth";
import Authenticate from "./users/pages/Authentication/authenticate";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  var context;

  return (
    <DataContext>
      <BrowserRouter>
        <Header></Header>
        <main>
          <Switch>
            <Route path="/" exact>
              <AllUsers></AllUsers>
            </Route>
            <Route path="/places/edit/:id">
              <EditPlace></EditPlace>
            </Route>
            <Route path="/:userId/places">
              <UserPlaces></UserPlaces>
            </Route>
            <Route path="/new-place">
              <NewPlaces></NewPlaces>
            </Route>
            <Route path="/authenticate">
              <Authenticate></Authenticate>
            </Route>
            <Redirect to="/"></Redirect>
          </Switch>
        </main>
      </BrowserRouter>
    </DataContext>
  );
}

export default App;
